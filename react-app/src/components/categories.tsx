'use client';

import { useState } from 'react';
import { categories } from '@/lib/data';
import { Sparkles, ShoppingBag, Gem, Flower2, Shirt, Gift } from 'lucide-react';

const catIcons: Record<string, React.ReactNode> = {
  all: <Sparkles className="w-6 h-6 text-primary" />,
  jewelry: <Gem className="w-6 h-6 text-primary" />,
  perfume: <Flower2 className="w-6 h-6 text-primary" />,
  bag: <ShoppingBag className="w-6 h-6 text-primary" />,
  makeup: <Sparkles className="w-6 h-6 text-primary" />,
  clothing: <Shirt className="w-6 h-6 text-primary" />,
  gift: <Gift className="w-6 h-6 text-primary" />,
};

export function Categories({ onSelect }: { onSelect: (cat: string) => void }) {
  return (
    <section id="categories" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block glass px-3 py-1 rounded-full text-xs font-bold text-primary mb-2">دسته‌بندی‌ها</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">دنبال چی می‌گردی؟</h2>
          <p className="text-sm text-muted-foreground">محصولات رو بر اساس دسته دلخواهت مرور کن</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                onSelect(cat.id);
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="tilt-card glass rounded-2xl p-3 sm:p-4 text-center hover:scale-105 transition-transform"
            >
              <div className="flex justify-center mb-2">{catIcons[cat.id]}</div>
              <div className="text-xs sm:text-sm font-bold mb-0.5">{cat.name}</div>
              <div className="text-[10px] text-muted-foreground">{cat.count} محصول</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
