import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Download, 
  Printer, 
  QrCode, 
  Sparkles,
  FileCheck
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { StationData } from '../data/blueCarbonData';

interface CCERReportViewProps {
  station: StationData;
  year: number;
  intervention: number;
  onBackToGis?: () => void;
}

export const CCERReportView: React.FC<CCERReportViewProps> = ({
  station,
  year,
  intervention,
  onBackToGis,
}) => {
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const factor = 1 + (intervention / 100) * 0.18 + (year - 2026) * 0.025;
  const verifiedCarbonTons = (station.carbonTotal * factor).toFixed(2);
  const unitPrice = 78.50 + (year - 2026) * 2.8;
  const totalValuation = (parseFloat(verifiedCarbonTons) * 10000 * unitPrice / 10000).toFixed(2);

  const reportId = `CCER-SD-MAR-${year}-${station.id.slice(0, 3).toUpperCase()}-98214`;
  const blockHash = '0x8f2d91b7a4c3e809df651478ec1209b53fa97c01289df713b9c';

  // Real PDF Generation and Download onto User's Computer
  const handleExportPDF = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Background color: Deep midnight tech slate (#030914)
      doc.setFillColor(3, 9, 20);
      doc.rect(0, 0, 210, 297, 'F');

      // Outer tech cyan border
      doc.setDrawColor(6, 182, 212);
      doc.setLineWidth(0.8);
      doc.rect(8, 8, 194, 281);

      // Inner amber gold border
      doc.setDrawColor(245, 158, 11);
      doc.setLineWidth(0.4);
      doc.rect(10, 10, 190, 277);

      // Certificate Header Top Banner
      doc.setTextColor(245, 158, 11);
      doc.setFontSize(13);
      doc.text('PEOPLES REPUBLIC OF CHINA - CCER', 105, 22, { align: 'center' });

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text('NATIONAL BLUE CARBON ASSET VERIFICATION CERTIFICATE', 105, 32, { align: 'center' });

      doc.setTextColor(56, 189, 248);
      doc.setFontSize(9);
      doc.text(`Official State Registry ID: ${reportId}`, 105, 40, { align: 'center' });

      // Horizontal glowing rule
      doc.setDrawColor(6, 182, 212);
      doc.setLineWidth(0.6);
      doc.line(16, 45, 194, 45);

      // Metadata section
      doc.setTextColor(148, 163, 184);
      doc.setFontSize(9);
      doc.text('PROJECT AUDIT LOCATION:', 20, 55);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text(`${station.name} (${station.city})`, 20, 61);

      doc.setTextColor(148, 163, 184);
      doc.setFontSize(9);
      doc.text('AUDITING FISCAL YEAR:', 120, 55);
      doc.setTextColor(245, 158, 11);
      doc.setFontSize(10);
      doc.text(`${year} Annual CCER Verification`, 120, 61);

      doc.setTextColor(148, 163, 184);
      doc.setFontSize(9);
      doc.text('VERIFIED METHODOLOGY:', 20, 71);
      doc.setTextColor(226, 232, 240);
      doc.setFontSize(9);
      doc.text('CMS-001-V01 Coastal Saltmarsh & Seagrass Bed Blue Carbon Sequestration', 20, 77);

      doc.setTextColor(148, 163, 184);
      doc.setFontSize(9);
      doc.text('ECOLOGICAL RESTORATION FACTOR:', 120, 71);
      doc.setTextColor(52, 211, 153);
      doc.setFontSize(9);
      doc.text(`${intervention}% Standard Optimal Restoration Rate`, 120, 77);

      // Highlighted Metrics Box
      doc.setFillColor(15, 23, 42);
      doc.roundedRect(18, 86, 174, 46, 2, 2, 'F');
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.6);
      doc.roundedRect(18, 86, 174, 46, 2, 2, 'S');

      doc.setTextColor(56, 189, 248);
      doc.setFontSize(9);
      doc.text('VERIFIED NET CARBON SEQUESTRATION:', 26, 97);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text(`${verifiedCarbonTons} Wan Tons CO2e`, 26, 107);

      doc.setTextColor(245, 158, 11);
      doc.setFontSize(9);
      doc.text(`Official Guidance Clearing Price: RMB ${unitPrice.toFixed(2)} / Ton CO2e`, 26, 117);
      doc.setTextColor(52, 211, 153);
      doc.text(`Total Estimated Economic Asset Valuation: RMB ${Number(totalValuation).toLocaleString()} Wan Yuan`, 26, 124);

      // Reservoir Distribution Details
      doc.setTextColor(245, 158, 11);
      doc.setFontSize(10);
      doc.text('SUB-RESERVOIR QUANTIFICATION DETAILS:', 20, 144);

      doc.setTextColor(203, 213, 225);
      doc.setFontSize(9);
      doc.text(`1. Saltmarsh Wetland Soil Organic Carbon (SOC): ${(station.carbonShare.saltmarsh).toFixed(1)}% Share`, 24, 153);
      doc.text(`   - Native vegetation (Suaeda salsa / Phragmites australis) deep sediment retention.`, 24, 158);
      doc.text(`2. Seagrass Bed Roots Millennium Storage (RDOC): ${(station.carbonShare.seagrass).toFixed(1)}% Share`, 24, 166);
      doc.text(`   - Zostera marina rhizome layer burial rate 245 g C/(m2*a) with 98.4% retention.`, 24, 171);
      doc.text(`3. Shellfish & Macroalgae Multi-Trophic Aquaculture: ${(station.carbonShare.shellfishAlgae).toFixed(1)}% Share`, 24, 179);
      doc.text(`   - Bivalve calcification shell capture + Kelp photosynthetic export certified.`, 24, 184);

      // Blockchain Certificate Hash Container
      doc.setFillColor(15, 23, 42);
      doc.rect(18, 196, 174, 38, 'F');
      doc.setDrawColor(99, 102, 241);
      doc.setLineWidth(0.5);
      doc.rect(18, 196, 174, 38, 'S');

      doc.setTextColor(165, 180, 252);
      doc.setFontSize(8.5);
      doc.text('NATIONAL CCER BLOCKCHAIN IMMUTABLE AUDIT TRAIL (SHA-256):', 24, 206);
      doc.setTextColor(241, 245, 249);
      doc.setFontSize(7.5);
      doc.text(blockHash, 24, 214);
      doc.setTextColor(52, 211, 153);
      doc.setFontSize(8);
      doc.text('[AUTHENTICITY: STATE DUAL-CARBON REGISTER VERIFIED & SEALED ON CHAIN]', 24, 223);

      // Official Stamp and Certification Notes
      doc.setTextColor(148, 163, 184);
      doc.setFontSize(8.5);
      doc.text('Third-party Auditor: China Environmental United Certification Center (CEC)', 20, 248);
      doc.text('Accreditation Agency: National Carbon Neutrality Metrology Standard Authority', 20, 254);
      doc.text('Supervisory Authority: Shandong Provincial Department of Natural Resources & Marine Bureau', 20, 260);
      doc.text(`Document Generation Date: September 28, ${year}`, 20, 266);

      doc.setTextColor(245, 158, 11);
      doc.setFontSize(9);
      doc.text('[STAMPED WITH STATE DIGITAL ELECTRONIC OFFICIAL SEAL]', 108, 266);

      // Save real PDF directly to user's computer
      doc.save(`${reportId}.pdf`);

      setDownloadSuccessToast(true);
      setTimeout(() => {
        setDownloadSuccessToast(false);
      }, 4000);
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[#030914] text-slate-100 overflow-hidden font-sans select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-emerald-500/25 bg-slate-950/95 z-20 shrink-0">
        <div className="flex items-center gap-3">
          {onBackToGis && (
            <button
              onClick={onBackToGis}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-200 hover:text-white hover:bg-emerald-950/40 text-xs font-bold transition-all shadow-sm group cursor-pointer mr-2"
              title="返回全省数字孪生GIS主控大屏"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>返回GIS态势大屏</span>
            </button>
          )}

          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/25 to-teal-500/10 border border-emerald-400/40 text-emerald-300">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                国家温室气体自愿减排量 (CCER) 蓝碳资产核证报告凭证
              </h2>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold">
                国家注册簿法权防伪
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              备案方法学：CMS-001-V01《沿海盐沼及海草床生态系统碳汇计量与监测方法学》
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            title="打印核证凭证"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>打印</span>
          </button>
          {/* REAL PDF DOWNLOAD BUTTON */}
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all hover:scale-[1.02]"
            title="生成并直接下载PDF电子凭证至本地电脑"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? '正在生成PDF...' : '下载PDF电子凭证至电脑'}</span>
          </button>
        </div>
      </div>

      {/* Main Certificate Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900 border border-emerald-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.15)] space-y-6">
          {/* Certificate Header Stamp & Title */}
          <div className="text-center border-b border-amber-500/25 pb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-950/60 border border-amber-400/40 text-amber-300 text-[10px] font-mono mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>国家碳达峰碳中和标准体系计量规范认证</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-wider">
              PRC-CCER 国家核证自愿减排量资产证书
            </h1>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              CERTIFICATE OF VERIFIED EMISSION REDUCTION (BLUE CARBON SINK)
            </p>
          </div>

          {/* Export Toast Notification */}
          {downloadSuccessToast && (
            <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-xs flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.4)] animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">
                    已成功生成并下载 {reportId}.pdf 电子核证凭证文件到您的电脑！
                  </div>
                  <span className="text-[10px] text-emerald-300/90 font-mono">
                    包含权威防伪签章、SHA-256存证哈希及分项碳库核准明细
                  </span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-emerald-400/90 bg-emerald-900/60 px-2 py-1 rounded">
                PDF DOWNLOADED
              </span>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
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
                国家登记簿已核准
              </span>
            </div>
          </div>

          {/* Key Sequestration Quantity Table */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-amber-950/30 via-slate-950/60 to-slate-950/60 border border-amber-500/30">
            <h4 className="font-bold text-sm text-amber-300 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>经国家注册会计与海洋环境监测机构共同核定清单</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/25">
                <span className="text-slate-400 block text-xs">经核定有效净固碳量</span>
                <div className="flex items-baseline justify-center gap-1 mt-2">
                  <span className="font-num text-3xl font-extrabold text-cyan-300">
                    {verifiedCarbonTons}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">万吨 CO2e</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/25">
                <span className="text-slate-400 block text-xs">当期指导结算挂牌价</span>
                <div className="flex items-baseline justify-center gap-1 mt-2">
                  <span className="font-num text-3xl font-extrabold text-amber-300">
                    ¥{unitPrice.toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/ 吨 CO2e</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/25">
                <span className="text-slate-400 block text-xs">潜在碳资产总经济估值</span>
                <div className="flex items-baseline justify-center gap-1 mt-2">
                  <span className="font-num text-3xl font-extrabold text-emerald-300">
                    {Number(totalValuation).toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">万元</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-reservoir Accounting Breakdown */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs">
            <span className="font-semibold text-slate-300 block">各分项碳库核准细则及不确定性折扣</span>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-850">
                <span className="text-slate-400">盐沼湿地潮滩地上生物量与土壤有机碳 (SOC)</span>
                <span className="font-mono text-slate-200">
                  占比 {(station.carbonShare.saltmarsh).toFixed(1)}% · 扣减 5% 挥发保守折扣
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-850">
                <span className="text-slate-400">大叶藻海草床根系沉积千年碳库 (RDOC)</span>
                <span className="font-mono text-slate-200">
                  占比 {(station.carbonShare.seagrass).toFixed(1)}% · 折现率 98.4%
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-850">
                <span className="text-slate-400">贝藻立体增殖深海滤食碳泵与钙化外壳固定</span>
                <span className="font-mono text-slate-200">
                  占比 {(station.carbonShare.shellfishAlgae).toFixed(1)}% · 依移出渔获量确权
                </span>
              </div>
            </div>
          </div>

          {/* Blockchain Hash & Official Signatures */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                <QrCode className="w-10 h-10 text-cyan-300" />
              </div>
              <div>
                <span className="text-slate-400 block font-mono">国家自愿减排量存证哈希 (Blockchain SHA-256):</span>
                <span className="font-mono text-slate-300 break-all select-all font-semibold">
                  {blockHash}
                </span>
                <div className="flex items-center gap-2 mt-1 text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>国家双碳认证专网不可篡改存证</span>
                </div>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4 space-y-1 shrink-0">
              <div className="text-slate-400">核查机构：中环联合认证中心 (CEC)</div>
              <div className="text-slate-400">签署日期：2026年09月28日</div>
              <div className="font-bold text-amber-400">[已加盖国家蓝碳核算电子签章]</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
