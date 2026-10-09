import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  FileText, 
  Download, 
  Printer, 
  QrCode, 
  Award,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { StationData } from '../data/blueCarbonData';

interface CCERReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  station: StationData;
  year: number;
  intervention: number;
}

export const CCERReportModal: React.FC<CCERReportModalProps> = ({
  isOpen,
  onClose,
  station,
  year,
  intervention,
}) => {
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const factor = 1 + (intervention / 100) * 0.18 + (year - 2026) * 0.025;
  const verifiedCarbonTons = (station.carbonTotal * factor).toFixed(2);
  const unitPrice = 78.50 + (year - 2026) * 2.8;
  const totalValuation = (parseFloat(verifiedCarbonTons) * 10000 * unitPrice / 10000).toFixed(2);

  const reportId = `CCER-SD-MAR-${year}-${station.id.slice(0, 3).toUpperCase()}-98214`;
  const blockHash = '0x8f2d91b7a4c3e809df651478ec1209b53fa97c01289df713b9c';

  const handleExport = () => {
    setDownloadSuccessToast(true);
    setTimeout(() => {
      setDownloadSuccessToast(false);
    }, 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-amber-500/40 text-slate-100 shadow-[0_0_60px_rgba(245,158,11,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Top Bar with Guaranteed Working Close Button */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-amber-500/20 bg-slate-950/90 z-20 shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs uppercase font-mono tracking-wider text-amber-300 font-semibold">
              PRC-CCER 国家温室气体自愿减排自律审定证书
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-300 text-xs font-semibold border border-slate-700 hover:border-rose-500/50 transition-all cursor-pointer shadow-sm"
            title="关闭窗口 (ESC)"
          >
            <X className="w-4 h-4 text-slate-300" />
            <span>关闭</span>
          </button>
        </div>

        {/* Scrollable Certificate Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
          {/* Certificate Header Stamp & Title */}
          <div className="text-center border-b border-amber-500/25 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-950/60 border border-amber-400/40 text-amber-300 text-[10px] font-mono mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>国家碳达峰碳中和标准体系计量规范认证</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-wide">
              国家温室气体自愿减排量 (CCER) 蓝碳资产核证报告
            </h2>
            <p className="text-xs text-slate-400 mt-1.5 font-mono">
              备案方法学：CMS-001-V01《沿海盐沼及海草床生态系统碳汇计量与监测方法学》
            </p>
          </div>

          {/* Export Toast Notification */}
          {downloadSuccessToast && (
            <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-400 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>已成功生成国家防伪签章 PDF 电子核证凭证及链上存证哈希！</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400/80">SHA-256 OK</span>
            </div>
          )}

          {/* Core Verification Certificate Body */}
          <div className="space-y-4 text-xs">
            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px]">核证报告编号</span>
                <span className="font-mono text-cyan-300 font-bold">{reportId}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">项目核算区域</span>
                <span className="text-slate-200 font-bold">{station.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">核证监测年度</span>
                <span className="font-num text-amber-300 font-bold">{year} 年度</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">确权审查状态</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  国家登记簿已公示
                </span>
              </div>
            </div>

            {/* Key Sequestration Quantity Table */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/30 via-slate-950/60 to-slate-950/60 border border-amber-500/30">
              <h4 className="font-bold text-sm text-amber-300 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>经国家注册会计与海洋环境监测机构共同核定清单</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-slate-900/90 border border-cyan-500/20">
                  <span className="text-slate-400 block text-[11px]">经核定有效净固碳量</span>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="font-num text-2xl font-bold text-cyan-300">
                      {verifiedCarbonTons}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">万吨 CO2e</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-amber-500/20">
                  <span className="text-slate-400 block text-[11px]">当期指导结算挂牌价</span>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="font-num text-2xl font-bold text-amber-300">
                      ¥{unitPrice.toFixed(1)}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ 吨 CO2e</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-emerald-500/20">
                  <span className="text-slate-400 block text-[11px]">潜在碳资产总经济估值</span>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="font-num text-2xl font-bold text-emerald-300">
                      {Number(totalValuation).toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">万元</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Methodology & Multi-source Evidence */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>立体数据交叉校验与区块链防篡改溯源凭证：</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                <li>天基遥感验证：高分六号（GF-6）多光谱反演地表植被覆盖度与水体叶绿素a（置信度 99.2%）</li>
                <li>海基原位标定：海岸带涡度相关通量塔（EC150）10Hz高频CO2通量连续监测数据校正</li>
                <li>水下沉积测定：柱状沉积物年代学（210Pb/137Cs）沉积碳埋藏速率：{station.buoySensors.burialRate} g C/(m²·a)</li>
                <li>生态修复增量：生态干预治理（互花米草治理/海草床扩繁）核定贡献增益率 {(intervention * 0.18).toFixed(1)}%</li>
              </ul>
            </div>

            {/* Signatures & Seal */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-800 rounded p-1 flex items-center justify-center shrink-0">
                  <QrCode className="w-10 h-10 text-cyan-400" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  <div>存证哈希 (Blockchain Hash):</div>
                  <div className="text-cyan-400 font-semibold">{blockHash.slice(0, 30)}...</div>
                  <div>山东省生态环境厅 · 自然资源部第一海洋研究所</div>
                </div>
              </div>

              {/* Official Stamp Simulation */}
              <div className="relative w-28 h-28 border-2 border-red-500/80 rounded-full flex flex-col items-center justify-center text-red-400 text-center -rotate-12 pointer-events-none select-none shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <div className="text-[9px] font-bold tracking-widest">山东省蓝碳银行</div>
                <div className="text-[15px] leading-none my-0.5">★</div>
                <div className="text-[8px] font-semibold">自愿减排核证专用章</div>
                <div className="text-[7px] font-mono mt-0.5">{year}.09.28</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-400 font-mono">
            状态：<span className="text-emerald-400 font-semibold">已核证无异议</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700"
            >
              关闭窗口
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>打印报告</span>
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold hover:brightness-110 transition-all shadow-lg cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>导出已签证电子凭证</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
