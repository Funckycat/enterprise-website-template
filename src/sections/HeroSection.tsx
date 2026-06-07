import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const y = window.scrollY;
      bgRef.current.style.transform = `translateY(${y * 0.3}px)`;
      bgRef.current.style.opacity = `${1 - y / (window.innerHeight * 0.8)}`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Parallax Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-[120%]" style={{ willChange: 'transform, opacity' }}>
        <img src="/images/hero-bg.jpg" alt="Hero background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <div className="max-w-3xl">
          <h1
            className="text-white font-semibold tracking-tight mb-5"
            style={{
              fontFamily: '"Noto Serif SC", serif',
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              lineHeight: 1.2,
              opacity: 0,
              animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards',
            }}
          >
            某某科技集团
          </h1>
          <p
            className="text-white/60 text-base md:text-lg tracking-wide mb-10"
            style={{
              fontFamily: '"Noto Sans SC", sans-serif',
              lineHeight: 1.8,
              opacity: 0,
              animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards',
            }}
          >
            基于园区运营的产业生态服务商
          </p>
          <div
            className="flex justify-center gap-6"
            style={{
              opacity: 0,
              animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards',
            }}
          >
            <span className="text-[11px] text-white/30 tracking-wider" style={{ fontFamily: '"Inter", sans-serif' }}>产业服务</span>
            <span className="text-[11px] text-white/30">·</span>
            <span className="text-[11px] text-white/30 tracking-wider" style={{ fontFamily: '"Inter", sans-serif' }}>科技创新</span>
            <span className="text-[11px] text-white/30">·</span>
            <span className="text-[11px] text-white/30 tracking-wider" style={{ fontFamily: '"Inter", sans-serif' }}>城市更新</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
