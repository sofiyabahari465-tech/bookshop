'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Heart, ShoppingBag, Moon, Sun, Menu, Sparkles, X } from 'lucide-react';

export function Navbar() {
  const { cartCount, wishlist, theme, toggleTheme, setCartOpen, setWishOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#home', label: 'خانه' },
    { href: '#products', label: 'محصولات' },
    { href: '#categories', label: 'دسته‌بندی' },
    { href: '#about', label: 'درباره ما' },
    { href: '#contact', label: 'تماس' },
  ];

  return (
    <>
      {/* Top banner */}
      <div className="bg-foreground text-background text-center py-2 text-xs sm:text-sm font-semibold relative z-[1100]">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>🌸 جشن روز دختر — ارسال رایگان + ۲۰٪ تخفیف روی همه محصولات! 🌸</span>
        </div>
      </div>

      <nav className={`fixed top-[33px] sm:top-[37px] left-0 right-0 z-[1000] transition-all duration-300 ${scrolled ? 'glass py-2' : 'py-3'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 text-xl font-extrabold">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>دخترانه <span className="text-primary">💕</span></span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-6 mr-auto ml-6">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors relative group">
                  {l.label}
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="glass w-9 h-9 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="تغییر تم"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4 text-primary" />}
            </button>
            <button
              onClick={() => setWishOpen(true)}
              className="glass w-9 h-9 rounded-full flex items-center justify-center relative hover:scale-105 transition-transform"
              aria-label="علاقه‌مندی‌ها"
            >
              <Heart className="w-4 h-4 text-primary" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="glass w-9 h-9 rounded-full flex items-center justify-center relative hover:scale-105 transition-transform"
              aria-label="سبد خرید"
            >
              <ShoppingBag className="w-4 h-4 text-primary" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden glass w-9 h-9 rounded-full flex items-center justify-center"
              aria-label="منو"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden glass mt-2 mx-4 rounded-2xl p-4 flex flex-col gap-3">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold text-muted-foreground hover:text-primary py-2"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
