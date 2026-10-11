'use client';

import { Sparkles, Check } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block glass px-3 py-1 rounded-full text-xs font-bold text-primary mb-2">درباره ما</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">چرا دخترانه؟</h2>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              ما از سال ۱۴۰۰ با هدف ایجاد یه فروشگاه تخصصی برای دختران شروع کردیم.
              تیم دخترانه با عشق، بهترین محصولات زیبایی، مد و هدیه رو با کیفیت بالا و قیمت منصفانه برای شما فراهم کرده.
            </p>
            <ul className="space-y-2.5">
              {['تنوع بیش از ۵۰۰ محصول دخترانه', 'ارسال سریع به سراسر کشور', 'ضمانت اصالت و کیفیت محصولات', 'تخفیف‌های ویژه روز دختر'].map((t, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#e84393] to-[#a29bfe] text-white flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-5 text-center mt-8">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-base font-bold mb-1">ماموریت ما</h3>
              <p className="text-xs text-muted-foreground">هر دختر بتونه با خیال راحت خرید کنه</p>
            </div>
            <div className="glass rounded-2xl p-5 text-center">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-base font-bold mb-1">چشم‌انداز</h3>
              <p className="text-xs text-muted-foreground">بزرگ‌ترین فروشگاه آنلاین دخترانه منطقه</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
