'use client';

import { useState } from 'react';
import { reviews, toPersianNum } from '@/lib/data';
import { Star, ChevronRight, ChevronLeft, Quote } from 'lucide-react';

export function Reviews() {
  const [idx, setIdx] = useState(0);
  const visible = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : (typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1);
  const maxIdx = Math.max(0, reviews.length - visible);

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block glass px-3 py-1 rounded-full text-xs font-bold text-primary mb-2">نظرات مشتریان</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">دخترا چی می‌گن؟</h2>
          <p className="text-sm text-muted-foreground">بیش از ۵۰ هزار دختر راضی، تجربه‌شون رو به اشتراک گذاشتن</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIdx(i => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="glass w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="flex-1 overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500"
              style={{ transform: `translateX(${idx * (100 / visible)}%)` }}
            >
              {reviews.map((r, i) => (
                <div key={i} className="tilt-card glass rounded-2xl p-5 flex-shrink-0" style={{ width: `calc(${100 / visible}% - ${(visible - 1) * 16 / visible}px)` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base" style={{ background: r.avatarColor }}>
                      {r.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.role}</div>
                    </div>
                    <div className="mr-auto flex">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="relative pt-3">
                    <Quote className="absolute -top-2 right-0 w-8 h-8 text-primary/20" />
                    <p className="text-xs text-muted-foreground leading-relaxed">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setIdx(i => Math.min(maxIdx, i + 1))}
            disabled={idx >= maxIdx}
            className="glass w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all ${i === idx ? 'w-7 bg-primary' : 'w-2 bg-border'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
