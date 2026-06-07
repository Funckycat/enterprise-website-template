import { useEffect, useRef } from 'react';

const timeline = [
  { phase: '1.0', period: '2005-至今', title: '自主开发', detail: '城市更新模式探索，积累园区开发运营经验', projects: ['创谷孵化'] },
  { phase: '2.0', period: '2012-2020', title: '城市更新', detail: '打造国家级科技企业孵化器、国家级众创空间、税收亿元楼', projects: ['某某科技园'] },
  { phase: '3.0', period: '2020-至今', title: '产业生态', detail: '布局长三角及全国，构建产业生态服务体系', projects: ['临港未来科技城', '某某融通·融创'] },
  { phase: '4.0', period: '2020-至今', title: '未来产业', detail: '聚焦AI与双碳赛道，打造未来产业集群', projects: ['星智科创港', '碳中和服务'] },
];

export default function CompanySection() {
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
      { threshold: 0.15 }
    );
    section.querySelectorAll('.rvl').forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(28px)';
      obs.observe(el);
    });
    const tlObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = '1';
            (e.target as HTMLElement).style.transform = 'translateY(0)';
            tlObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    section.querySelectorAll('.tl-item').forEach((el) => { tlObs.observe(el); });
    return () => { obs.disconnect(); tlObs.disconnect(); };
  }, []);

  return (
    <section id="about" ref={ref} className="relative w-full bg-white">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-28 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-28">
          <div className="rvl" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <span className="text-[11px] tracking-[0.2em] uppercase text-gray-400" style={{ fontFamily: '"Inter", sans-serif' }}>About Us</span>
            <h2 className="mt-4 text-[#111] font-semibold tracking-tight" style={{ fontFamily: '"Noto Serif SC", serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.25 }}>
              某某科技集团有限公司
            </h2>
            <div className="mt-5 w-12 h-px bg-[#111]" />
          </div>
          <div>
            <div className="rvl" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s' }}>
              <p className="text-[15px] text-gray-600 leading-[2.2]" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>
                围绕"从产业到空间"的理念，专注于产业发展及孵化生态建设，以赋能共赢为路径，实现企业和园区的高质量可持续发展。公司致力于科技成果转化、创新创业研究、孵化投资赋能、区域产业协同，持续探索科技服务新模式、新领域，多层级、全方位为科技企业营造良好生态。
              </p>
            </div>
            <div className="rvl mt-6" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }}>
              <p className="text-[15px] text-gray-600 leading-[2.2]" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>
                团队拥有二十年的园区开发、科技孵化、招商引资、企业投融资经验。打造了国家级科技企业孵化器、国家级众创空间、"税收亿元楼"等多个优质载体。面向未来某某科技集团有限公司将继续深化"产业生态服务商"定位，在科技赋能与产业融合的新征程中，以更加开放的姿态，助力产业升级与经济发展。
              </p>
            </div>
            <div className="rvl mt-8 flex flex-wrap gap-2.5" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s' }}>
              {['国家级高新技术企业','某市级科技企业孵化器','招商服务优质奖','科创服务战略合作伙伴'].map((h) => (
                <span key={h} className="text-[11px] text-gray-500 px-4 py-2 border border-gray-200 rounded-full" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{h}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-100 mb-28" />

        <div className="rvl mb-16" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <h3 className="text-center text-xl font-medium text-[#111] mb-14" style={{ fontFamily: '"Noto Serif SC", serif' }}>发展历程</h3>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-[14px] left-[5%] right-[5%] h-px bg-gray-100" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {timeline.map((item, i) => (
              <div key={item.phase} className="tl-item text-center" style={{ opacity: 0, transform: 'translateY(20px)', transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s` }}>
                <div className="hidden md:flex justify-center mb-3"><div className="w-2.5 h-2.5 rounded-full bg-[#111]" /></div>
                <div className="text-2xl font-extralight text-gray-200 mb-1" style={{ fontFamily: '"Inter", sans-serif' }}>{item.phase}</div>
                <div className="text-[10px] tracking-wider text-gray-400 mb-1" style={{ fontFamily: '"Inter", sans-serif' }}>{item.period}</div>
                <div className="text-sm font-medium text-[#111] mb-1" style={{ fontFamily: '"Noto Serif SC", serif' }}>{item.title}</div>
                <p className="text-xs text-gray-400 leading-relaxed mb-3 px-2" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{item.detail}</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {item.projects.map((p) => (
                    <span key={p} className="text-[9px] px-2 py-0.5 rounded-full border border-gray-200 text-gray-400" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`.rvl.active { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
    </section>
  );
}
