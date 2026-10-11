'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Categories } from '@/components/categories';
import { Products } from '@/components/products';
import { About } from '@/components/about';
import { Reviews } from '@/components/reviews';
import { Footer } from '@/components/footer';
import { CartSidebar } from '@/components/cart-sidebar';
import { ProductModal } from '@/components/product-modal';

export default function Home() {
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const glow = document.getElementById('cursor-glow');
      if (glow) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div
        id="cursor-glow"
        className="cursor-glow hidden md:block"
      />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Categories onSelect={() => {}} />
        <Products />
        <About />
        <Reviews />
      </main>
      <Footer />
      <CartSidebar />
      <ProductModal />
    </>
  );
}
