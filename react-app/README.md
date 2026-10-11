# 🌸 دخترانه | فروشگاه روز دختر (React + Next.js)

این نسخه **React.js** سایت دخترانه است! 

## 🚀 تکنولوژی‌ها

- **Next.js 16** با App Router
- **React** + TypeScript
- **Tailwind CSS 4**
- **shadcn/ui** کامپوننت‌ها
- **Lucide Icons**
- **Context API** برای state

## 📂 ساختار

```
react-app/
├── src/
│   ├── app/
│   │   ├── page.tsx          # صفحه اصلی
│   │   ├── layout.tsx        # لایوت
│   │   └── globals.css       # استایل‌ها
│   ├── components/
│   │   ├── navbar.tsx        # نوار بالا
│   │   ├── hero.tsx          # هیرو
│   │   ├── product-card.tsx  # کارت محصول 3D
│   │   ├── products.tsx      # لیست محصولات
│   │   ├── categories.tsx    # دسته‌بندی
│   │   ├── cart-sidebar.tsx  # سبد خرید
│   │   ├── product-modal.tsx # مودال محصول
│   │   ├── reviews.tsx       # نظرات
│   │   ├── footer.tsx        # فوتر
│   │   └── ui/               # shadcn components
│   └── lib/
│       ├── data.ts           # داده محصولات
│       ├── store.tsx         # Context API
│       └── utils.ts
├── public/covers/            # تصاویر محصولات
└── package.json
```

## ✨ امکانات

- 🎴 3D Tilt Effect روی کارت‌ها
- 💎 Glassmorphism (شیشه‌ای)
- 🌊 پارالاکس اسکرول
- ✨ Cursor Glow
- 🌙 تم دارک/لایت
- 🛒 سبد خرید + علاقه‌مندی
- 📱 ریسپانسیو

## 🏃 اجرا

```bash
cd react-app
npm install
npm run dev
```

سپس به `http://localhost:3000` بروید.

---

**نکته:** نسخه قدیمی HTML/CSS/JS در پوشه ریشه (`/bookstore/`) هست و هنوز روی GitHub Pages قابل دسترسه:
https://sofiyabahari465-tech.github.io/bookshop/

برای deploy نسخه React، باید به Vercel یا Netlify ببرید.
