'use client';

import { useStore } from '@/lib/store';
import { formatPrice, toPersianNum } from '@/lib/data';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export function CartSidebar() {
  const {
    cart, isCartOpen, setCartOpen, removeFromCart, changeQty,
    cartTotal, cartCount
  } = useStore();

  const shipping = cartTotal >= 200000 ? 0 : (cartTotal > 0 ? 45000 : 0);
  const total = cartTotal + shipping;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[1500] transition-opacity ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setCartOpen(false)}
      />
      <aside className={`fixed top-0 left-0 bottom-0 w-full sm:w-[360px] glass z-[1600] flex flex-col transition-transform duration-400 ${isCartOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-3 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-extrabold flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-primary" />
            سبد خرید
            <span className="text-xs text-muted-foreground font-normal">({toPersianNum(cartCount)})</span>
          </h3>
          <button onClick={() => setCartOpen(false)} className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-destructive hover:text-white transition-colors">
            <X className="w-3 h-3" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
            <ShoppingBag className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm font-bold text-foreground mb-1">سبد خریدت خالیه!</p>
            <span className="text-xs">محصولات مورد علاقه‌ت رو اضافه کن</span>
            <button
              onClick={() => setCartOpen(false)}
              className="mt-3 glass px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform"
            >
              شروع خرید
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-3.5 py-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-2 py-2 border-b border-border">
                  <div className="w-8 h-11 rounded-lg overflow-hidden flex-shrink-0" style={{ background: item.coverColor }}>
                    <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{item.title}</div>
                    <div className="text-[10px] text-muted-foreground mb-1">{item.brand}</div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-primary">{formatPrice(item.price * item.qty)}</span>
                      <div className="flex items-center gap-1 bg-secondary rounded-full p-0.5">
                        <button
                          onClick={() => changeQty(item.id, -1)}
                          className="w-4 h-4 rounded-full bg-card flex items-center justify-center"
                        >
                          <Minus className="w-2 h-2" />
                        </button>
                        <span className="text-[10px] font-bold min-w-3 text-center">{toPersianNum(item.qty)}</span>
                        <button
                          onClick={() => changeQty(item.id, 1)}
                          className="w-4 h-4 rounded-full bg-card flex items-center justify-center"
                        >
                          <Plus className="w-2 h-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-foreground hover:text-destructive p-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border">
              <div className="glass rounded-xl p-2 mb-2">
                <div className="flex justify-between py-0.5 text-[10px]">
                  <span className="text-muted-foreground">جمع کل:</span>
                  <span className="font-semibold">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between py-0.5 text-[10px]">
                  <span className="text-muted-foreground">هزینه ارسال:</span>
                  <span className={shipping === 0 ? 'text-green-600 font-bold' : 'font-semibold'}>
                    {shipping === 0 ? 'رایگان' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-1.5 mt-1 border-t border-dashed border-border text-xs font-bold">
                  <span>مبلغ نهایی:</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
              <button className="btn-shine w-full bg-gradient-to-br from-[#e84393] to-[#a29bfe] text-white py-2 rounded-xl text-xs font-bold glow-shadow hover:scale-105 transition-transform">
                تسویه حساب
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
