// Product data for Girl's Day shop - دخترانه
export interface Product {
  id: number;
  title: string;
  brand: string;
  shop: string;
  category: string;
  categoryName: string;
  price: number;
  oldPrice: number;
  rating: number;
  ratingCount: number;
  coverColor: string;
  cover: string;
  discount: number;
  isBestseller: boolean;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export const products: Product[] = [
  {
    id: 1,
    title: "گردنبند قلب نقره",
    brand: "برند زرگران",
    shop: "دخترانه کالکشن",
    category: "jewelry",
    categoryName: "زیورآلات",
    price: 285000,
    oldPrice: 380000,
    rating: 4.9,
    ratingCount: 1240,
    coverColor: "linear-gradient(135deg, #ff9ff3, #ee5a6f)",
    cover: "/covers/jewelry-1.png",
    discount: 25,
    isBestseller: true,
    description: "گردنبند نقره با طراحی قلب ظریف و نگین پلنگی. مناسب برای کادوی روز دختر. زنجیر ۴۵ سانتی‌متری با ضخامت ۱ میلی‌متر."
  },
  {
    id: 2,
    title: "عطر رز گلد",
    brand: "پرفیومری پاریس",
    shop: "دخترانه بتیوتی",
    category: "perfume",
    categoryName: "عطر",
    price: 690000,
    oldPrice: 0,
    rating: 4.8,
    ratingCount: 856,
    coverColor: "linear-gradient(135deg, #fd79a8, #e84393)",
    cover: "/covers/perfume-1.png",
    discount: 0,
    isBestseller: true,
    description: "عطر زنانه با نت‌های رز، یاس و وانیل. ماندگاری ۸ ساعته. حجم ۵۰ میلی‌لیتر. مناسب برای هدیه روز دختر."
  },
  {
    id: 3,
    title: "دستبند چرم صورتی",
    brand: "دخترانه کالکشن",
    shop: "دخترانه کالکشن",
    category: "jewelry",
    categoryName: "زیورآلات",
    price: 145000,
    oldPrice: 195000,
    rating: 4.7,
    ratingCount: 432,
    coverColor: "linear-gradient(135deg, #fd79a8, #fdcb6e)",
    cover: "/covers/jewelry-2.png",
    discount: 26,
    isBestseller: false,
    description: "دستبند چرم طبیعی صورتی با بندهای تنظیم‌شونده. طراحی مدرن و مناسب استفاده روزمره."
  },
  {
    id: 4,
    title: "کیف دستی چرمی مینیمال",
    brand: "دخترانه فشن",
    shop: "دخترانه فشن",
    category: "bag",
    categoryName: "کیف",
    price: 890000,
    oldPrice: 1100000,
    rating: 4.9,
    ratingCount: 2103,
    coverColor: "linear-gradient(135deg, #a29bfe, #6c5ce7)",
    cover: "/covers/bag-1.png",
    discount: 19,
    isBestseller: true,
    description: "کیف دستی چرم طبیعی با طراحی مینیمال و رنگ لاکی. دارای بند قابل تنظیم و جیب داخلی. ابعاد ۲۵×۱۸ سانتی‌متر."
  },
  {
    id: 5,
    title: "رژلب مات مخملی",
    brand: "بیوتی لاين",
    shop: "دخترانه بتیوتی",
    category: "makeup",
    categoryName: "آرایش",
    price: 185000,
    oldPrice: 0,
    rating: 4.6,
    ratingCount: 678,
    coverColor: "linear-gradient(135deg, #e84393, #c41869)",
    cover: "/covers/makeup-1.png",
    discount: 0,
    isBestseller: false,
    description: "رژلب مات با ماندگاری ۱۲ ساعته و فرمول آبرسانی. رنگ مخملی صورتی. حجم ۴ گرم."
  },
  {
    id: 6,
    title: "مانتو کرپ دخترانه",
    brand: "دخترانه فشن",
    shop: "دخترانه فشن",
    category: "clothing",
    categoryName: "لباس",
    price: 1290000,
    oldPrice: 1600000,
    rating: 4.5,
    ratingCount: 1567,
    coverColor: "linear-gradient(135deg, #fd79a8, #a29bfe)",
    cover: "/covers/clothing-1.png",
    discount: 19,
    isBestseller: true,
    description: "مانتو کرپ پشمیر با طراحی مدرن و رنگ پاستلی. سایزبندی ۳۸ تا ۴۶. مناسب فصل بهار و پاییز."
  },
  {
    id: 7,
    title: "ست هدیه پرنسس",
    brand: "دخترانه گیف",
    shop: "دخترانه گیف",
    category: "gift",
    categoryName: "هدیه",
    price: 590000,
    oldPrice: 750000,
    rating: 4.8,
    ratingCount: 943,
    coverColor: "linear-gradient(135deg, #ff9ff3, #fd79a8)",
    cover: "/covers/gift-1.png",
    discount: 21,
    isBestseller: false,
    description: "ست هدیه ویژه روز دختر شامل: عروسک کوچک، گل رز مصنوعی، شمع معطر و کارت تبریک. در باکس لوکس صورتی."
  },
  {
    id: 8,
    title: "گوشواره الماس نقره",
    brand: "برند زرگران",
    shop: "دخترانه کالکشن",
    category: "jewelry",
    categoryName: "زیورآلات",
    price: 480000,
    oldPrice: 0,
    rating: 4.9,
    ratingCount: 1834,
    coverColor: "linear-gradient(135deg, #a29bfe, #fd79a8)",
    cover: "/covers/jewelry-3.png",
    discount: 0,
    isBestseller: true,
    description: "گوشواره نقره با طراحی الماس‌های کوچک درشت. مناسب مناسبت‌های خاص و کادوی روز دختر."
  },
  {
    id: 9,
    title: "پالت سایه چرم ۱۲ رنگ",
    brand: "بیوتی لاين",
    shop: "دخترانه بتیوتی",
    category: "makeup",
    categoryName: "آرایش",
    price: 295000,
    oldPrice: 360000,
    rating: 4.7,
    ratingCount: 2156,
    coverColor: "linear-gradient(135deg, #fdcb6e, #e84393)",
    cover: "/covers/makeup-2.png",
    discount: 18,
    isBestseller: true,
    description: "پالت سایه ۱۲ رنگ با ترکیب رنگ‌های مات و شیمر. مناسب برای میکاپ روز و شب. رنگ‌دانه‌گی بالا."
  },
  {
    id: 10,
    title: "کوله پشتی چرم دخترانه",
    brand: "دخترانه فشن",
    shop: "دخترانه فشن",
    category: "bag",
    categoryName: "کیف",
    price: 750000,
    oldPrice: 0,
    rating: 4.6,
    ratingCount: 567,
    coverColor: "linear-gradient(135deg, #ff9ff3, #fd79a8)",
    cover: "/covers/bag-2.png",
    discount: 0,
    isBestseller: false,
    description: "کوله پشتی چرم پاستلی با جیب‌بندی متنوع و بند های راحت. مناسب دانش‌آموزی و کار. ابعاد ۳۰×۴۰ سانتی‌متر."
  },
  {
    id: 11,
    title: "بادی لوشن رز و شیر",
    brand: "پرفیومری پاریس",
    shop: "دخترانه بتیوتی",
    category: "perfume",
    categoryName: "عطر",
    price: 195000,
    oldPrice: 240000,
    rating: 4.8,
    ratingCount: 3245,
    coverColor: "linear-gradient(135deg, #fd79a8, #fdcb6e)",
    cover: "/covers/perfume-2.png",
    discount: 19,
    isBestseller: false,
    description: "بادی لوشن آبرسان با عصاره رز و شیر. حجم ۲۵۰ میلی‌لیتر. مناسب پوست خشک و حساس."
  },
  {
    id: 12,
    title: "صندل پاشنه کوتاه",
    brand: "دخترانه فشن",
    shop: "دخترانه فشن",
    category: "clothing",
    categoryName: "لباس",
    price: 490000,
    oldPrice: 620000,
    rating: 4.5,
    ratingCount: 1089,
    coverColor: "linear-gradient(135deg, #a29bfe, #fd79a8)",
    cover: "/covers/clothing-2.png",
    discount: 21,
    isBestseller: false,
    description: "صندل پاشنه کوتاه با رنگ صورتی پاستلی. سایز ۳۷ تا ۴۱. راحت و مناسب استفاده روزمره."
  },
  {
    id: 13,
    title: "انگشتر نگین صورتی",
    brand: "برند زرگران",
    shop: "دخترانه کالکشن",
    category: "jewelry",
    categoryName: "زیورآلات",
    price: 320000,
    oldPrice: 0,
    rating: 4.7,
    ratingCount: 745,
    coverColor: "linear-gradient(135deg, #fd79a8, #e84393)",
    cover: "/covers/jewelry-4.png",
    discount: 0,
    isBestseller: false,
    description: "انگشتر نقره با نگین صورتی کوارتز. طراحی ظریف و قابل تنظیم. مناسب هدیه روز دختر."
  },
  {
    id: 14,
    title: "گل رز مصنوعی باکس لوکس",
    brand: "دخترانه گیف",
    shop: "دخترانه گیف",
    category: "gift",
    categoryName: "هدیه",
    price: 350000,
    oldPrice: 440000,
    rating: 4.9,
    ratingCount: 1320,
    coverColor: "linear-gradient(135deg, #e84393, #fdcb6e)",
    cover: "/covers/gift-2.png",
    discount: 20,
    isBestseller: true,
    description: "ست ۱۲ شاخه گل رز مصنوعی با باکس چوبی لوکس. مناسب کادوی روز دختر با ماندگاری چندین سال."
  },
  {
    id: 15,
    title: "کرم پودر مات طولانی",
    brand: "بیوتی لاين",
    shop: "دخترانه بتیوتی",
    category: "makeup",
    categoryName: "آرایش",
    price: 420000,
    oldPrice: 510000,
    rating: 4.9,
    ratingCount: 2876,
    coverColor: "linear-gradient(135deg, #fdcb6e, #fd79a8)",
    cover: "/covers/makeup-3.png",
    discount: 18,
    isBestseller: true,
    description: "کرم پودر مات با پوشانندگی بالا و ماندگاری ۱۶ ساعته. مناسب پوست چرب و معمولی. SPF 20."
  },
  {
    id: 16,
    title: "شال نازک پاستلی",
    brand: "دخترانه فشن",
    shop: "دخترانه فشن",
    category: "clothing",
    categoryName: "لباس",
    price: 175000,
    oldPrice: 0,
    rating: 4.6,
    ratingCount: 1890,
    coverColor: "linear-gradient(135deg, #ff9ff3, #a29bfe)",
    cover: "/covers/clothing-3.png",
    discount: 0,
    isBestseller: false,
    description: "شال نازک با رنگ پاستلی و طراحی لبه‌دار. ابعاد ۷۰×۲۰۰ سانتی‌متر. مناسب فصل بهار."
  }
];

export const categories: Category[] = [
  { id: "all", name: "همه محصولات", count: products.length },
  { id: "jewelry", name: "زیورآلات", count: products.filter(p => p.category === "jewelry").length },
  { id: "perfume", name: "عطر و ادکلن", count: products.filter(p => p.category === "perfume").length },
  { id: "bag", name: "کیف و کفش", count: products.filter(p => p.category === "bag").length },
  { id: "makeup", name: "لوازم آرایشی", count: products.filter(p => p.category === "makeup").length },
  { id: "clothing", name: "لباس", count: products.filter(p => p.category === "clothing").length },
  { id: "gift", name: "هدیه و فانتزی", count: products.filter(p => p.category === "gift").length }
];

export interface Review {
  name: string;
  role: string;
  avatar: string;
  avatarColor: string;
  rating: number;
  text: string;
}

export const reviews: Review[] = [
  {
    name: "نگار محمدی",
    role: "مشتری وفادار",
    avatar: "ن",
    avatarColor: "linear-gradient(135deg, #ff9ff3, #e84393)",
    rating: 5,
    text: "بهترین فروشگاه اینترنتی برای خرید کادوی روز دختر! محصولات باکیفیت و ارسال فوق‌العاده سریع. ممنون از تیم دخترانه 💕"
  },
  {
    name: "سارا احمدی",
    role: "مشتری",
    avatar: "س",
    avatarColor: "linear-gradient(135deg, #a29bfe, #fd79a8)",
    rating: 5,
    text: "ست هدیه پرنسس رو خریدم برای دوستام و همه خوششون اومد. باکس خیلی لوکس و محصولات باکیفیتی داشت. حتماً دوباره خرید می‌کنم 🌸"
  },
  {
    name: "مریم رضایی",
    role: "مدیر مارکت",
    avatar: "م",
    avatarColor: "linear-gradient(135deg, #fdcb6e, #fd79a8)",
    rating: 5,
    text: "کیفیت محصولات واقعاً عالیه. عطر رز گلد رو خریدم و بوی فوق‌العاده‌ای داره. ماندگاریش هم خوبه. پیشنهاد می‌کنم 💖"
  },
  {
    name: "الهام کریمی",
    role: "دانشجو",
    avatar: "ه",
    avatarColor: "linear-gradient(135deg, #fd79a8, #a29bfe)",
    rating: 5,
    text: "پشتیبانی عالی و محصولات بی‌نظیر. گردنبند قلب نقره رو برای روز دختر کادو گرفتم و دوستام خیلی خوششون اومد. ممنون 💝"
  }
];

export const toPersianNum = (num: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, d => persianDigits[parseInt(d)]);
};

export const formatPrice = (price: number): string => {
  return toPersianNum(price.toLocaleString('en-US')) + ' تومان';
};
