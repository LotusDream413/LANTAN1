import React, { useState } from 'react';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Briefcase, 
  Calculator, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  Building2, 
  Activity, 
  BarChart2, 
  CheckCircle2, 
  FileText, 
  Coins,
  RefreshCw,
  Percent
} from 'lucide-react';
import { StationData } from '../data/blueCarbonData';

interface CarbonTradingViewProps {
  station: StationData;
  year: number;
  onBackToGis?: () => void;
}

interface TickerItem {
  id: string;
  code: string;
  name: string;
  price: number;
  change: number;
  changeAmount: number;
  high: number;
  low: number;
  volume: number;
  type: string;
}

export const CarbonTradingView: React.FC<CarbonTradingViewProps> = ({
  station,
  year,
  onBackToGis,
}) => {
  const tickers: TickerItem[] = [
    {
      id: 'sd-bc-01',
      code: 'SD-BC-01',
      name: '日照前三岛·大型贝藻碳汇凭证',
      price: 78.50,
      change: +3.42,
      changeAmount: +2.60,
      high: 79.20,
      low: 75.80,
      volume: 48920,
      type: '贝藻微藻固碳',
    },
    {
      id: 'sd-yz-02',
      code: 'SD-YZ-02',
      name: '黄河口·盐沼湿地生态减排票',
      price: 84.20,
      change: +4.15,
      changeAmount: +3.35,
      high: 85.00,
      low: 80.60,
      volume: 62400,
      type: '盐沼沉积碳封存',
    },
    {
      id: 'sd-hc-03',
      code: 'SD-HC-03',
      name: '桑沟湾·海草床蓝碳自愿减排量',
      price: 89.60,
      change: -0.80,
      changeAmount: -0.72,
      high: 91.00,
      low: 88.50,
      volume: 31250,
      type: '海草床长效碳库',
    },
    {
      id: 'sd-cd-04',
      code: 'SD-CD-04',
      name: '长岛海洋牧场·贝壳碳酸盐期权',
      price: 72.80,
      change: +1.95,
      changeAmount: +1.40,
      high: 73.50,
      low: 71.00,
      volume: 24800,
      type: '贝类生物钙化',
    },
  ];

  const [selectedTickerId, setSelectedTickerId] = useState<string>('sd-bc-01');
  const activeTicker = tickers.find((t) => t.id === selectedTickerId) || tickers[0];

  const [selectedKLineRange, setSelectedKLineRange] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [tradeVolumeTons, setTradeVolumeTons] = useState<number>(500);
  const [isOrderSubmitted, setIsOrderSubmitted] = useState<boolean>(false);
  const [companyEmissionTons, setCompanyEmissionTons] = useState<number>(100000);

  const currentMarketPrice = activeTicker.price;
  const policyIncentiveRate = 0.15;
  const grossRevenue = tradeVolumeTons * currentMarketPrice;
  const policyBonus = grossRevenue * policyIncentiveRate;
  const corporateEsgTaxDeduction = tradeVolumeTons * 12.5;
  const netEconomicBenefit = grossRevenue + policyBonus + corporateEsgTaxDeduction;

  const maxAllowedCcerOffsetTons = companyEmissionTons * 0.05;
  const ceaBenchmarkPrice = 93.5;
  const unitPriceDifference = ceaBenchmarkPrice - currentMarketPrice;
  const directCostSaved = maxAllowedCcerOffsetTons * unitPriceDifference;
  const greenFinanceSubsidy = maxAllowedCcerOffsetTons * currentMarketPrice * 0.15;
  const totalEnterpriseBenefit = directCostSaved + greenFinanceSubsidy;

  const kLineData = [
    { time: '09:30', open: 76.2, close: 77.0, high: 77.4, low: 75.8, vol: 1200 },
    { time: '10:30', open: 77.0, close: 76.8, high: 77.5, low: 76.4, vol: 1800 },
    { time: '11:30', open: 76.8, close: 77.8, high: 78.1, low: 76.7, vol: 2400 },
    { time: '13:30', open: 77.8, close: 78.4, high: 78.9, low: 77.5, vol: 3100 },
    { time: '14:30', open: 78.4, close: 78.2, high: 78.6, low: 77.9, vol: 2800 },
    { time: '15:00', open: 78.2, close: currentMarketPrice, high: 79.2, low: 78.0, vol: 4200 },
  ];

  const bids = [
    { price: currentMarketPrice - 0.02, volume: 1250 },
    { price: currentMarketPrice - 0.05, volume: 2400 },
    { price: currentMarketPrice - 0.10, volume: 890 },
    { price: currentMarketPrice - 0.15, volume: 3100 },
    { price: currentMarketPrice - 0.20, volume: 1540 },
  ];

  const asks = [
    { price: currentMarketPrice + 0.02, volume: 920 },
    { price: currentMarketPrice + 0.05, volume: 1800 },
    { price: currentMarketPrice + 0.10, volume: 2600 },
    { price: currentMarketPrice + 0.15, volume: 1450 },
    { price: currentMarketPrice + 0.20, volume: 3800 },
  ];

  const handlePlaceOrder = () => {
    setIsOrderSubmitted(true);
    setTimeout(() => {
      setIsOrderSubmitted(false);
    }, 2800);
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col bg-[#030914] text-slate-100 overflow-hidden font-sans select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-amber-500/25 bg-slate-950/95 z-20 shrink-0">
        <div className="flex items-center gap-3">
          {onBackToGis && (
            <button
              onClick={onBackToGis}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-200 hover:text-white hover:bg-amber-950/40 text-xs font-bold transition-all shadow-sm group cursor-pointer mr-2"
              title="返回全省数字孪生GIS主控大屏"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>返回GIS态势大屏</span>
            </button>
          )}

          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/25 to-cyan-500/10 border border-amber-400/40 text-amber-300">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                山东蓝碳金融资产交易所 · CCER 大宗现货行情与清算大盘
              </h2>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 font-bold">
                国家绿色金融创新试验区
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              依据《国家温室气体自愿减排交易管理办法》(部令第31号) · 挂牌连续撮合机制
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">交易状态:</span>
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            连续竞价中
          </span>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {/* Ticker Selector Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {tickers.map((t) => {
            const isSelected = t.id === selectedTickerId;
            const isUp = t.change >= 0;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTickerId(t.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-cyan-400">{t.code}</span>
                  <span className={`text-xs font-mono font-bold flex items-center gap-0.5 ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {isUp ? `+${t.change}%` : `${t.change}%`}
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate mt-1">{t.name}</div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="font-num text-lg font-bold text-amber-300">¥{t.price.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-500 font-mono">成交 {t.volume.toLocaleString()} 吨</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Workspace: Chart & Order Book */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Chart Stage */}
          <div className="lg:col-span-2 p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-num text-amber-300">
                    ¥{activeTicker.price.toFixed(2)}
                  </span>
                  <span className={`text-xs font-mono font-bold flex items-center ${activeTicker.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {activeTicker.change >= 0 ? '+' : ''}{activeTicker.changeAmount} ({activeTicker.change}%)
                  </span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                  {activeTicker.type}
                </span>
              </div>

              {/* Timeframes */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono">
                {(['1D', '1W', '1M', '1Y'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedKLineRange(range)}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      selectedKLineRange === range
                        ? 'bg-amber-500/20 text-amber-300 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated K-Line Chart SVG */}
            <div className="relative my-3 h-52 w-full flex items-end justify-between px-3 pt-6 bg-slate-900/40 rounded-lg border border-slate-850">
              <div className="absolute top-2 left-3 flex items-center gap-4 text-[10px] text-slate-400 font-mono">
                <span>最高: <strong className="text-emerald-400">¥{activeTicker.high}</strong></span>
                <span>最低: <strong className="text-rose-400">¥{activeTicker.low}</strong></span>
                <span>加权均价: <strong>¥{(activeTicker.price * 0.992).toFixed(2)}</strong></span>
              </div>

              {kLineData.map((d, i) => {
                const isGreen = d.close >= d.open;
                const minPrice = 75.0;
                const maxPrice = 80.0;
                const heightPercent = ((d.high - d.low) / (maxPrice - minPrice)) * 100;
                const bodyHeight = (Math.abs(d.close - d.open) / (maxPrice - minPrice)) * 100;
                const bodyBottom = ((Math.min(d.open, d.close) - minPrice) / (maxPrice - minPrice)) * 100;

                return (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative">
                    <div
                      className="absolute w-[1px] bg-slate-600 group-hover:bg-amber-300"
                      style={{
                        bottom: `${((d.low - minPrice) / (maxPrice - minPrice)) * 100}%`,
                        height: `${heightPercent}%`,
                      }}
                    />
                    <div
                      className={`w-5 sm:w-8 rounded-xs z-10 transition-all ${
                        isGreen ? 'bg-emerald-500 group-hover:bg-emerald-400' : 'bg-rose-500 group-hover:bg-rose-400'
                      }`}
                      style={{
                        bottom: `${bodyBottom}%`,
                        height: `${Math.max(bodyHeight, 3)}%`,
                        position: 'absolute',
                      }}
                    />
                    <div className="text-[9px] text-slate-400 font-mono mt-1 pt-1 border-t border-slate-800 w-full text-center">
                      {d.time}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                国家注册簿编号：CCER-MAR-2026-SD-0994
              </span>
              <span className="font-mono text-cyan-300">撮合引擎：区块链智能合约0.05秒毫秒级交割</span>
            </div>
          </div>

          {/* Right Column: Order Book & Quick Trading Form */}
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-200">委托五档盘口</span>
                <span className="text-[10px] text-slate-400 font-mono">单位: 吨 / 元</span>
              </div>

              {/* Asks (Sell Orders) */}
              <div className="space-y-1 my-2 text-xs font-mono">
                {asks.slice().reverse().map((a, idx) => (
                  <div key={idx} className="flex justify-between items-center text-slate-400 hover:bg-slate-900 px-1 py-0.5 rounded">
                    <span className="text-[10px] text-rose-400">卖{asks.length - idx}</span>
                    <span className="text-rose-400 font-bold">¥{a.price.toFixed(2)}</span>
                    <span className="text-slate-400">{a.volume}</span>
                  </div>
                ))}
              </div>

              {/* Spread separator */}
              <div className="py-1 px-2 my-1 bg-slate-900 rounded text-center text-xs font-mono font-bold text-amber-300 flex justify-between">
                <span>现价 ¥{currentMarketPrice.toFixed(2)}</span>
                <span className="text-[10px] text-emerald-400 font-normal">买卖点差 0.04</span>
              </div>

              {/* Bids (Buy Orders) */}
              <div className="space-y-1 my-2 text-xs font-mono">
                {bids.map((b, idx) => (
                  <div key={idx} className="flex justify-between items-center text-slate-400 hover:bg-slate-900 px-1 py-0.5 rounded">
                    <span className="text-[10px] text-emerald-400">买{idx + 1}</span>
                    <span className="text-emerald-400 font-bold">¥{b.price.toFixed(2)}</span>
                    <span className="text-slate-400">{b.volume}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trading Inputs */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2.5">
              <div className="flex gap-1 p-0.5 rounded bg-slate-950 border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setOrderType('buy')}
                  className={`flex-1 py-1 rounded transition-all cursor-pointer ${
                    orderType === 'buy' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  认购 (买入增汇)
                </button>
                <button
                  onClick={() => setOrderType('sell')}
                  className={`flex-1 py-1 rounded transition-all cursor-pointer ${
                    orderType === 'sell' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  挂牌 (卖出变现)
                </button>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>申报交易量:</span>
                  <span className="font-mono text-cyan-300">{tradeVolumeTons} 吨 CO2e</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={tradeVolumeTons}
                  onChange={(e) => setTradeVolumeTons(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>申报预估金额:</span>
                  <span className="font-mono font-bold text-white">¥{(tradeVolumeTons * currentMarketPrice).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-400">
                  <span>绿色金融财政贴息 (15%):</span>
                  <span className="font-mono">+¥{policyBonus.toFixed(1)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isOrderSubmitted}
                className={`w-full py-2 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 ${
                  orderType === 'buy'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/40'
                    : 'bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white shadow-rose-900/40'
                }`}
              >
                {isOrderSubmitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 animate-bounce" />
                    <span>挂单已撮合入库！正在链上划转...</span>
                  </>
                ) : (
                  <>
                    <Briefcase className="w-4 h-4" />
                    <span>立即提交 {orderType === 'buy' ? '认购' : '挂牌'} 申请</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enterprise CCER 5% Offset Calculator */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-200">
              控排企业 5% 蓝碳 CCER 配额清缴履约对冲成本测算模型
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-2 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-slate-400">企业年度核发碳排放基准量</div>
              <div className="text-lg font-bold font-mono text-cyan-300">
                {companyEmissionTons.toLocaleString()} 吨
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={companyEmissionTons}
                onChange={(e) => setCompanyEmissionTons(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 block">法定最高可使用 5% 蓝碳 CCER 抵销</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="text-slate-400">CEA基准价与蓝碳差价节省</div>
              <div className="text-lg font-bold font-mono text-emerald-400">
                ¥{directCostSaved.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400">
                CEA配额价 ¥93.5 - 蓝碳价 ¥{currentMarketPrice} = 差额 ¥{unitPriceDifference.toFixed(1)}/吨
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="text-slate-400">综合直接与贴息履约净收益</div>
              <div className="text-lg font-bold font-mono text-amber-300">
                ¥{totalEnterpriseBenefit.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-400">
                获得山东省海洋绿色金融信用评级 AAA 级
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
