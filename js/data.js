// Book data - کتاب‌های فروشگاه
const books = [
    {
        id: 1,
        title: "بوی قهوه و خیانت",
        author: "حامد صبوری",
        category: "novel",
        categoryName: "رمان",
        price: 185000,
        oldPrice: 230000,
        rating: 4.8,
        ratingCount: 1240,
        cover: "📕",
        coverColor: "linear-gradient(135deg, #ff6b6b, #ee5a6f)",
        discount: 20
    },
    {
        id: 2,
        title: "کوانتوم برای همه",
        author: "دکتر سیمین احمدی",
        category: "science",
        categoryName: "علمی",
        price: 320000,
        oldPrice: 0,
        rating: 4.9,
        ratingCount: 856,
        cover: "📘",
        coverColor: "linear-gradient(135deg, #4ecdc4, #44a8a0)",
        discount: 0
    },
    {
        id: 3,
        title: "تاریخ فلسفه اسلامی",
        author: "دکتر محمد رضایی",
        category: "philosophy",
        categoryName: "فلسفه",
        price: 275000,
        oldPrice: 340000,
        rating: 4.7,
        ratingCount: 432,
        cover: "📗",
        coverColor: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
        discount: 19
    },
    {
        id: 4,
        title: "برنامه‌نویسی تمیز در پایتون",
        author: "امیر کاظمی",
        category: "tech",
        categoryName: "فناوری",
        price: 450000,
        oldPrice: 520000,
        rating: 4.9,
        ratingCount: 2103,
        cover: "💻",
        coverColor: "linear-gradient(135deg, #fd79a8, #e84393)",
        discount: 13
    },
    {
        id: 5,
        title: "مردی که خیلی می‌خندید",
        author: "نگار محمدی",
        category: "novel",
        categoryName: "رمان",
        price: 165000,
        oldPrice: 0,
        rating: 4.6,
        ratingCount: 678,
        cover: "📙",
        coverColor: "linear-gradient(135deg, #ffe66d, #ffc847)",
        discount: 0
    },
    {
        id: 6,
        title: "رمزهای موفقیت در کسب‌وکار",
        author: "علی رستگار",
        category: "business",
        categoryName: "کسب‌وکار",
        price: 290000,
        oldPrice: 360000,
        rating: 4.5,
        ratingCount: 1567,
        cover: "📊",
        coverColor: "linear-gradient(135deg, #00b894, #00cec9)",
        discount: 19
    },
    {
        id: 7,
        title: "نجات یافته",
        author: "سارا میرزایی",
        category: "novel",
        categoryName: "رمان",
        price: 210000,
        oldPrice: 260000,
        rating: 4.8,
        ratingCount: 943,
        cover: "📕",
        coverColor: "linear-gradient(135deg, #ee5a6f, #f368e0)",
        discount: 19
    },
    {
        id: 8,
        title: "هوش مصنوعی در نگاهی ساده",
        author: "دکتر رضا ملکی",
        category: "tech",
        categoryName: "فناوری",
        price: 380000,
        oldPrice: 0,
        rating: 4.9,
        ratingCount: 1834,
        cover: "🤖",
        coverColor: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
        discount: 0
    },
    {
        id: 9,
        title: "کیمیاگری شادی",
        author: "مریم حسینی",
        category: "psychology",
        categoryName: "روان‌شناسی",
        price: 195000,
        oldPrice: 240000,
        rating: 4.7,
        ratingCount: 2156,
        cover: "✨",
        coverColor: "linear-gradient(135deg, #fdcb6e, #e17055)",
        discount: 19
    },
    {
        id: 10,
        title: "نظریه نسبیت برای مبتدی‌ها",
        author: "دکتر کیان پارسا",
        category: "science",
        categoryName: "علمی",
        price: 240000,
        oldPrice: 0,
        rating: 4.6,
        ratingCount: 567,
        cover: "🌌",
        coverColor: "linear-gradient(135deg, #0984e3, #6c5ce7)",
        discount: 0
    },
    {
        id: 11,
        title: "آشپزخانه مادرم",
        author: "نگار اکبری",
        category: "cooking",
        categoryName: "آشپزی",
        price: 145000,
        oldPrice: 180000,
        rating: 4.8,
        ratingCount: 3245,
        cover: "🍳",
        coverColor: "linear-gradient(135deg, #ff7675, #fd79a8)",
        discount: 19
    },
    {
        id: 12,
        title: "مدیریت زمان در قرن بیست‌ویکم",
        author: "حسین موسوی",
        category: "business",
        categoryName: "کسب‌وکار",
        price: 230000,
        oldPrice: 280000,
        rating: 4.5,
        ratingCount: 1089,
        cover: "⏰",
        coverColor: "linear-gradient(135deg, #00cec9, #0984e3)",
        discount: 18
    },
    {
        id: 13,
        title: "سفر به اعماق ذهن",
        author: "دکتر فرزانه نوری",
        category: "psychology",
        categoryName: "روان‌شناسی",
        price: 260000,
        oldPrice: 0,
        rating: 4.7,
        ratingCount: 745,
        cover: "🧠",
        coverColor: "linear-gradient(135deg, #a29bfe, #6c5ce7)",
        discount: 0
    },
    {
        id: 14,
        title: "افسانه‌های کهن ایرانی",
        author: "دکتر بهرام فرهادی",
        category: "history",
        categoryName: "تاریخ",
        price: 310000,
        oldPrice: 380000,
        rating: 4.9,
        ratingCount: 1320,
        cover: "🏺",
        coverColor: "linear-gradient(135deg, #e17055, #fdcb6e)",
        discount: 18
    },
    {
        id: 15,
        title: "آموزش جاوااسکریپت مدرن",
        author: "محمد جواد کریمی",
        category: "tech",
        categoryName: "فناوری",
        price: 420000,
        oldPrice: 500000,
        rating: 4.9,
        ratingCount: 2876,
        cover: "📜",
        coverColor: "linear-gradient(135deg, #feca57, #ff9ff3)",
        discount: 16
    },
    {
        id: 16,
        title: "هنر شاد زیستن",
        author: "زهرا ابراهیمی",
        category: "psychology",
        categoryName: "روان‌شناسی",
        price: 175000,
        oldPrice: 0,
        rating: 4.6,
        ratingCount: 1890,
        cover: "🌸",
        coverColor: "linear-gradient(135deg, #fd79a8, #fdcb6e)",
        discount: 0
    }
];

// Categories
const categories = [
    { id: "all", name: "همه کتاب‌ها", icon: "📚", count: books.length },
    { id: "novel", name: "رمان و داستان", icon: "📕", count: books.filter(b => b.category === "novel").length },
    { id: "science", name: "علمی", icon: "🔬", count: books.filter(b => b.category === "science").length },
    { id: "tech", name: "فناوری و کامپیوتر", icon: "💻", count: books.filter(b => b.category === "tech").length },
    { id: "philosophy", name: "فلسفه", icon: "🤔", count: books.filter(b => b.category === "philosophy").length },
    { id: "psychology", name: "روان‌شناسی", icon: "🧠", count: books.filter(b => b.category === "psychology").length },
    { id: "business", name: "کسب‌وکار", icon: "📊", count: books.filter(b => b.category === "business").length },
    { id: "history", name: "تاریخ", icon: "🏛️", count: books.filter(b => b.category === "history").length },
    { id: "cooking", name: "آشپزی", icon: "🍳", count: books.filter(b => b.category === "cooking").length }
];

// Convert numbers to Persian format
function toPersianNum(num) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(/\d/g, d => persianDigits[d]);
}

// Format price in Toman
function formatPrice(price) {
    return toPersianNum(price.toLocaleString('en-US')) + ' تومان';
}
