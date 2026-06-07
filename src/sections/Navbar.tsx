import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      const h = window.innerHeight;
      const y = window.scrollY;
      setIsDark(y < h * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isDark ? 'bg-transparent' : 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center"
        >
          <img
            src="/images/logo-white.png"
            alt="某某科技集团有限公司"
            className="h-7 w-auto transition-all duration-500"
            style={{
              filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)',
            }}
          />
        </button>
        <div className="flex items-center gap-8">
          {[
            { label: '关于', id: 'about' },
            { label: '生态', id: 'ecosystem' },
            { label: '项目', id: 'carriers' },
            { label: '联系', id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`text-[13px] tracking-[0.08em] transition-colors duration-300 ${
                isDark
                  ? 'text-white/60 hover:text-white'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
