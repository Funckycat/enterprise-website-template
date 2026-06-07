import { useEffect, useRef } from 'react';

const incubators = [
  {
    name: '某某科技创新孵化器',
    subtitle: 'Demo Cloud Incubator',
    desc: '2022年纳入某市级孵化器，以平台＋基金＋产业服务的运营模式，打造以智能制造、生命科学、在线新经济为核心的科技创新孵化器。',
    image: '/images/incubator-1.jpg',
    stats: [
      { v: '市级', l: '孵化器' },
      { v: '平台+基金', l: '运营模式' },
      { v: '智能制造', l: '核心产业' },
      { v: '全周期', l: '产业服务' },
    ],
  },
  {
    name: '创谷孵化器',
    subtitle: 'Chuanggu Incubator',
    desc: '集团自主运营的专业孵化空间，以培育高新技术企业为宗旨，提供完善的创业服务配套与灵活的办公场地，助力初创企业快速成长。',
    image: '/images/carrier-3.jpg',
    stats: [
      { v: '100+', l: '引入企业' },
      { v: '~40,000㎡', l: '载体面积' },
      { v: '某市级', l: '孵化器' },
      { v: '核心区', l: '区位优势' },
    ],
  },
];

export default function IncubatorsSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); } }); },
      { threshold: 0.1 }
    );
    section.querySelectorAll('.rvl').forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="incubators" ref={ref} className="relative w-full bg-white">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-28 md:py-36">
        <div className="rvl mb-20" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <span className="text-[11px] tracking-[0.2em] uppercase text-gray-400" style={{ fontFamily: '"Inter", sans-serif' }}>Incubators</span>
          <h2 className="mt-3 text-[#111] font-semibold tracking-tight" style={{ fontFamily: '"Noto Serif SC", serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.2 }}>孵化器简介</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {incubators.map((inc, i) => (
            <div key={inc.name} className="rvl" style={{ transitionDelay: `${0.1 + i * 0.12}s` }}>
              <div className="overflow-hidden rounded-lg mb-6 aspect-[16/10]">
                <img src={inc.image} alt={inc.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1200ms]" />
              </div>
              <span className="text-[10px] tracking-[0.15em] uppercase text-gray-300" style={{ fontFamily: '"Inter", sans-serif' }}>{inc.subtitle}</span>
              <h3 className="text-lg font-medium text-[#111] mt-1 mb-3" style={{ fontFamily: '"Noto Serif SC", serif' }}>{inc.name}</h3>
              <p className="text-[13px] text-gray-500 leading-[2] mb-6" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{inc.desc}</p>
              <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-100">
                {inc.stats.map((s) => (
                  <div key={s.l}>
                    <div className="text-sm font-extralight text-[#111]" style={{ fontFamily: '"Inter", sans-serif' }}>{s.v}</div>
                    <div className="text-[9px] text-gray-400 mt-0.5" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`.rvl.active { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
    </section>
  );
}
