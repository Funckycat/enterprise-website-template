export default function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-[#0A0A0A]">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Company */}
          <div>
            <h3 className="text-base font-medium text-white mb-3" style={{ fontFamily: '"Noto Serif SC", serif' }}>
              某某科技集团有限公司
            </h3>
            <p className="text-xs text-white/40 mb-1" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>
              某某科技集团有限公司
            </p>
            <p className="text-[10px] text-white/20" style={{ fontFamily: '"Inter", sans-serif' }}>www.example-group.cn</p>
          </div>

          {/* Business */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>Business</h4>
            <ul className="flex flex-col gap-2">
              {['科技成果转化','创新创业研究','孵化投资赋能','区域产业协同','碳中和服务','人工智能生态'].map((item) => (
                <li key={item} className="text-xs text-white/45" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>Contact</h4>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-white/45" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>联系人：138-0000-0000</p>
              <p className="text-xs text-white/45" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>联系人：139-0000-0000</p>
              <p className="text-xs text-white/45" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>公众号：示例公众号</p>
              <p className="text-xs text-white/45" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>小程序：示例小程序</p>
            </div>
          </div>

          {/* QR Code placeholder */}
          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>Mini Program</h4>
            <div className="flex flex-col items-start gap-2">
              <div className="rounded bg-white/10 flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
                <span className="text-[8px] text-white/30">二维码占位</span>
              </div>
              <span className="text-[10px] text-white/20" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>扫码关注小程序</span>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/[0.06] mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-white/15" style={{ fontFamily: '"Noto Sans SC", sans-serif' }}>&copy; 2026 某某科技集团有限公司. All rights reserved.</p>
          <p className="text-[10px] text-white/10 tracking-wider" style={{ fontFamily: '"Noto Serif SC", serif' }}>追求卓越，精益求精</p>
        </div>
      </div>
    </footer>
  );
}
