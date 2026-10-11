// ===== State Management =====
let cart = JSON.parse(localStorage.getItem('bookland-cart') || '[]');
let activeCategory = 'all';
let searchQuery = '';
let sortMode = 'default';

// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.getElementById('cartCount');
const cartItemCount = document.getElementById('cartItemCount');
const cartTotal = document.getElementById('cartTotal');
const booksGrid = document.getElementById('booksGrid');
const categoriesGrid = document.getElementById('categoriesGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const noResults = document.getElementById('noResults');
const toast = document.getElementById('toast');
const backToTop = document.getElementById('backToTop');
const checkoutBtn = document.getElementById('checkoutBtn');
const newsletterForm = document.getElementById('newsletterForm');

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderCategories();
    renderBooks();
    populateCategoryFilter();
    renderCart();
    bindEvents();
});

// ===== Theme =====
function initTheme() {
    const savedTheme = localStorage.getItem('bookland-theme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('bookland-theme', theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
}

// ===== Render Categories =====
function renderCategories() {
    categoriesGrid.innerHTML = categories.map(cat => `
        <div class="category-card" data-category="${cat.id}">
            <span class="category-icon">${cat.icon}</span>
            <div class="category-name">${cat.name}</div>
            <div class="category-count">${toPersianNum(cat.count)} کتاب</div>
        </div>
    `).join('');

    categoriesGrid.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.dataset.category;
            activeCategory = cat;
            categoryFilter.value = cat;
            renderBooks();
            document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ===== Populate Category Filter =====
function populateCategoryFilter() {
    categories.filter(c => c.id !== 'all').forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        categoryFilter.appendChild(option);
    });
}

// ===== Render Books =====
function renderBooks() {
    let filtered = [...books];

    // Filter by category
    if (activeCategory !== 'all') {
        filtered = filtered.filter(b => b.category === activeCategory);
    }

    // Filter by search
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(b =>
            b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q)
        );
    }

    // Sort
    switch (sortMode) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
    }

    if (filtered.length === 0) {
        booksGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    booksGrid.innerHTML = filtered.map((book, i) => `
        <article class="book-card" style="animation-delay: ${i * 0.05}s">
            <div class="book-cover" style="background: ${book.coverColor}">
                ${book.discount > 0 ? `<span class="book-discount-badge">٪${toPersianNum(book.discount)} تخفیف</span>` : ''}
                <span class="book-cover-emoji">${book.cover}</span>
            </div>
            <div class="book-info">
                <span class="book-category">${book.categoryName}</span>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-rating">
                    <span class="book-rating-stars">${'★'.repeat(Math.floor(book.rating))}${book.rating % 1 >= 0.5 ? '⯨' : ''}</span>
                    <span class="book-rating-count">${toPersianNum(book.rating)} (${toPersianNum(book.ratingCount)})</span>
                </div>
                <div class="book-price-row">
                    <div class="book-prices">
                        <span class="book-price">${formatPrice(book.price)}</span>
                        ${book.oldPrice > 0 ? `<span class="book-old-price">${formatPrice(book.oldPrice)}</span>` : ''}
                    </div>
                    <button class="add-to-cart" data-id="${book.id}" aria-label="افزودن به سبد">+</button>
                </div>
            </div>
        </article>
    `).join('');

    // Bind add-to-cart buttons
    booksGrid.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            addToCart(parseInt(btn.dataset.id));
        });
    });
}

// ===== Cart Functions =====
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const existing = cart.find(item => item.id === bookId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            cover: book.cover,
            coverColor: book.coverColor,
            qty: 1
        });
    }

    saveCart();
    renderCart();
    cartCount.classList.add('bump');
    setTimeout(() => cartCount.classList.remove('bump'), 400);
    showToast(`"${book.title}" به سبد اضافه شد ✓`);
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    saveCart();
    renderCart();
}

function changeQty(bookId, delta) {
    const item = cart.find(i => i.id === bookId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeFromCart(bookId);
    } else {
        saveCart();
        renderCart();
    }
}

function saveCart() {
    localStorage.setItem('bookland-cart', JSON.stringify(cart));
}

function renderCart() {
    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

    cartCount.textContent = toPersianNum(totalItems);
    cartItemCount.textContent = `(${toPersianNum(totalItems)})`;

    if (cart.length === 0) {
        cartItems.style.display = 'none';
        cartFooter.style.display = 'none';
        cartEmpty.style.display = 'flex';
        return;
    }

    cartItems.style.display = 'block';
    cartFooter.style.display = 'block';
    cartEmpty.style.display = 'none';

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-cover" style="background: ${item.coverColor}">${item.cover}</div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-author">${item.author}</div>
                <div class="cart-item-bottom">
                    <span class="cart-item-price">${formatPrice(item.price * item.qty)}</span>
                    <div class="cart-qty">
                        <button data-id="${item.id}" data-delta="-1">−</button>
                        <span>${toPersianNum(item.qty)}</span>
                        <button data-id="${item.id}" data-delta="1">+</button>
                    </div>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" aria-label="حذف">✕</button>
        </div>
    `).join('');

    cartTotal.textContent = formatPrice(totalTotal());

    // Bind events
    cartItems.querySelectorAll('.cart-qty button').forEach(btn => {
        btn.addEventListener('click', () => {
            changeQty(parseInt(btn.dataset.id), parseInt(btn.dataset.delta));
        });
    });
    cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromCart(parseInt(btn.dataset.id));
        });
    });
}

function totalTotal() {
    return cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
}

// ===== Cart Sidebar =====
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Toast =====
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== Event Bindings =====
function bindEvents() {
    // Theme
    themeToggle.addEventListener('click', toggleTheme);

    // Mobile menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when link clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveNav();
    });

    // Cart
    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        showToast('سفارش ثبت شد! در حال انتقال به درگاه پرداخت... 🎉');
        setTimeout(() => {
            cart = [];
            saveCart();
            renderCart();
            closeCart();
        }, 1500);
    });

    // Search
    searchInput.addEventListener('input', e => {
        searchQuery = e.target.value;
        renderBooks();
    });

    // Filters
    categoryFilter.addEventListener('change', e => {
        activeCategory = e.target.value;
        renderBooks();
    });

    sortFilter.addEventListener('change', e => {
        sortMode = e.target.value;
        renderBooks();
    });

    // Back to top
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Newsletter
    newsletterForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        showToast('عضویت در خبرنامه با موفقیت انجام شد 📨');
        newsletterForm.reset();
    });

    // Keyboard
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeCart();
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ===== Active Nav Update =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
            current = section.id;
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
            item.classList.add('active');
        }
    });
}
