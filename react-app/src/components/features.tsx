'use client';

import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

export function Features() {
  const items = [
    { icon: <Truck className="w-5 h-5 text-primary" />, title: 'ارسال رایگان', desc: 'بالای ۲۰۰ هزار تومان' },
    { icon: <ShieldCheck className="w-5 h-5 text-primary" />, title: 'پرداخت امن', desc: 'درگاه‌های معتبر' },
    { icon: <RefreshCw className="w-5 h-5 text-primary" />, title: 'ضمانت بازگشت', desc: 'تا ۷ روز' },
    { icon: <Headphones className="w-5 h-5 text-primary" />, title: 'پشتیبانی', desc: '۲۴ ساعته' },
  ];
  return (
    <section className="py-6 glass">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="glass w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <div className="text-sm font-bold">{f.title}</div>
                <div className="text-xs text-muted-foreground">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
