import { useEffect, useRef, useState } from 'react';

const featuredData = {
  id: 'featured',
  name: '星智科创港',
  subtitle: 'StarTech Innovation Port',
  company: '某某智科科技有限公司',
  tags: ['人工智能', '科技创新'],
  desc: '星智科创港是集团重点打造的科技创新产业平台，聚焦新一代信息技术与实体经济深度融合。园区依托完善的产业服务体系，为入驻企业提供技术研发、投融资对接、人才引进、市场拓展等全方位赋能支持，致力于成为区域科技创新的标杆示范园区。',
  stats: [
    { v: '190,000㎡', l: '建筑面积' },
    { v: '42,800㎡', l: '生态中心' },
    { v: '40亿+', l: '基金管理' },
    { v: '首期8亿', l: '首期规模' },
  ],
  images: [
    { src: '/images/carrier-1.jpg', alt: '科创港' },
    { src: '/images/carrier-2.jpg', alt: '园区鸟瞰' },
  ],
};

const carriers = [
  {
    id: 'carrier-a',
    name: '临港未来科技城',
    subtitle: 'Future Tech Science City',
    company: '临港集团 · 某区政府',
    tags: ['智能制造', '生命科学', '在线新经济'],
    desc: '集团参与开发运营的大型科技产业综合体。园区以培育高新技术企业为核心目标，融合办公、研发、展示等多功能于一体，打造产业集聚、人才汇聚的创新高地。',
    stats: [
      { v: '20年', l: '独家运营权' },
      { v: '223,915.89㎡', l: '总建筑面积' },
      { v: '153,663.06㎡', l: '地上计容面积' },
      { v: '3.0', l: '容积率' },
    ],
    images: [
      { src: '/images/carrier-2.jpg', alt: '科技城鸟瞰' },
      { src: '/images/carrier-1.jpg', alt: '园区实景' },
    ],
  },
  {
    id: 'carrier-b',
    name: '创谷孵化基地',
    subtitle: 'Chuanggu Incubator Base',
    company: '某某科技集团有限公司',
    tags: ['科技孵化', '城市更新'],
    desc: '集团自主运营的专业孵化空间，提供灵活的办公场地与完善的创业服务配套。经过多年运营积累，已形成较为成熟的孵化培育体系，助力初创企业快速成长。',
    stats: [
      { v: '100+', l: '引入企业' },
      { v: '~40,000㎡', l: '载体面积' },
      { v: '某市级', l: '孵化器' },
      { v: '核心区', l: '区位优势' },
    ],
    images: [
      { src: '/images/carrier-3.jpg', alt: '孵化基地' },
    ],
  },
  {
    id: 'carrier-c',
    name: '融创商务园',
    subtitle: 'Rongchuang Business Park',
    company: '某某融通 · 融创',
    tags: ['共享社区', '精品办公'],
    desc: '紧邻某核心商圈，位于某某路核心地段。商务园项目现以AI时代的超级个体创享空间为定位，共享生态为主题。愿景是做AI时代的创新灯塔，使命是让创新触手可及。志存高远，创领未来，开放生态，链接无限。',
    stats: [
      { v: '核心商圈', l: '核心地段' },
      { v: '超级个体', l: '创享空间' },
      { v: '共享社区', l: '生态主题' },
      { v: '全链条', l: '办公服务' },
    ],
    images: [
      { src: '/images/carrier-4.jpg', alt: '商务园' },
      { src: '/images/carrier-3.jpg', alt: '办公空间' },
    ],
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
    return (
      <div className="relative overflow-hidden rounded-lg aspect-[16/10]">
        <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg aspect-[16/10]">
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms]"
          style={{ opacity: active === i ? 1 : 0 }}
        />
      ))}
      <div className="absolute bottom-4 left-4 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: active === i ? '24px' : '6px',
              backgroundColor: active === i ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function CarriersSection() {
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
      (el as HTMLElement).style.transform = 'translateY(30px)';
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section id="carriers" ref={ref} className="relative w-full bg-[#0A0A0A]">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Section Header + Featured */}
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 pt-28 md:pt-36 pb-16">
        <div className="rvl mb-16" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/30" style={{ fontFamily: '"Inter", sans-serif' }}>Carriers</span>
          <h2 className="mt-3 text-white font-semibold tracking-tight" style={{ fontFamily: '"Noto Serif SC", serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.2 }}>
            载体简介
          </h2>
        </div>

        {/* Featured Carrier */}
        <div className="rvl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div>
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/25" style={{ fontFamily: '"Inter", sans-serif' }}>{featuredData.subtitle}</span>
            <h2 className="text-white font-semibold tracking-tight mt-2 mb-3" style={{ fontFamily: '"Noto Serif SC", serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.2 }}>{featuredData.name}</h2>
            <p className="text-[15px] text-white/50 mb-4" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{featuredData.company}</p>
            <div className="flex gap-2 mb-6">
              {featuredData.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-3 py-1 rounded-full border border-white/[0.12] text-white/40" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{tag}</span>
              ))}
            </div>
            <p className="text-[13px] text-white/35 leading-[2] mb-8" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{featuredData.desc}</p>
            <div className="grid grid-cols-4 gap-4">
              {featuredData.stats.map((s) => (
                <div key={s.l}>
                  <div className="text-base font-extralight text-white/70" style={{ fontFamily: '"Inter", sans-serif' }}>{s.v}</div>
                  <div className="text-[10px] text-white/25 mt-1" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div><ImageSlider images={featuredData.images} /></div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 md:px-12"><div className="w-full h-px bg-white/[0.06]" /></div>

      {/* Other Carriers */}
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 pt-24 md:pt-32 pb-28 md:pb-36">
        <div className="flex flex-col gap-32">
          {carriers.map((c, i) => (
            <div key={c.id}>
              {i > 0 && <div className="w-full h-px bg-white/[0.06] mb-32" />}
              <div className="rvl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start" style={{ transitionDelay: `${0.1 + i * 0.05}s` }}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-white/25" style={{ fontFamily: '"Inter", sans-serif' }}>{c.subtitle}</span>
                  <h2 className="text-white font-semibold tracking-tight mt-2 mb-3" style={{ fontFamily: '"Noto Serif SC", serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.2 }}>{c.name}</h2>
                  <p className="text-[15px] text-white/50 mb-4" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{c.company}</p>
                  <div className="flex gap-2 mb-6">
                    {c.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-3 py-1 rounded-full border border-white/[0.12] text-white/40" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{tag}</span>
                    ))}
                  </div>
                  <p className="text-[13px] text-white/35 leading-[2] mb-8" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{c.desc}</p>
                  <div className="grid grid-cols-4 gap-4">
                    {c.stats.map((s) => (
                      <div key={s.l}>
                        <div className="text-base font-extralight text-white/70" style={{ fontFamily: '"Inter", sans-serif' }}>{s.v}</div>
                        <div className="text-[10px] text-white/25 mt-1" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}><ImageSlider images={c.images} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`.rvl.active { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
    </section>
  );
}
