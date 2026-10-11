'use client';

import { useState, useMemo } from 'react';
import { products, categories } from '@/lib/data';
import { ProductCard } from './product-card';
import { Search, SlidersHorizontal } from 'lucide-react';

export function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');

  const filtered = useMemo(() => {
    let result = [...products];
    if (category !== 'all') result = result.filter(p => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [search, category, sort]);

  return (
    <section id="products" className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-block glass px-3 py-1 rounded-full text-xs font-bold text-primary mb-2">محصولات</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">پرفروش‌ترین‌های روز دختر</h2>
          <p className="text-sm text-muted-foreground">منتخب بهترین محصولات برای کادوی روز دختر</p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="نام محصول یا برند رو بنویس..."
              className="glass w-full pr-10 pl-3 py-2.5 rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="glass px-3 py-2.5 rounded-xl text-sm border-none outline-none cursor-pointer focus:ring-2 focus:ring-primary"
            >
              <option value="all">همه دسته‌ها</option>
              {categories.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="glass px-3 py-2.5 rounded-xl text-sm border-none outline-none cursor-pointer focus:ring-2 focus:ring-primary"
            >
              <option value="default">مرتب‌سازی</option>
              <option value="price-low">ارزان‌ترین</option>
              <option value="price-high">گران‌ترین</option>
              <option value="rating">محبوب‌ترین</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>محصولی پیدا نشد. یه چیز دیگه امتحان کن!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
