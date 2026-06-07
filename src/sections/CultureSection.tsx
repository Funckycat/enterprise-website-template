import { useEffect, useRef, useState } from 'react';

const venues = [
  {
    name: '某某馆',
    subtitle: 'Demo Pavilion',
    desc: '融合咖啡、会务、茶水于一体的商务文化空间。为入驻企业提供高品质的商务接待、会议洽谈、休闲交流场所，打造舒适优雅的商务文化氛围。',
    images: [
      { src: '/images/culture-1.jpg', alt: '某某馆' },
      { src: '/images/culture-2.jpg', alt: '馆内环境' },
    ],
    tags: ['咖啡', '会务', '茶水'],
  },
  {
    name: '艺品馆',
    subtitle: 'Art Gallery',
    desc: '传承中华传统工艺，展示精美艺术品。将传统文化与现代商务空间相结合，为园区增添文化底蕴与艺术气息。',
    images: [
      { src: '/images/culture-2.jpg', alt: '艺品馆' },
      { src: '/images/culture-1.jpg', alt: '艺术展示' },
    ],
    tags: ['传统工艺', '文化展示', '艺术展览'],
  },
];

function ImageSlider({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setActive((p) => (p + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [images.length]);

  if (images.length === 1) {
    return <div className="relative overflow-hidden rounded-lg aspect-[16/10]"><img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" /></div>;
  }

  return (
    <div className="relative overflow-hidden rounded-lg aspect-[16/10]">
      {images.map((img, i) => (
        <img key={img.src} src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms]" style={{ opacity: active === i ? 1 : 0 }} />
      ))}
      <div className="absolute bottom-4 left-4 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className="h-1.5 rounded-full transition-all duration-500" style={{ width: active === i ? '24px' : '6px', backgroundColor: active === i ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }} />
        ))}
      </div>
    </div>
  );
}

export default function CultureSection() {
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
    <section id="culture" ref={ref} className="relative w-full bg-[#0A0A0A]">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-28 md:py-36">
        <div className="rvl mb-20" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/30" style={{ fontFamily: '"Inter", sans-serif' }}>Business & Culture</span>
          <h2 className="mt-3 text-white font-semibold tracking-tight" style={{ fontFamily: '"Noto Serif SC", serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.2 }}>商旅文化</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {venues.map((v, i) => (
            <div key={v.name} className="rvl group" style={{ transitionDelay: `${0.1 + i * 0.12}s` }}>
              <div className="mb-6"><ImageSlider images={v.images} /></div>
              <div className="flex gap-2 mb-3">
                {v.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-3 py-1 rounded-full border border-white/[0.1] text-white/40" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{tag}</span>
                ))}
              </div>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/25" style={{ fontFamily: '"Inter", sans-serif' }}>{v.subtitle}</span>
              <h3 className="text-lg font-medium text-white mt-1 mb-3" style={{ fontFamily: '"Noto Serif SC", serif' }}>{v.name}</h3>
              <p className="text-[14px] text-white/40 leading-[2]" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`.rvl.active { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
    </section>
  );
}
