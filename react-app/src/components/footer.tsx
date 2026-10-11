'use client';

import { Sparkles, MapPin, Phone, Mail, Clock, Instagram, Send, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="glass pt-14 pb-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-extrabold mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              دخترانه <span className="text-primary">💕</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4 max-w-xs">
              بزرگ‌ترین فروشگاه آنلاین محصولات دخترانه با تنوع بی‌نظیر و خدمات حرفه‌ای
            </p>
            <div className="flex gap-2">
              <a href="#" className="glass w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="glass w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Send className="w-4 h-4" />
              </a>
              <a href="#" className="glass w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="glass w-9 h-9 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-3">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><a href="#home" className="hover:text-primary transition-colors">خانه</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">محصولات</a></li>
              <li><a href="#categories" className="hover:text-primary transition-colors">دسته‌بندی</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">درباره ما</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-3">خدمات مشتریان</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">سوالات متداول</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">شرایط ارسال</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">پیگیری سفارش</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">بازگشت کالا</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-3">تماس با ما</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-primary" /> تهران، خیابان زیبایی، پلاک ۱۰</li>
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-primary" /> ۰۲۱-۱۲۳۴۵۶۷۸</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-primary" /> info@dokhtarane.ir</li>
              <li className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary" /> شنبه تا جمعه، ۹ تا ۲۱</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-4 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <p>© ۱۴۰۳ دخترانه. روز دخترت مبارک 💕</p>
          <p>ساخته شده با عشق برای دختران ایران</p>
        </div>
      </div>
    </footer>
  );
}
