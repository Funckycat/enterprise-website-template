import { useEffect, useRef } from 'react';

export default function ChairmanSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    section.querySelectorAll('.rvl').forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(28px)';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#0A0A0A]">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-28 md:py-40">
        {/* Header */}
        <div className="rvl mb-16" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/30" style={{ fontFamily: '"Inter", sans-serif' }}>Leadership</span>
          <h2 className="mt-3 text-white font-semibold tracking-tight" style={{ fontFamily: '"Noto Serif SC", serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.2 }}>
            创始人
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left - Photo */}
          <div className="lg:col-span-3 rvl" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s' }}>
            <div className="relative overflow-hidden rounded-lg max-w-[280px] mx-auto lg:mx-0">
              <img
                src="/images/chairman.png"
                alt="创始人照片"
                className="w-full h-auto block"
                style={{ aspectRatio: '3/4', objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="mt-5">
              <h3 className="text-white text-lg font-medium" style={{ fontFamily: '"Noto Serif SC", serif' }}>张某某</h3>
              <p className="text-white/40 text-xs mt-1" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>董事长 · 中共党员</p>
              <p className="text-white/20 text-[10px] mt-0.5" style={{ fontFamily: '"Inter", sans-serif' }}>Chairman · Member of CPC</p>
            </div>
          </div>

          {/* Right - Bio */}
          <div className="lg:col-span-9">
            {/* Education */}
            <div className="rvl" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }}>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/25" style={{ fontFamily: '"Inter", sans-serif' }}>Education & Qualifications</span>
              <p className="text-white/50 text-[14px] leading-[2.2] mt-3" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>
                某国知名大学可持续发展专业硕士。持有注册资产评估师、注册碳管理师双重专业资质。深耕碳管理与可持续发展领域逾十五年，兼具国际化视野与本土实践经验。
              </p>
            </div>

            {/* Current Positions */}
            <div className="rvl mt-8" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s' }}>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/25" style={{ fontFamily: '"Inter", sans-serif' }}>Current Positions</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {[
                  '某碳管理体系研究院自愿减排技术首席技术官（CTO）',
                  '某智慧城市发展研究院副院长',
                  '某大学MBA中心行业顾问',
                  '某国有资本运营研究院国有存量资产盘活专家库成员',
                ].map((p) => (
                  <div key={p} className="text-[13px] text-white/45 leading-relaxed" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{p}</div>
                ))}
              </div>
            </div>

            {/* Social Positions */}
            <div className="rvl mt-8" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s' }}>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/25" style={{ fontFamily: '"Inter", sans-serif' }}>Social Positions</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4">
                {[
                  '某工业合作协会绿色工业节能分会碳中和专家委员会主任专家',
                  '某工作站站长',
                  '某区第十四届政协委员',
                  '某区建筑工程学会副理事长',
                  '某区化学化工及新材料学会副理事长',
                  '某市侨商联合会常务副会长',
                ].map((p) => (
                  <div key={p} className="text-[12px] text-white/40 leading-relaxed" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>· {p}</div>
                ))}
              </div>
            </div>

            {/* Standards */}
            <div className="rvl mt-8 p-6 border border-white/[0.06] rounded-lg bg-white/[0.02]" style={{ transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s' }}>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/25" style={{ fontFamily: '"Inter", sans-serif' }}>Industry Standards</span>
              <p className="text-[13px] text-white/45 leading-[2] mt-3" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>
                长期致力于产业研究与标准化工作，关注行业发展趋势与政策动态，推动产业园区管理体系持续优化，为行业发展提供智力支持。
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`.rvl.active { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
    </section>
  );
}
