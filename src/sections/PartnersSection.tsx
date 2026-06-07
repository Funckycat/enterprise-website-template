import { useEffect, useRef } from 'react';

const partners = [
  '某某控股集团',
  '某某科技',
  '某某研究院',
  '某某资本',
  '某某集团',
  '某某孵化器',
];

export default function PartnersSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.1 }
    );
    section.querySelectorAll('.rvl').forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(28px)';
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="ecosystem" ref={ref} className="relative w-full bg-[#F7F7F7]">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-28 md:py-36">
        <div className="rvl mb-20" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <span className="text-[11px] tracking-[0.2em] uppercase text-gray-400" style={{ fontFamily: '"Inter", sans-serif' }}>Partners</span>
          <h2 className="mt-3 text-[#111] font-semibold tracking-tight" style={{ fontFamily: '"Noto Serif SC", serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.2 }}>
            产业生态合作伙伴
          </h2>
        </div>

        <div className="rvl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s' }}>
          {partners.map((name) => (
            <div key={name} className="flex items-center justify-center py-6">
              <span className="text-sm font-medium text-gray-400 tracking-wide" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>
                {name}
              </span>
            </div>
          ))}
        </div>

        <div className="rvl mt-20 p-8 md:p-12 border border-gray-200 rounded-lg bg-white" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-extralight text-[#111]" style={{ fontFamily: '"Inter", sans-serif' }}>200+</div>
              <div className="text-xs text-gray-400 mt-2" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>生态合作伙伴</div>
            </div>
            <div>
              <div className="text-3xl font-extralight text-[#111]" style={{ fontFamily: '"Inter", sans-serif' }}>50+</div>
              <div className="text-xs text-gray-400 mt-2" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>产业服务机构</div>
            </div>
            <div>
              <div className="text-3xl font-extralight text-[#111]" style={{ fontFamily: '"Inter", sans-serif' }}>30+</div>
              <div className="text-xs text-gray-400 mt-2" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>投资机构</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`.rvl.active { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
    </section>
  );
}
