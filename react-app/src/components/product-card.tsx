'use client';

import { useRef, type MouseEvent } from 'react';
import { useStore } from '@/lib/store';
import { Product, formatPrice, toPersianNum } from '@/lib/data';
import { Heart, Eye, Plus, Star, Flame } from 'lucide-react';

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart, toggleWishlist, wishlist, setSelectedProduct } = useStore();
  const cardRef = useRef<HTMLElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const inWishlist = wishlist.includes(product.id);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / rect.height) * -8;
    const ry = ((e.clientX - cx) / rect.width) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
    if (glareRef.current) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.35), transparent 50%)`;
      glareRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = '';
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };

  return (
    <article
      ref={cardRef}
      className="tilt-card glass rounded-2xl overflow-hidden cursor-pointer group"
      style={{ animationDelay: `${index * 0.05}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setSelectedProduct(product)}
    >
      <div className="card-glare" ref={glareRef} style={{ position: 'absolute', inset: 0, opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none', zIndex: 3, mixBlendMode: 'overlay', borderRadius: 'inherit' }} />
      {/* Cover */}
      <div
        className="relative h-44 overflow-hidden"
        style={{ background: product.coverColor, transformStyle: 'preserve-3d' }}
      >
        {product.isBestseller && (
          <span className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-gradient-to-br from-[#ff7675] to-[#fd79a8] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
            <Flame className="w-3 h-3" /> پرفروش
          </span>
        )}
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 z-20 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-full">
            ٪{toPersianNum(product.discount)} تخفیف
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className={`absolute bottom-3 left-3 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all ${inWishlist ? 'bg-accent text-white' : 'bg-white/90 text-muted-foreground hover:text-accent'}`}
          aria-label="افزودن به علاقه‌مندی"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
        <img
          src={product.cover}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{ transform: 'translateZ(0)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
        <button
          onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}
          className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-gradient-to-br from-[#e84393] to-[#a29bfe] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
          aria-label="افزودن به سبد"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {/* Info */}
      <div className="p-3.5">
        <div className="text-[10px] text-primary font-semibold uppercase mb-1">{product.categoryName}</div>
        <h3 className="text-sm font-bold mb-0.5 line-clamp-2 min-h-[2.4em] leading-tight">{product.title}</h3>
        <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>
        <div className="flex items-center gap-1 mb-2.5">
          <div className="flex">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className={`w-3 h-3 ${i <= Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground mr-1">
            {toPersianNum(product.rating)} ({toPersianNum(product.ratingCount)})
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-primary">{formatPrice(product.price)}</span>
            {product.oldPrice > 0 && (
              <span className="text-[10px] text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}
            className="w-8 h-8 rounded-full glass border border-border flex items-center justify-center hover:bg-gradient-to-br hover:from-[#e84393] hover:to-[#a29bfe] hover:text-white transition-all"
            aria-label="افزودن به سبد"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
