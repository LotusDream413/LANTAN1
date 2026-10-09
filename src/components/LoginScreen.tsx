import React, { useState, useRef } from 'react';
import { 
  Waves, 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  Globe2, 
  Cpu, 
  TrendingUp,
  Activity,
  Layers,
  MapPin,
  Compass,
  Play,
  Pause,
  Upload,
  Camera,
  Coins
} from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (user: { name: string; role: string }) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin_shandong');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'admin' | 'researcher' | 'enterprise'>('admin');
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: username === 'admin_shandong' ? '省海洋局高级核算员' : username,
        role: role === 'admin' ? '系统总调度中心' : role === 'enterprise' ? '控排与碳交易企业' : '科研院士团队',
      });
    }, 600);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col lg:flex-row bg-[#020712] select-none text-slate-100 font-sans">
      {/* ========================================================================= */}
      {/* LEFT SECTION (60%): High-Grade Visual / Video / Zhanqiao Coastal Scenic */}
      {/* ========================================================================= */}
      <div className="relative flex-1 lg:w-[62%] h-[40vh] lg:h-full overflow-hidden bg-gradient-to-b from-[#031525] via-[#05233a] to-[#010915] flex flex-col justify-between p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-cyan-500/25">
        
        {/* Background Layer: Custom Video or Dynamic Animated SVG Zhanqiao Coastal Artwork */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {customVideoUrl ? (
            <video
              ref={videoRef}
              src={customVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90 scale-105"
            />
          ) : (
            /* Dynamic Animated Coastal Vector Art matching user's Zhanqiao Huilan Pavilion footage */
            <div className="relative w-full h-full">
              <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
                <defs>
                  {/* Sky Gradient */}
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#082b4a" />
                    <stop offset="45%" stopColor="#125178" />
                    <stop offset="70%" stopColor="#3288a6" />
                    <stop offset="100%" stopColor="#5aa5bf" />
                  </linearGradient>

                  {/* Ocean Gradient */}
                  <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e7393" />
                    <stop offset="25%" stopColor="#105777" />
                    <stop offset="60%" stopColor="#083854" />
                    <stop offset="100%" stopColor="#021c32" />
                  </linearGradient>

                  {/* Hill Silhouette Gradient */}
                  <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1b4d6b" />
                    <stop offset="100%" stopColor="#0c2d42" />
                  </linearGradient>

                  {/* Golden Glazed Tile Gradient for Huilan Pavilion */}
                  <linearGradient id="roofGold" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>

                  {/* Red Pavilion Pillar Gradient */}
                  <linearGradient id="pillarRed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#991b1b" />
                  </linearGradient>

                  {/* Subtle Wave Reflection */}
                  <linearGradient id="waveReflect" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* 1. Sky */}
                <rect width="1000" height="380" fill="url(#skyGrad)" />

                {/* Drifting Clouds */}
                <g opacity="0.3" className="animate-pulse">
                  <path d="M 80,90 Q 110,60 150,75 Q 190,50 240,75 Q 280,65 300,90 Z" fill="#ffffff" />
                  <path d="M 550,110 Q 580,85 620,95 Q 660,75 700,95 Q 730,85 750,110 Z" fill="#ffffff" />
                </g>

                {/* 2. Coastal Hills & Qingdao Red-Roof European Architecture Silhouette */}
                <path
                  d="M 0,260 Q 180,210 380,245 Q 600,200 820,230 Q 920,245 1000,250 L 1000,340 L 0,340 Z"
                  fill="url(#hillGrad)"
                />
                {/* Red roofs & green trees cluster */}
                {[
                  { x: 120, y: 235, w: 28, h: 14, color: '#e11d48' },
                  { x: 160, y: 228, w: 34, h: 18, color: '#be123c' },
                  { x: 210, y: 232, w: 40, h: 16, color: '#f43f5e' },
                  { x: 270, y: 225, w: 32, h: 20, color: '#e11d48' },
                  { x: 320, y: 236, w: 26, h: 14, color: '#be123c' },
                  { x: 450, y: 220, w: 45, h: 22, color: '#e11d48' },
                  { x: 510, y: 215, w: 38, h: 24, color: '#f43f5e' },
                  { x: 570, y: 222, w: 32, h: 18, color: '#be123c' },
                  { x: 680, y: 225, w: 48, h: 20, color: '#e11d48' },
                  { x: 740, y: 230, w: 36, h: 16, color: '#f43f5e' },
                ].map((b, i) => (
                  <g key={i}>
                    {/* Building base */}
                    <rect x={b.x} y={b.y + b.h * 0.4} width={b.w} height={b.h * 0.8} fill="#f1f5f9" opacity="0.85" />
                    {/* Triangular red roof */}
                    <polygon
                      points={`${b.x - 2},${b.y + b.h * 0.4} ${b.x + b.w / 2},${b.y} ${b.x + b.w + 2},${b.y + b.h * 0.4}`}
                      fill={b.color}
                    />
                  </g>
                ))}

                {/* Lush pine trees */}
                {[90, 148, 200, 255, 305, 435, 498, 555, 660, 725, 785].map((tx, idx) => (
                  <circle key={idx} cx={tx} cy={242} r={7} fill="#15803d" opacity="0.9" />
                ))}

                {/* 3. Golden Sandy Beach along the shoreline */}
                <path d="M 0,335 Q 350,325 700,338 Q 880,342 1000,336 L 1000,355 L 0,355 Z" fill="#eab308" opacity="0.45" />

                {/* 4. Turquoise Ocean Waters */}
                <rect x="0" y="345" width="1000" height="355" fill="url(#oceanGrad)" />

                {/* Animated Wave Ripples */}
                <g stroke="#38bdf8" strokeWidth="1.2" fill="none" opacity="0.35">
                  <path d="M 50,370 Q 250,365 450,372 T 850,368" />
                  <path d="M 120,410 Q 320,405 520,412 T 920,408" />
                  <path d="M 30,460 Q 230,455 430,462 T 830,458" />
                  <path d="M 90,520 Q 300,515 500,522 T 950,518" />
                  <path d="M 150,580 Q 350,575 550,582 T 900,578" />
                  <path d="M 40,640 Q 260,635 480,642 T 920,638" />
                </g>

                {/* 5. Iconic Qingdao Zhanqiao Pier (栈桥长堤) */}
                {/* Pier Bridge body stretching from coastline into bay */}
                <polygon
                  points="180,340 700,540 680,556 160,345"
                  fill="#64748b"
                  stroke="#334155"
                  strokeWidth="2"
                />
                {/* Pier walking pavement with stone texture */}
                <polygon
                  points="176,341 694,541 684,549 166,344"
                  fill="#94a3b8"
                />
                {/* Bridge railing posts */}
                <line x1="178" y1="339" x2="698" y2="539" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 4" />
                <line x1="162" y1="344" x2="682" y2="554" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 4" />

                {/* 6. Iconic Huilan Pavilion (回澜阁) at Pier Head */}
                <g transform="translate(690, 500)">
                  {/* Pavilion Island Platform (Octagonal Stone Base) */}
                  <ellipse cx="40" cy="85" rx="55" ry="24" fill="#475569" stroke="#334155" strokeWidth="2" />
                  <ellipse cx="40" cy="82" rx="50" ry="20" fill="#64748b" />

                  {/* Water Reflection of Pavilion */}
                  <ellipse cx="40" cy="110" rx="35" ry="12" fill="url(#waveReflect)" />

                  {/* Lower Tier Pillars (Vermilion Red) */}
                  {[-24, -12, 0, 12, 24].map((px, idx) => (
                    <line key={idx} x1={40 + px} y1={80} x2={40 + px} y2={56} stroke="url(#pillarRed)" strokeWidth="3" />
                  ))}

                  {/* Lower Tier Roof (Golden Flying Eaves) */}
                  <polygon
                    points="40,42 -4,58 84,58"
                    fill="url(#roofGold)"
                    stroke="#78350f"
                    strokeWidth="1.5"
                  />

                  {/* Upper Tier Pillars */}
                  {[-14, 0, 14].map((px, idx) => (
                    <line key={idx} x1={40 + px} y1={52} x2={40 + px} y2={34} stroke="url(#pillarRed)" strokeWidth="2.8" />
                  ))}

                  {/* Upper Tier Octagonal Flying Eaves Roof */}
                  <polygon
                    points="40,16 8,36 72,36"
                    fill="url(#roofGold)"
                    stroke="#78350f"
                    strokeWidth="1.5"
                  />

                  {/* Top Golden Spire Crown */}
                  <circle cx="40" cy="14" r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                </g>

                {/* 7. Cruising Sightseeing Boat with Wake Ripples */}
                <g transform="translate(480, 480)">
                  {/* Boat hull */}
                  <polygon points="0,6 26,0 34,10 6,14" fill="#f8fafc" stroke="#0284c7" strokeWidth="1" />
                  {/* Orange canopy */}
                  <polygon points="6,4 22,0 24,6 8,9" fill="#f97316" />
                  {/* White Foam Wake */}
                  <path d="M 0,8 Q -20,12 -55,16" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.6" />
                  <path d="M 4,14 Q -15,22 -45,30" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.4" />
                </g>

                {/* Second Small Sailing Yacht in distance */}
                <g transform="translate(860, 430)">
                  <polygon points="0,4 16,0 20,6 4,8" fill="#ffffff" />
                  <polygon points="10,0 10,-14 16,-2" fill="#ffffff" opacity="0.9" />
                </g>

                {/* 8. Gracefully Flying White Seagulls */}
                {[
                  { x: 340, y: 190, s: 1.2 },
                  { x: 380, y: 175, s: 0.9 },
                  { x: 420, y: 200, s: 1.0 },
                  { x: 620, y: 310, s: 1.1 },
                  { x: 650, y: 295, s: 0.8 },
                ].map((gull, idx) => (
                  <path
                    key={idx}
                    d={`M ${gull.x - 10 * gull.s},${gull.y} Q ${gull.x - 5 * gull.s},${gull.y - 6 * gull.s} ${gull.x},${gull.y} Q ${gull.x + 5 * gull.s},${gull.y - 6 * gull.s} ${gull.x + 10 * gull.s},${gull.y}`}
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    fill="none"
                    opacity="0.95"
                  />
                ))}
              </svg>
            </div>
          )}

          {/* Sci-Fi Vignette Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020712] via-transparent to-[#020712]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#020712]" />
        </div>

        {/* Top Brand Banner & Multimedia Controls */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>国家级海洋碳汇数字化标杆工程 · 山东省重点生态专网</span>
            </div>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 drop-shadow-md">
              山东省蓝碳智能监测与碳汇资产核算云平台
            </h1>
            <p className="text-xs lg:text-sm font-mono text-cyan-400/90 tracking-widest">
              SHANDONG MARINE BLUE CARBON DIGITAL TWIN PLATFORM
            </p>
          </div>

          {/* Custom Video / Live View Action Controls */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/70 border border-cyan-500/40 text-cyan-300 hover:bg-slate-900 hover:text-white transition-all text-xs backdrop-blur-md shadow-md"
              title="载入用户本地航拍实况视频 (MP4/WebM)"
            >
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">载入实况视频</span>
            </button>

            {customVideoUrl && (
              <button
                onClick={togglePlay}
                className="p-1.5 rounded-lg bg-slate-950/70 border border-cyan-500/40 text-cyan-300 hover:bg-slate-900 transition-all text-xs"
                title={isPlaying ? "暂停视频" : "播放视频"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Left: 4 Live Macro Ecosystem Telemetry Cards */}
        <div className="relative z-10 pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md">
              <span className="text-[10px] text-slate-400 block">纳管蓝碳湿地与藻场</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-num text-xl font-bold text-cyan-300">128,000</span>
                <span className="text-[9px] text-slate-400 font-mono">公顷</span>
              </div>
              <span className="text-[9px] text-emerald-400 block mt-0.5">全省5大核心基地</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md">
              <span className="text-[10px] text-slate-400 block">全省年度核算固碳量</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-num text-xl font-bold text-emerald-400">432.8</span>
                <span className="text-[9px] text-slate-400 font-mono">万吨 CO2e</span>
              </div>
              <span className="text-[9px] text-cyan-400 block mt-0.5">同比增长 +12.4%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 backdrop-blur-md">
              <span className="text-[10px] text-slate-400 block">CCER 资产指导估值</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-num text-xl font-bold text-amber-300">3.42</span>
                <span className="text-[9px] text-slate-400 font-mono">亿元 RMB</span>
              </div>
              <span className="text-[9px] text-amber-400 block mt-0.5">现货基准价 ¥78.5/吨</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md">
              <span className="text-[10px] text-slate-400 block">空天地海在网节点</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-num text-xl font-bold text-sky-300">1,420</span>
                <span className="text-[9px] text-slate-400 font-mono">台套</span>
              </div>
              <span className="text-[9px] text-emerald-400 block mt-0.5">综合在线率 98.4%</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 font-mono">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>当前实况全景：青岛·胶州湾栈桥与回澜阁海岸带</span>
            </span>
            <span className="hidden sm:inline text-slate-400">
              天基高分六号 · 涡度通量塔 · 原位浮标阵群联动
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SECTION (38%): Clean High-Tech Login Card Window (Right Side)       */}
      {/* ========================================================================= */}
      <div className="flex-1 lg:w-[38%] h-full flex items-center justify-center p-6 lg:p-12 relative z-10 bg-[#020712]/95 backdrop-blur-xl">
        <div className="w-full max-w-md p-8 rounded-2xl bg-slate-950/90 border border-cyan-500/35 shadow-[0_0_60px_rgba(4,13,26,0.95)] tech-border">
          {/* Brand Icon & Heading */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/25 via-emerald-500/20 to-blue-500/10 border border-cyan-400/50 shadow-[0_0_25px_rgba(6,182,212,0.35)] mb-3">
              <Waves className="w-8 h-8 text-cyan-300 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              调度中枢系统登录验证
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              AUTHORIZED PERSONNEL SECURITY LOGIN
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="flex p-1 mb-5 rounded-lg bg-slate-900/90 border border-cyan-500/20 text-xs">
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-1.5 rounded font-medium transition-all ${
                role === 'admin'
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/50 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              调度监管中心
            </button>
            <button
              type="button"
              onClick={() => setRole('enterprise')}
              className={`flex-1 py-1.5 rounded font-medium transition-all ${
                role === 'enterprise'
                  ? 'bg-amber-500/25 text-amber-300 border border-amber-400/50 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              碳资产交易商
            </button>
            <button
              type="button"
              onClick={() => setRole('researcher')}
              className={`flex-1 py-1.5 rounded font-medium transition-all ${
                role === 'researcher'
                  ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/50 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              海洋科研院士
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                认证账号 / User Account
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-400/70">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-cyan-500/25 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-all"
                  placeholder="请输入管理账号"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                安全密码 / Security Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-cyan-400/70">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 bg-slate-900/90 border border-cyan-500/25 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-all"
                  placeholder="请输入安全密令"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0" />
                <span>记住登录凭证</span>
              </label>
              <span className="text-cyan-400/80 hover:text-cyan-300 cursor-pointer">
                国标CCER密钥接入
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-600 via-cyan-500 to-emerald-600 text-slate-950 font-bold text-xs tracking-wider uppercase hover:opacity-95 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>安全核验中...</span>
                </>
              ) : (
                <>
                  <span>登 录 进 入 云 平 台</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Fast Demo Login Tips */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>国家级数据密级合规</span>
            </div>
            <span className="font-mono text-cyan-400/70">VERSION 4.8.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};
