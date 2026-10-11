'use client';

import { useEffect, useRef } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';

export function Hero() {
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (shape1Ref.current) shape1Ref.current.style.transform = `translateY(${y * 0.3}px)`;
      if (shape2Ref.current) shape2Ref.current.style.transform = `translateY(${y * 0.5}px)`;
      if (shape3Ref.current) shape3Ref.current.style.transform = `translateY(${y * 0.4}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const floating = [
    { src: '/covers/jewelry-1.png', cls: 'top-0 right-[18%] -rotate-12', delay: '0s' },
    { src: '/covers/perfume-1.png', cls: 'top-12 left-[8%] rotate-6', delay: '-1.5s' },
    { src: '/covers/bag-1.png', cls: 'top-32 right-[28%] -rotate-4', delay: '-3s' },
    { src: '/covers/makeup-1.png', cls: 'bottom-2 left-[18%] rotate-12', delay: '-4.5s' },
    { src: '/covers/gift-1.png', cls: 'bottom-12 right-[2%] -rotate-6', delay: '-2s' },
  ];

  return (
    <section id="home" className="relative min-h-[80vh] pt-32 pb-12 overflow-hidden flex items-center">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={shape1Ref} className="absolute w-80 h-80 rounded-full opacity-30 blur-3xl" style={{ background: '#ff9ff3', top: '-50px', right: '-50px' }} />
        <div ref={shape2Ref} className="absolute w-72 h-72 rounded-full opacity-30 blur-3xl" style={{ background: '#a29bfe', bottom: '-40px', left: '-40px' }} />
        <div ref={shape3Ref} className="absolute w-64 h-64 rounded-full opacity-25 blur-3xl" style={{ background: '#fdcb6e', top: '40%', left: '40%' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
        {/* Content */}
        <div className="reveal">
          <span className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            🌸 جشن ویژه روز دختر شروع شد!
          </span>
          <h1 className="hero-title-shadow text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 float-anim">
            روز <span className="gradient-text">دختر</span>ت
            <br />
            مبارک 💕
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-xl leading-relaxed">
            فروشگاه اینترنتی دخترانه با تنوع بی‌نظیر محصولات: زیورآلات، عطر، کیف، آرایش، لباس و هدیه.
            بهترین کادو برای روز دختر همینجا پیدا کن!
          </p>
          <div className="flex gap-3 mb-8">
            <a
              href="#products"
              className="btn-shine inline-flex items-center gap-2 bg-gradient-to-br from-[#e84393] to-[#a29bfe] text-white px-5 py-2.5 rounded-xl text-sm font-bold glow-shadow hover:scale-105 transition-transform"
            >
              مشاهده محصولات
              <ArrowLeft className="w-4 h-4" />
            </a>
            <a
              href="#categories"
              className="glass px-5 py-2.5 rounded-xl text-sm font-bold hover:scale-105 transition-transform"
            >
              دسته‌بندی‌ها
            </a>
          </div>
          <div className="flex items-center gap-5">
            <div>
              <div className="text-2xl font-extrabold text-primary">۵۰۰+</div>
              <div className="text-xs text-muted-foreground">محصول</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <div className="text-2xl font-extrabold text-primary">۵۰K+</div>
              <div className="text-xs text-muted-foreground">دختر راضی</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <div className="text-2xl font-extrabold text-primary">۲۴/۷</div>
              <div className="text-xs text-muted-foreground">پشتیبانی</div>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative h-[300px] lg:h-[360px] hidden md:block">
          {floating.map((b, i) => (
            <div
              key={i}
              className={`absolute w-24 h-32 lg:w-28 lg:h-36 rounded-2xl overflow-hidden shadow-2xl float-anim ${b.cls}`}
              style={{ animationDelay: b.delay, boxShadow: '0 20px 50px rgba(232, 67, 147, 0.4), 0 0 30px rgba(253, 121, 168, 0.3)' }}
            >
              <img src={b.src} alt="محصول" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
