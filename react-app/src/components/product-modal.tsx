'use client';

import { useStore } from '@/lib/store';
import { formatPrice, toPersianNum } from '@/lib/data';
import { X, Star, Heart, ShoppingBag } from 'lucide-react';

export function ProductModal() {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, wishlist } = useStore();

  if (!selectedProduct) return null;
  const product = selectedProduct;
  const inWishlist = wishlist.includes(product.id);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1700] opacity-100 visible"
        onClick={() => setSelectedProduct(null)}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-3xl max-h-[90vh] glass rounded-3xl z-[1800] overflow-hidden"
        style={{ boxShadow: '0 40px 100px rgba(232, 67, 147, 0.4)' }}>
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-destructive hover:rotate-90 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="grid md:grid-cols-[280px_1fr] max-h-[90vh] overflow-y-auto">
          <div className="h-64 md:h-full md:min-h-[300px] relative overflow-hidden" style={{ background: product.coverColor }}>
            <img src={product.cover} alt={product.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <div className="p-5">
            <div className="text-xs text-primary font-bold uppercase mb-1">{product.categoryName}</div>
            <h2 className="text-xl font-extrabold mb-1">{product.title}</h2>
            <p className="text-sm text-muted-foreground mb-3">برند: {product.brand}</p>
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-4 h-4 ${i <= Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {toPersianNum(product.rating)} از ۵ — {toPersianNum(product.ratingCount)} نظر
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">{product.description}</p>
            <div className="grid grid-cols-2 gap-2 mb-4 p-3 glass rounded-xl">
              <div>
                <div className="text-[10px] text-muted-foreground">فروشگاه</div>
                <div className="text-xs font-semibold">{product.shop}</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground">دسته‌بندی</div>
                <div className="text-xs font-semibold">{product.categoryName}</div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xl font-extrabold text-primary">{formatPrice(product.price)}</div>
                {product.oldPrice > 0 && (
                  <div className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</div>
                )}
              </div>
              {product.discount > 0 && (
                <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                  ٪{toPersianNum(product.discount)} تخفیف
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { addToCart(product.id); setSelectedProduct(null); }}
                className="btn-shine flex-1 bg-gradient-to-br from-[#e84393] to-[#a29bfe] text-white py-2.5 rounded-xl text-sm font-bold glow-shadow hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                افزودن به سبد
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${inWishlist ? 'border-accent text-accent' : 'border-border text-muted-foreground'}`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
