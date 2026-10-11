// ===== 3D Effects System =====
// Particles background, parallax scroll, 3D tilt, glow effects

// ===== Particle Background =====
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.resize();
        this.init();
        this.bind();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        const count = Math.min(80, Math.floor(window.innerWidth / 18));
        this.particles = [];
        const colors = ['#ff9ff3', '#fd79a8', '#a29bfe', '#fdcb6e', '#ffffff'];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.6 + 0.2,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    bind() {
        window.addEventListener('resize', () => { this.resize(); this.init(); });
        window.addEventListener('mousemove', e => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            const p1 = this.particles[i];
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    this.ctx.strokeStyle = `rgba(253, 121, 168, ${(1 - dist / 130) * 0.15})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }

        // Draw particles
        this.particles.forEach(p => {
            // Mouse attraction
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                p.vx += (dx / dist) * 0.02;
                p.vy += (dy / dist) * 0.02;
            }
            // Damping
            p.vx *= 0.99;
            p.vy *= 0.99;

            p.x += p.vx;
            p.y += p.vy;
            p.pulse += 0.03;

            // Wrap
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            const pulseSize = p.size + Math.sin(p.pulse) * 0.5;
            const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.2;

            // Glow
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseSize * 4);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'transparent');
            this.ctx.fillStyle = gradient;
            this.ctx.globalAlpha = pulseOpacity * 0.4;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, pulseSize * 4, 0, Math.PI * 2);
            this.ctx.fill();

            // Core
            this.ctx.globalAlpha = pulseOpacity;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// ===== 3D Tilt Effect =====
class Tilt3D {
    constructor() {
        this.bind();
    }

    bind() {
        document.addEventListener('mousemove', e => {
            const cards = document.querySelectorAll('.book-card, .category-card, .about-card, .review-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                if (e.clientX < rect.left - 60 || e.clientX > rect.right + 60 ||
                    e.clientY < rect.top - 60 || e.clientY > rect.bottom + 60) {
                    if (card.classList.contains('tilting')) {
                        card.classList.remove('tilting');
                        card.style.transform = '';
                    }
                    return;
                }
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const rx = ((e.clientY - cy) / rect.height) * -10;
                const ry = ((e.clientX - cx) / rect.width) * 10;
                if (!card.classList.contains('tilting')) card.classList.add('tilting');
                card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
                // Glare effect
                const glare = card.querySelector('.card-glare');
                if (glare) {
                    const px = ((e.clientX - rect.left) / rect.width) * 100;
                    const py = ((e.clientY - rect.top) / rect.height) * 100;
                    glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.35), transparent 50%)`;
                    glare.style.opacity = '1';
                }
            });
        });
        document.addEventListener('mouseleave', () => {
            document.querySelectorAll('.tilting').forEach(card => {
                card.classList.remove('tilting');
                card.style.transform = '';
                const glare = card.querySelector('.card-glare');
                if (glare) glare.style.opacity = '0';
            });
        });
    }
}

// ===== Parallax Scroll =====
class Parallax {
    constructor() {
        this.elements = [
            { sel: '.hero-shape.shape-1', speed: 0.3 },
            { sel: '.hero-shape.shape-2', speed: 0.5 },
            { sel: '.hero-shape.shape-3', speed: 0.4 },
            { sel: '.floating-book.book-1', speed: 0.2 },
            { sel: '.floating-book.book-2', speed: 0.3 },
            { sel: '.floating-book.book-3', speed: 0.25 },
            { sel: '.floating-book.book-4', speed: 0.35 },
            { sel: '.floating-book.book-5', speed: 0.28 },
            { sel: '.hero-content', speed: 0.15 }
        ];
        window.addEventListener('scroll', () => this.update(), { passive: true });
        this.update();
    }

    update() {
        const scrollY = window.scrollY;
        this.elements.forEach(({ sel, speed }) => {
            const el = document.querySelector(sel);
            if (el) {
                const rect = el.getBoundingClientRect();
                // Only parallax if element is in viewport or above
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const offset = (scrollY - el.offsetTop + 200) * speed * -1;
                    el.style.transform = (el.classList.contains('floating-book') ?
                        el.style.transform.replace(/translateY\([^)]*\)/, '') :
                        '') + ` translateY(${offset * 0.1}px)`;
                }
            }
        });
    }
}

// ===== Magnetic Buttons =====
class MagneticButtons {
    constructor() {
        document.querySelectorAll('.btn, .icon-btn, .add-to-cart').forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }
}

// ===== Reveal Animations =====
class RevealOnScroll {
    constructor() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.reveal, .book-card, .category-card, .review-card, .feature, .about-card').forEach(el => {
            el.classList.add('reveal-3d');
            observer.observe(el);
        });
    }
}

// ===== Smooth Scroll with Offset =====
class SmoothScroll {
    constructor() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', e => {
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== Glow Cursor Trail =====
class CursorGlow {
    constructor() {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);
        this.glow = glow;
        document.addEventListener('mousemove', e => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    }
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    new ParticleBackground();
    new Tilt3D();
    new Parallax();
    new RevealOnScroll();
    new SmoothScroll();
    new CursorGlow();
    // Magnetic buttons (after content loads)
    setTimeout(() => new MagneticButtons(), 500);
});
