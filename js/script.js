// ===== State Management =====
let cart = JSON.parse(localStorage.getItem('bookland-cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('bookland-wishlist') || '[]');
let activeCategory = 'all';
let searchQuery = '';
let sortMode = 'default';
let currentReviewIndex = 0;

// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.getElementById('cartCount');
const cartItemCount = document.getElementById('cartItemCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const booksGrid = document.getElementById('booksGrid');
const categoriesGrid = document.getElementById('categoriesGrid');
const flashBooks = document.getElementById('flashBooks');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const noResults = document.getElementById('noResults');
const toast = document.getElementById('toast');
const toastIcon = document.getElementById('toastIcon');
const backToTop = document.getElementById('backToTop');
const checkoutBtn = document.getElementById('checkoutBtn');
const newsletterForm = document.getElementById('newsletterForm');
const reviewsTrack = document.getElementById('reviewsTrack');
const sliderDots = document.getElementById('sliderDots');
const prevReviewBtn = document.getElementById('prevReview');
const nextReviewBtn = document.getElementById('nextReview');

// Modal
const bookModal = document.getElementById('bookModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

// Wishlist
const wishlistBtn = document.getElementById('wishlistBtn');
const wishlistSidebar = document.getElementById('wishlistSidebar');
const wishlistItems = document.getElementById('wishlistItems');
const wishlistEmpty = document.getElementById('wishlistEmpty');
const wishlistCount = document.getElementById('wishlistCount');
const wishItemCount = document.getElementById('wishItemCount');
const wishClose = document.getElementById('wishClose');
const startShopping = document.getElementById('startShopping');

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    injectIcons();
    initTheme();
    renderCategories();
    renderBooks();
    renderFlashSale();
    populateCategoryFilter();
    renderCart();
    renderWishlist();
    renderReviews();
    startTimer();
    bindEvents();
    initScrollReveal();
});

// ===== Inject Static Icons =====
function setIcon(id, svg) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = svg;
}

function injectIcons() {
    setIcon('bannerIcon', icons.truck);
    setIcon('logoIcon', icons.logo);
    setIcon('footerLogoIcon', icons.logo);
    setIcon('themeIcon', icons.moon);
    setIcon('wishlistIcon', icons.heart);
    setIcon('cartIcon', icons.cart);
    setIcon('heroBadgeIcon', icons.sparkles);
    setIcon('btnArrow1', icons.arrowLeft);
    setIcon('searchIcon', icons.search);
    setIcon('noResIcon', icons.book);
    setIcon('flashIcon', icons.flame);
    setIcon('newsIcon', icons.bell);
    setIcon('backTopIcon', icons.arrowUp);
    setIcon('cartHeaderIcon', icons.cart);
    setIcon('cartCloseIcon', icons.close);
    setIcon('cartEmptyIcon', icons.shoppingBag);
    setIcon('wishHeaderIcon', icons.heart);
    setIcon('wishCloseIcon', icons.close);
    setIcon('wishEmptyIcon', icons.heart);
    setIcon('modalCloseIcon', icons.close);

    // Features
    setIcon('featIcon1', icons.truck);
    setIcon('featIcon2', icons.shield);
    setIcon('featIcon3', icons.refresh);
    setIcon('featIcon4', icons.headset);

    // About
    setIcon('aboutIcon1', icons.sparkles);
    setIcon('aboutIcon2', icons.eye);
    setIcon('check1', icons.check);
    setIcon('check2', icons.check);
    setIcon('check3', icons.check);
    setIcon('check4', icons.check);

    // Footer
    setIcon('socialIg', icons.instagram);
    setIcon('socialTg', icons.telegram);
    setIcon('socialTw', icons.twitter);
    setIcon('socialYt', icons.youtube);
    setIcon('addrIcon', icons.mapPin);
    setIcon('phoneIcon', icons.phone);
    setIcon('mailIcon', icons.mail);
    setIcon('clockIcon', icons.clock);

    // Slider arrows
    if (prevReviewBtn) prevReviewBtn.innerHTML = icons.chevronRight;
    if (nextReviewBtn) nextReviewBtn.innerHTML = icons.chevronLeft;

    // Bottom nav icons
    setIcon('bnHome', icons.home);
    setIcon('bnBooks', icons.book);
    setIcon('bnCat', icons.grid);
    setIcon('bnSearchIcon', icons.search);
    setIcon('bnCartIcon', icons.cart);
}

// ===== Theme =====
function initTheme() {
    const savedTheme = localStorage.getItem('bookland-theme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.innerHTML = theme === 'dark' ? icons.sun : icons.moon;
    localStorage.setItem('bookland-theme', theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
}

// ===== Scroll Reveal =====
function initScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== Render Categories =====
function renderCategories() {
    categoriesGrid.innerHTML = categories.map(cat => `
        <div class="category-card" data-category="${cat.id}">
            <span class="category-icon">${icons[cat.icon] || icons.book}</span>
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

// ===== Generate Star Rating HTML =====
function starRating(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += i <= Math.floor(rating) ? icons.star : icons.starOutline;
    }
    return html;
}

// ===== Render Books =====
function renderBooks() {
    let filtered = [...books];

    if (activeCategory !== 'all') {
        filtered = filtered.filter(b => b.category === activeCategory);
    }

    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(b =>
            b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q)
        );
    }

    switch (sortMode) {
        case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
        case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
        case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
    }

    if (filtered.length === 0) {
        booksGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    booksGrid.innerHTML = filtered.map((book, i) => {
        const inWishlist = wishlist.includes(book.id);
        return `
        <article class="book-card" style="animation-delay: ${i * 0.05}s" data-id="${book.id}">
            <div class="book-cover" style="background: ${book.coverColor}">
                ${book.isBestseller ? `<span class="bestseller-badge">${icons.flame} پرفروش</span>` : ''}
                <button class="book-wishlist-btn ${inWishlist ? 'active' : ''}" data-wish="${book.id}" aria-label="افزودن به علاقه‌مندی">
                    ${inWishlist ? icons.heartFilled : icons.heart}
                </button>
                <img src="${book.cover}" alt="${book.title}" class="book-cover-img" loading="lazy">
                <button class="book-quick-view" data-view="${book.id}" aria-label="مشاهده سریع">${icons.eye}</button>
            </div>
            <div class="book-info">
                <span class="book-category">${book.categoryName}</span>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-rating">
                    <span class="book-rating-stars">${starRating(book.rating)}</span>
                    <span class="book-rating-count">${toPersianNum(book.rating)} (${toPersianNum(book.ratingCount)})</span>
                </div>
                <div class="book-price-row">
                    <div class="book-prices">
                        <span class="book-price">${formatPrice(book.price)}</span>
                        ${book.oldPrice > 0 ? `<span class="book-old-price">${formatPrice(book.oldPrice)}</span>` : ''}
                    </div>
                    <button class="add-to-cart" data-id="${book.id}" aria-label="افزودن به سبد">${icons.plus}</button>
                </div>
            </div>
        </article>
        `;
    }).join('');

    // Bind events
    booksGrid.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            addToCart(parseInt(btn.dataset.id));
        });
    });
    booksGrid.querySelectorAll('.book-wishlist-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            toggleWishlist(parseInt(btn.dataset.wish));
        });
    });
    booksGrid.querySelectorAll('.book-quick-view').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            openModal(parseInt(btn.dataset.view));
        });
    });
    booksGrid.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('click', () => openModal(parseInt(card.dataset.id)));
    });
}

// ===== Flash Sale =====
function renderFlashSale() {
    const flashItems = books.filter(b => b.discount > 0).slice(0, 4);
    flashBooks.innerHTML = flashItems.map(book => {
        return `
        <div class="flash-book" data-id="${book.id}">
            <div class="flash-book-cover" style="background: ${book.coverColor}">
                <img src="${book.cover}" alt="${book.title}" loading="lazy">
            </div>
            <div class="flash-book-title">${book.title}</div>
            <div class="flash-book-price">${formatPrice(book.price)}</div>
            <div class="flash-book-old-price">${formatPrice(book.oldPrice)}</div>
        </div>
        `;
    }).join('');

    flashBooks.querySelectorAll('.flash-book').forEach(el => {
        el.addEventListener('click', () => openModal(parseInt(el.dataset.id)));
    });
}

// ===== Flash Sale Timer =====
function startTimer() {
    // Set deadline to next 3 days from now
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 3);
    deadline.setHours(0, 0, 0, 0);

    function update() {
        const now = new Date();
        const diff = deadline - now;
        if (diff <= 0) {
            // Reset to another 3 days
            deadline.setDate(deadline.getDate() + 3);
            return update();
        }
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById('hours').textContent = toPersianNum(String(h).padStart(2, '0'));
        document.getElementById('minutes').textContent = toPersianNum(String(m).padStart(2, '0'));
        document.getElementById('seconds').textContent = toPersianNum(String(s).padStart(2, '0'));
    }
    update();
    setInterval(update, 1000);
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
            id: book.id, title: book.title, author: book.author,
            price: book.price, coverColor: book.coverColor, cover: book.cover,
            category: book.category, qty: 1
        });
    }
    saveCart();
    renderCart();
    cartCount.classList.add('bump');
    setTimeout(() => cartCount.classList.remove('bump'), 400);
    showToast(`"${book.title}" به سبد اضافه شد`, 'check');
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

function cartSubtotalCalc() {
    return cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
}

function renderCart() {
    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = cartSubtotalCalc();
    const shipping = subtotal >= 200000 ? 0 : (subtotal > 0 ? 45000 : 0);
    const total = subtotal + shipping;

    cartCount.textContent = toPersianNum(totalItems);
    cartCount.setAttribute('data-count', totalItems);
    cartItemCount.textContent = `(${toPersianNum(totalItems)})`;
    cartSubtotal.textContent = formatPrice(subtotal);

    // Update bottom nav cart badge
    const bnCartCount = document.getElementById('bnCartCount');
    if (bnCartCount) {
        bnCartCount.textContent = toPersianNum(totalItems);
        bnCartCount.setAttribute('data-count', totalItems);
    }

    if (cart.length === 0) {
        cartItems.style.display = 'none';
        cartFooter.style.display = 'none';
        cartEmpty.style.display = 'flex';
        return;
    }
    cartItems.style.display = 'block';
    cartFooter.style.display = 'block';
    cartEmpty.style.display = 'none';

    cartItems.innerHTML = cart.map(item => {
        return `
        <div class="cart-item">
            <div class="cart-item-cover" style="background: ${item.coverColor}">
                <img src="${item.cover}" alt="${item.title}" loading="lazy">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-author">${item.author}</div>
                <div class="cart-item-bottom">
                    <span class="cart-item-price">${formatPrice(item.price * item.qty)}</span>
                    <div class="cart-qty">
                        <button data-id="${item.id}" data-delta="-1">${icons.minus}</button>
                        <span>${toPersianNum(item.qty)}</span>
                        <button data-id="${item.id}" data-delta="1">${icons.plus}</button>
                    </div>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" aria-label="حذف">${icons.trash}</button>
        </div>
        `;
    }).join('');

    cartTotal.textContent = formatPrice(total);

    // Update shipping line dynamically
    const shippingRow = document.querySelector('.summary-row:nth-child(2) span:last-child');
    if (shippingRow) {
        if (shipping === 0) {
            shippingRow.textContent = 'رایگان';
            shippingRow.classList.add('free-shipping');
        } else {
            shippingRow.textContent = formatPrice(shipping);
            shippingRow.classList.remove('free-shipping');
        }
    }

    cartItems.querySelectorAll('.cart-qty button').forEach(btn => {
        btn.addEventListener('click', () => {
            changeQty(parseInt(btn.dataset.id), parseInt(btn.dataset.delta));
        });
    });
    cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
    });
}

// ===== Wishlist =====
function toggleWishlist(bookId) {
    const book = books.find(b => b.id === bookId);
    const idx = wishlist.indexOf(bookId);
    if (idx > -1) {
        wishlist.splice(idx, 1);
        showToast(`از علاقه‌مندی حذف شد`, 'heart');
    } else {
        wishlist.push(bookId);
        showToast(`"${book.title}" به علاقه‌مندی اضافه شد`, 'heart');
    }
    localStorage.setItem('bookland-wishlist', JSON.stringify(wishlist));
    renderWishlist();
    renderBooks();
}

function renderWishlist() {
    wishlistCount.textContent = toPersianNum(wishlist.length);
    wishlistCount.setAttribute('data-count', wishlist.length);
    wishItemCount.textContent = `(${toPersianNum(wishlist.length)})`;

    if (wishlist.length === 0) {
        wishlistItems.style.display = 'none';
        wishlistEmpty.style.display = 'flex';
        return;
    }
    wishlistItems.style.display = 'block';
    wishlistEmpty.style.display = 'none';

    wishlistItems.innerHTML = wishlist.map(id => {
        const book = books.find(b => b.id === id);
        if (!book) return '';
        return `
        <div class="cart-item">
            <div class="cart-item-cover" style="background: ${book.coverColor}">
                <img src="${book.cover}" alt="${book.title}" loading="lazy">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${book.title}</div>
                <div class="cart-item-author">${book.author}</div>
                <div class="cart-item-bottom">
                    <span class="cart-item-price">${formatPrice(book.price)}</span>
                </div>
                <button class="wish-move-btn" data-id="${book.id}">${icons.cart} افزودن به سبد</button>
            </div>
            <button class="cart-item-remove" data-id="${book.id}" aria-label="حذف">${icons.trash}</button>
        </div>
        `;
    }).join('');

    wishlistItems.querySelectorAll('.wish-move-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            addToCart(parseInt(btn.dataset.id));
        });
    });
    wishlistItems.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => toggleWishlist(parseInt(btn.dataset.id)));
    });
}

// ===== Book Modal =====
function openModal(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    const inWishlist = wishlist.includes(book.id);

    modalBody.innerHTML = `
        <div class="modal-cover" style="background: ${book.coverColor}">
            <img src="${book.cover}" alt="${book.title}">
        </div>
        <div class="modal-info">
            <div class="modal-category">${book.categoryName}</div>
            <h2 class="modal-title">${book.title}</h2>
            <p class="modal-author">تألیف: ${book.author}</p>
            <div class="modal-rating">
                <span class="stars">${starRating(book.rating)}</span>
                <span class="modal-rating-text">${toPersianNum(book.rating)} از ۵ — ${toPersianNum(book.ratingCount)} نظر</span>
            </div>
            <p class="modal-desc">${book.description}</p>
            <div class="modal-meta">
                <div class="modal-meta-item">
                    <span class="modal-meta-label">ناشر</span>
                    <span class="modal-meta-value">${book.publisher}</span>
                </div>
                <div class="modal-meta-item">
                    <span class="modal-meta-label">تعداد صفحات</span>
                    <span class="modal-meta-value">${toPersianNum(book.pages)} صفحه</span>
                </div>
                <div class="modal-meta-item">
                    <span class="modal-meta-label">سال انتشار</span>
                    <span class="modal-meta-value">${toPersianNum(book.year)}</span>
                </div>
                <div class="modal-meta-item">
                    <span class="modal-meta-label">دسته‌بندی</span>
                    <span class="modal-meta-value">${book.categoryName}</span>
                </div>
            </div>
            <div class="modal-price-row">
                <div class="modal-prices">
                    <span class="modal-price">${formatPrice(book.price)}</span>
                    ${book.oldPrice > 0 ? `<span class="modal-old-price">${formatPrice(book.oldPrice)}</span>` : ''}
                </div>
                ${book.discount > 0 ? `<span class="book-discount-badge">٪${toPersianNum(book.discount)} تخفیف</span>` : ''}
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" id="modalAddCart">${icons.cart} <span>افزودن به سبد</span></button>
                <button class="modal-wishlist-btn ${inWishlist ? 'active' : ''}" id="modalWish">${inWishlist ? icons.heartFilled : icons.heart}</button>
            </div>
        </div>
    `;

    bookModal.classList.add('active');
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    document.getElementById('modalAddCart').addEventListener('click', () => {
        addToCart(book.id);
    });
    document.getElementById('modalWish').addEventListener('click', () => {
        toggleWishlist(book.id);
        const btn = document.getElementById('modalWish');
        const isIn = wishlist.includes(book.id);
        btn.classList.toggle('active', isIn);
        btn.innerHTML = isIn ? icons.heartFilled : icons.heart;
    });
}

function closeModal() {
    bookModal.classList.remove('active');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Reviews Slider =====
let reviewIndex = 0;
function renderReviews() {
    reviewsTrack.innerHTML = reviews.map(r => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar" style="background: ${r.avatarColor}">${r.avatar}</div>
                <div>
                    <div class="review-name">${r.name}</div>
                    <div class="review-role">${r.role}</div>
                </div>
                <div class="review-rating">${starRating(r.rating)}</div>
            </div>
            <div class="review-quote">${r.text}</div>
        </div>
    `).join('');

    sliderDots.innerHTML = reviews.map((_, i) =>
        `<button class="slider-dot ${i === 0 ? 'active' : ''}" data-i="${i}" aria-label="اسلاید ${toPersianNum(i+1)}"></button>`
    ).join('');

    sliderDots.querySelectorAll('.slider-dot').forEach(dot => {
        dot.addEventListener('click', () => goToReview(parseInt(dot.dataset.i)));
    });
}

function goToReview(idx) {
    const total = reviews.length;
    const visible = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
    const maxIdx = Math.max(0, total - visible);
    reviewIndex = Math.max(0, Math.min(idx, maxIdx));
    const cardWidth = reviewsTrack.querySelector('.review-card').offsetWidth + 24;
    reviewsTrack.scrollLeft = reviewIndex * cardWidth;
    sliderDots.querySelectorAll('.slider-dot').forEach((d, i) => {
        d.classList.toggle('active', i === reviewIndex);
    });
}

// ===== Cart / Wishlist Sidebars =====
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
function openWishlist() {
    wishlistSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeWishlist() {
    wishlistSidebar.classList.remove('active');
    if (!cartSidebar.classList.contains('active')) {
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== Toast =====
function showToast(message, iconName = 'check') {
    toastIcon.innerHTML = icons[iconName] || icons.check;
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ===== Event Bindings =====
function bindEvents() {
    themeToggle.addEventListener('click', toggleTheme);

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        if (window.scrollY > 400) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
        updateActiveNav();
    });

    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', () => { closeCart(); closeWishlist(); });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        showToast('سفارش ثبت شد! در حال انتقال به درگاه پرداخت...', 'check');
        setTimeout(() => {
            cart = [];
            saveCart();
            renderCart();
            closeCart();
        }, 1500);
    });

    searchInput.addEventListener('input', e => {
        searchQuery = e.target.value;
        renderBooks();
    });

    categoryFilter.addEventListener('change', e => {
        activeCategory = e.target.value;
        renderBooks();
    });

    sortFilter.addEventListener('change', e => {
        sortMode = e.target.value;
        renderBooks();
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    newsletterForm.addEventListener('submit', e => {
        e.preventDefault();
        showToast('عضویت در خبرنامه با موفقیت انجام شد', 'bell');
        newsletterForm.reset();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeCart(); closeWishlist(); closeModal();
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Modal
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Wishlist
    wishlistBtn.addEventListener('click', openWishlist);
    wishClose.addEventListener('click', closeWishlist);
    startShopping.addEventListener('click', () => {
        closeCart();
        document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
    });

    // Reviews slider
    prevReviewBtn.addEventListener('click', () => goToReview(reviewIndex - 1));
    nextReviewBtn.addEventListener('click', () => goToReview(reviewIndex + 1));

    // Bottom nav
    document.getElementById('bnSearch').addEventListener('click', () => {
        document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => searchInput.focus(), 600);
    });
    document.getElementById('bnCart').addEventListener('click', openCart);
    document.querySelectorAll('.bottom-nav-item[data-target]').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.bottom-nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Window resize - recompute slider
    window.addEventListener('resize', () => goToReview(reviewIndex));
}

// ===== Active Nav Update =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    const bottomItems = document.querySelectorAll('.bottom-nav-item[data-target]');
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) current = section.id;
    });
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) item.classList.add('active');
    });
    bottomItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.target === current) item.classList.add('active');
    });
}
