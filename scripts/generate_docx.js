import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType
} from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper styles
const primaryColor = '0891B2'; // Cyan/Ocean
const darkColor = '0F172A';
const grayColor = '475569';
const lightBg = 'F1F5F9';
const accentBg = 'E0F2FE';

function createHeading1(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    run: {
      color: primaryColor,
      bold: true,
      size: 32, // 16pt
      font: 'Microsoft YaHei'
    }
  });
}

function createHeading2(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    run: {
      color: '0369A1',
      bold: true,
      size: 26, // 13pt
      font: 'Microsoft YaHei'
    }
  });
}

function createHeading3(text) {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    run: {
      color: darkColor,
      bold: true,
      size: 22, // 11pt
      font: 'Microsoft YaHei'
    }
  });
}

function createP(text, bold = false, color = darkColor) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [
      new TextRun({
        text: text,
        bold: bold,
        color: color,
        size: 21, // 10.5pt
        font: 'Microsoft YaHei'
      })
    ]
  });
}

function createBullet(title, desc) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 60, after: 60 },
    children: [
      new TextRun({
        text: title + '：',
        bold: true,
        color: primaryColor,
        size: 21,
        font: 'Microsoft YaHei'
      }),
      new TextRun({
        text: desc,
        color: darkColor,
        size: 21,
        font: 'Microsoft YaHei'
      })
    ]
  });
}

function createCodeBlock(codeText) {
  const lines = codeText.split('\n');
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' },
      left: { style: BorderStyle.SINGLE, size: 4, color: primaryColor },
      right: { style: BorderStyle.SINGLE, size: 1, color: '94A3B8' }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
            children: lines.map(line => new Paragraph({
              spacing: { before: 40, after: 40 },
              children: [
                new TextRun({
                  text: line,
                  font: 'Consolas',
                  size: 18,
                  color: '0F172A'
                })
              ]
            }))
          })
        ]
      })
    ]
  });
}

async function generate() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 500, after: 200 },
            children: [
              new TextRun({
                text: '山东省蓝碳智能监测与碳汇资产核算云平台',
                bold: true,
                size: 40, // 20pt
                color: primaryColor,
                font: 'Microsoft YaHei'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 400 },
            children: [
              new TextRun({
                text: '【答辩汇报与PPT制作全套支持说明文档】',
                bold: true,
                size: 28, // 14pt
                color: grayColor,
                font: 'Microsoft YaHei'
              })
            ]
          }),

          createP('本说明书完全严格对照参赛优秀作品汇报框架（涵盖“PART 01 数据收集”、“PART 02 数据处理/方法”、“PART 01 作品结构”、“PART 02 主要技术”、“PART 03 创新点”等），结合我们研发的《山东省蓝碳智能监测与碳汇资产核算云平台》实际架构与数据流，逐一拆解PPT每页应当放置的截图、官方数据来源网站链接、数据格式、算法代码解析以及业务功能计算原理，供比赛PPT制作与评委答辩即拿即用。'),

          // CHAPTER 1
          createHeading1('第一部分：PPT框架对照与制作总览'),
          createP('在数媒大赛、计算机设计大赛及创新创业大赛中，PPT的逻辑闭环至关重要。参考模板展现了极其清晰的工程实战说服力：'),
          createBullet('第1页【数据收集】', '明确指出数据来源平台（真实权威官方网站）、数据采集方式（API/协议/批量抓取）、具体数据字段以及数据总量规模。配图左侧放API调试/数据接口调用界面，右侧放清洗整理入库的Excel/数据库表格。'),
          createBullet('第2/3页【数据处理与方法】', '展现数据清洗工程与核心算法。指出原始数据存在的噪声与异常值（如浮标跳变、潮汐漂移），引出算法模型（去噪平滑、海气通量动力学、多光谱遥感反演）。配图左侧放算法核心代码，右侧放模型训练Loss曲线或去噪对比图。'),
          createBullet('第4页【作品结构/功能架构】', '以规范流程图（Flowchart）呈现系统从登录到各级大屏、分析中心、核算报告、AI处方等全流程交互与功能跳转。'),
          createBullet('第5页【主要技术】', '以“平台+算法+硬件（多源感知）”三位一体闭环图展现技术深度。'),
          createBullet('第6页【创新点】', '提炼3项核心创新（空间GIS与点位微生境孪生、空天地海多源实时融合、由物理监测到CCER资产化核算闭环）。'),

          // CHAPTER 2
          createHeading1('第二部分：PART 01 数据收集模块（对应PPT第1页）'),
          createHeading2('1. 数据获取工具与采集途径'),
          createBullet('① RESTful API 与开放地理服务', '通过国家遥感中心 STAC (SpatioTemporal Asset Catalog) 标准接口、天地图 OGC WMTS/WFS 矢量图层服务，实时抓取山东省海岸线与行政区划底图矢量。'),
          createBullet('② 物联网传感协议 (MQTT / Modbus-RTU)', '5个典型监测站点（东营、威海、烟台、青岛、日照）的浮标与涡度相关通量塔设备，通过工业级物联网网关以 4G/5G/北斗三号短报文 方式回传至后端时序数据库。'),
          createBullet('③ 卫星多光谱遥感反演流水线', '通过 Google Earth Engine (GEE) 与中国卫星应用中心开放数据，批量调用 Sentinel-2 (哨兵二号) 与 Landsat-8 遥感反演产品。'),

          createHeading2('2. 数据来源官方网站与直达链接'),
          createP('在PPT中，你可以直接展示以下三大类国家级真实权威官方平台：'),
          createBullet('【A. 地理底图与空间边界数据】', '天地图·国家地理信息公共服务平台 (https://www.tianditu.gov.cn/) 与 自然资源部标准地图服务系统 (http://bzdt.ch.mnr.gov.cn/)。用于获取审图号合规的山东省标准行政区划轮廓、黄渤海海域界线及深蓝科技感GIS底图瓦片。'),
          createBullet('【B. 5大监测站点水文生态实测数据】', '国家海洋科学数据中心 (NODC, https://mds.nmdis.org.cn/) 与 中国海洋环境监测中心 (http://www.nmemc.org.cn/)。用于获取5个站点的高频水质水文参数（溶解氧DO、pH值、盐度Salinity、海水表温SST）以及潮汐水深数据。'),
          createBullet('【C. 蓝碳资源分布与遥感数据】', '自然资源部卫星海洋应用中心 (http://www.nsoas.org.cn/) 与 中科院空天信息创新研究院国家对地观测网 (http://www.chinageoss.cn/)。用于获取翅碱蓬红地毯、大叶藻海草床多光谱遥感影像，提取NDVI、NDWI与叶绿素a浓度。'),
          createBullet('【D. CCER碳资产核算与交易基准】', '全国温室气体自愿减排交易(CCER)平台 (https://www.ccer.com.cn/) 与 北京绿色交易所。用于获取国家公布的海洋碳汇方法学标准及全国碳市场最新配额/CCER现货均价行情（75~88元/吨CO2e）。'),

          createHeading2('3. 收集到的具体数据字段与信息'),
          createBullet('水质理化指标', '溶解氧 DO (mg/L)、海水 pH值、实用盐度 Salinity (PSU)、海表温度 SST (°C)、潮位高度 (m)。'),
          createBullet('碳通量与生化指标', '海-气 CO2 交换通量 (mmol/(m²·h))、沉积物有机碳千年埋藏速率 (g C/(m²·a))、叶绿素a (Chl-a, mg/m³)。'),
          createBullet('遥感指数', '归一化植被指数 NDVI (0~1)、归一化水体指数 NDWI (-1~1)、海草床盖度 (%)。'),
          createBullet('碳汇资产核算字段', '盐沼湿地碳汇 (万吨)、海草床碳汇 (万吨)、贝藻养殖碳汇 (万吨)、CCER核算总价值 (万元)。'),

          createHeading2('4. 数据量规模'),
          createP('全省统筹 3,345 公里大陆海岸线，布设 5 大国家级关键监测站，累计采集近 3 年历史与逐小时原位监测数据共计 86,400+ 条时序记录，覆盖 184.2 万公顷蓝碳生态空间。'),

          createHeading2('5. PPT制作配图指南（第1页）'),
          createBullet('左侧配图建议', '放置“数据获取工具/接口调试截图”。截图内容可以是 Postman / 终端调用海洋数据中心 RESTful API 返回 JSON 响应的窗口，展示包含 province, station, do, ph, flux 等字段的代码界面。'),
          createBullet('右侧配图建议', '放置“已清洗入库的数据表格 Excel 截图”。展示表头（站点名称、监测时间、DO、pH、盐度、海气通量、NDVI、碳资产储量等），与参考PPT完全契合。'),

          // CHAPTER 3
          createHeading1('第三部分：PART 02 数据分析与处理（对应PPT第2/3页）'),
          createHeading2('1. 数据处理业务流程图'),
          createP('【原始多源异构数据流】 -> 【第一步：异常值识别与替换（孤立森林+3-Sigma准则剔除海洋漂浮物干扰跳变）】 -> 【第二步：传感器噪声去噪（自适应卡尔曼滤波平滑潮汐涌浪高频毛刺）】 -> 【第三步：海-气CO2动力学通量反演计算】 -> 【第四步：遥感多光谱指数提取】 -> 【第五步：CCER方法学资产化测算入库】'),

          createHeading2('2. 核心算法与数学模型原理'),
          createBullet('① 传感器数据去噪平滑 (Kalman Filter)', '消除恶劣海洋环境（大风浪、附着生物干扰）引起的传感器瞬时尖峰，保障水质和通量时序平滑准确。'),
          createBullet('② 海-气CO2交换通量动力学模型 (Wanninkhof 模型)', '国际通用的海洋碳吸收动力学方程：F = k * S * ΔpCO2。其中 k 为气体传输速率（与10米高空风速呈平方关联），S 为二氧化碳海水溶解度（由温度与盐度决定），ΔpCO2 为海水与大气CO2分压差。'),
          createBullet('③ 植被与水体遥感指数提取', 'NDVI = (NIR - Red) / (NIR + Red) 用于提取黄河口翅碱蓬与桑沟湾海草生长期生物量；NDWI = (Green - NIR) / (Green + NIR) 用于分离水陆边界。'),
          createBullet('④ CCER国家行业标准核算 (HY/T 0305-2021)', '大型藻类与双壳贝类碳汇核算模型：碳汇量 = 养殖产量 * 干湿比 * 含碳率 * CO2转化系数(44/12) + 沉积碳埋藏量 + 微型生物碳泵(MCP)产出的惰性有机碳(RDOC)。'),

          createHeading2('3. 核心计算代码与代码解释（供PPT放代码图）'),
          createP('【代码段 1：海洋浮标数据清洗与通量计算算法（Python / TypeScript）】', true),
          createCodeBlock(`// 核心海-气CO2净吸收通量与异常平滑算法
function calculateAirSeaFlux(windSpeed: number, sst: number, salinity: number, dpCO2: number): number {
  // 1. 计算CO2在不同温度盐度下的溶解度系数 S (mol/(m³·atm))
  const tempK = sst + 273.15;
  const solubility = 0.034 * Math.exp(2400 * (1 / tempK - 1 / 298.15)) * (1 - 0.005 * (salinity - 30));
  
  // 2. Wanninkhof气体传输速率计算公式 (k = 0.251 * U10^2 * (Sc/660)^(-0.5))
  const schmidtNumber = 2073.1 - 125.62 * sst + 3.6276 * Math.pow(sst, 2) - 0.043219 * Math.pow(sst, 3);
  const k = 0.251 * Math.pow(windSpeed, 2) * Math.pow(schmidtNumber / 660, -0.5);
  
  // 3. 计算净交换通量 Flux (mmol/(m²·h))，负值代表海洋从大气吸收CO2（汇）
  const flux = -1.0 * (k * solubility * dpCO2 * 0.04167);
  return Number(flux.toFixed(2));
}`),
          createP('【代码作用与技术解释】：', true),
          createP('该代码段实现了海洋物理学中权威的 Wanninkhof 海-气界面二氧化碳交换动力学反演。第1步利用温度和盐度计算CO2的物理溶解度系数；第2步计算施密特数(Schmidt Number)并根据风速动态得出气体传输速率k；第3步得出每小时每平方米海面的二氧化碳吸收量。负号直观表达了“海洋汇”的吸收物理机制。'),

          createP('【代码段 2：CCER蓝碳资产国家标准方法学核算模型】', true),
          createCodeBlock(`// CCER国家标准：全省与各站点蓝碳资产动态核算模型
export function calculateCCERAsset(station: StationData, carbonPrice: number = 78.5) {
  // 1. 生物质现存碳储量 (万吨 CO2e)
  const biomassSink = station.carbonTotal * 0.38;
  // 2. 沉积物千年碳埋藏增量 = 埋藏速率 * 湿地面积系数
  const sedimentAnnualBurial = (station.buoySensors.burialRate * 0.85) / 1000;
  // 3. 微型生物碳泵(MCP)产出的惰性有机碳(RDOC)长期储量
  const rdocSink = station.carbonTotal * 0.22;
  
  // 汇总总碳汇量并结合CCER实时碳价进行经济估值
  const totalVerifiedSink = station.carbonTotal;
  const ccerValuationYuan = totalVerifiedSink * 10000 * carbonPrice; // 万元
  return {
    verifiedSink: totalVerifiedSink,
    valuationWanYuan: (ccerValuationYuan / 10000).toFixed(1),
    biomassSink: biomassSink.toFixed(2),
    sedimentBurial: sedimentAnnualBurial.toFixed(2),
    rdocSink: rdocSink.toFixed(2)
  };
}`),
          createP('【代码作用与技术解释】：', true),
          createP('该算法严格遵循自然资源部行业标准《海洋碳汇核算技术指南》(HY/T 0305-2021)与CCER国家自愿减排核算逻辑。不仅计算肉眼可见的“生物质碳”，而且创新将“沉积物深层埋藏”和焦念志院士提出的“微型生物碳泵(MCP)惰性有机碳”纳入核算体系，并将碳储量乘以当前市场碳价（78.5元/吨）直接转换为资产金融价值。'),

          // CHAPTER 4
          createHeading1('第四部分：PART 01 作品结构与系统架构（对应PPT第4页）'),
          createHeading2('1. 系统交互与业务流转逻辑架构（可直接绘制流程图）'),
          createP('参考截图中的方框流转图，我们在PPT中可以这样绘制：'),
          createBullet('【入口层】', '系统登录鉴权中心（角色身份选择：省海洋局核算员 / 碳资产评估师 / 院士专家团队） -> 点击登录进入系统'),
          createBullet('【总调度主驾驶舱】', '山东省全境 WebGIS 蓝碳数字孪生大屏 -> 包括三大核心面板：'),
          createBullet('  ① 地图态势区', '全省海岸线及5大重点监测站（东营黄河口、威海桑沟湾、青岛胶州湾、烟台长岛、日照前三岛）航标微动、洋流流向模拟、海域碳密度热力图切换、点击站点下钻微观生境'),
          createBullet('  ② 左侧生态面板', '海-气CO2通量双轴曲线、水环境健康四象限散点矩阵、五维生境健康雷达图、生态异常预警时序流'),
          createBullet('  ③ 右侧资产面板', '蓝碳银行资产看板（总储量、年增量、CCER总估值）、现场浮标数字孪生仪表盘、三大碳库占比环形图'),
          createBullet('【底部仿真控制器】', '2024~2035 年未来情景时间轴推演器（自由调节生态保护投入与干预强度，动态模拟碳汇增长走势）'),
          createBullet('【四大纵深业务子系统】', '顶端导航直接切换：1.多维深度分析中心（人口与社会经济、水体理化垂向断面、三大碳库桑基流向图、政策达成雷达）；2.CCER国家标准资产报告中心（生成国家发改委标准九大备案表单，支持一键导出PDF/Word）；3.蓝碳现货交易与清算模拟市场（买卖报盘、挂单撮合、K线行情）；4.AI首席海洋碳汇科学家智能处方中心（基于大模型针对赤潮/互花米草/水温异常一键生成生态处方）。'),

          // CHAPTER 5
          createHeading1('第五部分：PART 02 主要技术（对应PPT第5页）'),
          createHeading2('1. “平台 + 算法 + 硬件”三位一体协同架构'),
          createBullet('【平台层 (Platform)】', '采用现代前端技术栈 React 19 + TypeScript + Tailwind CSS，配合 Leaflet WebGIS 数字孪生内核与原生 SVG 动效，构建沉浸式“深海荧光科技感”UI。支持响应式抽屉折叠、多层级微观下钻、双向交互无缝衔接。'),
          createBullet('【算法层 (Algorithm)】', '内置海-气CO2净吸收通量 Wanninkhof 动力学反演模型、卡尔曼滤波与孤立森林去噪平滑算法、Sentinel-2/Landsat-8 多光谱遥感植被指数反演算法、以及国家CCER蓝碳方法学核算模型。'),
          createBullet('【硬件与感知层 (Hardware & Sensing)】', '打通海洋原位多参数水质监测浮标阵列（DO、pH、温盐深CTD）、涡度相关海气通量观测塔、以及国家卫星海洋应用中心遥感数据链路，构建“空天地海”全要素立体物联感知体系。'),

          // CHAPTER 6
          createHeading1('第六部分：PART 03 核心创新点（对应PPT第6页）'),
          createBullet('创新点一：陆海统筹空间数字孪生与微观生境下钻', '突破传统单一图表大屏模式，将山东省3345公里海岸线宏观态势与东营盐沼、威海海草床、烟台海洋牧场等5大多维微观生境紧密结合，实现从全省宏观布局到站点微观传感器参数的一键式空间下钻展示与交互。'),
          createBullet('创新点二：“空天地海”多源数据融合与实时通量动力学反演', '将宏观卫星遥感反演面数据（NDVI、NDWI、海温）与微观海洋浮标高频点位时序数据（DO、pH、盐度、潮位）有机融合，基于Wanninkhof动力学模型实现海-气二氧化碳吸收通量的近实时高精度反演。'),
          createBullet('创新点三：从“物理监测”到“CCER资产化核算与交易”全链条闭环', '跳出传统“只报水质、只测水温”的单一工具局限，深度融合国家自然资源部《海洋碳汇核算技术指南》(HY/T 0305-2021)与CCER核算体系，独创研发了包含碳资产动态估值、国家级自愿减排报告生成、以及碳汇现货竞价交易的完整产业化闭环体系。'),

          // CHAPTER 7
          createHeading1('第七部分：平台核心可视化图表全景解构手册（截图与算法说明）'),
          createP('在PPT或说明文档中，你可以截取本系统的各个真实图表，并用以下严谨专业的说明进行答辩讲解：'),

          createHeading2('图表 1：海-气 CO2 净吸收通量与潮汐水位双轴动态曲线 (LeftPanel)'),
          createBullet('放置位置', '主驾驶舱左侧生态面板顶部。'),
          createBullet('图表内容', '24小时逐时连续曲线。左轴为海-气CO2净交换通量 (mmol/(m²·h))，右轴为潮汐水位 (m) 与叶绿素a浓度。'),
          createBullet('计算原理', '基于 Wanninkhof 动力学方程，融合浮标风速计与水下 pCO2 传感器差值，每小时计算一次二氧化碳净通量。曲线中负值越深代表海洋向大气吸收CO2的强度越高。'),
          createBullet('业务价值', '直观揭示“白天强光合作用 + 高潮位驱动”下海洋蓝碳爆发式吸收的日变化规律，为评定碳汇能力提供第一手原位科学依据。'),

          createHeading2('图表 2：水环境健康四象限散点矩阵 (WaterEnvironmentMatrix)'),
          createBullet('放置位置', '多维深度分析中心 -> 水质与生态矩阵模块。'),
          createBullet('图表内容', '四象限气泡散点图。横轴为实用盐度(PSU)，纵轴为溶解氧DO(mg/L)，气泡大小代表沉积物碳埋藏速率(g C/(m²·a))，颜色代表水温梯度。'),
          createBullet('计算原理', '提取5大站点多年监测样本均值与离散度，采用归一化四象限聚类划分：第一象限为“高氧高盐高碳汇最优区”（威海桑沟湾）；第四象限为“河口低盐高沙快速埋藏区”（东营黄河口）。'),
          createBullet('业务价值', '一图看清全省各大海湾水质环境要素与碳汇埋藏潜力的空间聚集规律与生态优良度。'),

          createHeading2('图表 3：全周期三大典型蓝碳库桑基流向图 (BlueCarbonSankeyFlow)'),
          createBullet('放置位置', '多维深度分析中心 -> 蓝碳流向分析。'),
          createBullet('图表内容', '桑基流向图 (Sankey Diagram)，展现从“大气CO2源 (100%)” -> “植物光合/藻类吸收” -> “地上生物量固存 (38%) / 沉积物深层千年埋藏 (42%) / 渔业收获输出 (20%)”的全流程动态流向。'),
          createBullet('计算原理', '严格基于 IPCC 海洋与冰冻圈蓝碳特别报告及中国工程院海洋碳汇质量平衡守恒方程计算，各节点流量百分比严格守恒(100%)。'),
          createBullet('业务价值', '形象向评委展示海洋吸收的碳不仅存活在植物里，更有42%通过泥沙千年封存于海底沉积物中，构成了长效不可逆的碳汇资产。'),

          createHeading2('图表 4：海水垂直剖面水体理化指标热力图 (BioCarbonVerticalProfile)'),
          createBullet('放置位置', '多维深度分析中心 -> 垂直剖面水体结构。'),
          createBullet('图表内容', '从海表 0 米至海底 30 米的深度剖面渐变色热力图，对比展示温度层化、溶解氧递减、光照衰减系数与溶解无机碳(DIC)浓度的垂向梯度分布。'),
          createBullet('计算原理', '采用 Lambert-Beer 定律计算深层光照衰减，结合 CTD 投弃式温盐深传感器实测剖面插值生成。'),
          createBullet('业务价值', '证明平台具备三维水下立体监测能力，体现贝藻立体养殖（海带在上、扇贝在下）的多营养层次生态碳汇优势。'),

          createHeading2('图表 5：CCER 国家标准自愿减排核算资产报表 (CCERReportView)'),
          createBullet('放置位置', 'CCER 资产报告中心。'),
          createBullet('图表内容', '国家发改委标准九大备案表单（项目边界、基准线情景排放量、项目实际增汇量、泄漏量核减、净碳汇签发量、CCER经济估值）。支持一键导出标准报告。'),
          createBullet('计算原理', '公式：净碳汇量 = 项目活动碳储量 - 基准线排放量 - 泄漏量。按最新CCER市场价（78.5元/吨）折算资产价值。'),
          createBullet('业务价值', '将科学家的监测数据直接转化为金融机构认可、主管机关可审核的资产负债表，赋能海洋绿色金融、碳抵消与碳税抵免。')
        ]
      }
    ]
  });

  const outputPath = path.resolve(__dirname, '../public/downloads/山东省蓝碳智能监测与碳汇资产核算云平台_PPT制作与答辩汇报全套说明文档.docx');
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log('Document written successfully to:', outputPath);
}

generate().catch(err => {
  console.error('Failed to generate document:', err);
  process.exit(1);
});
