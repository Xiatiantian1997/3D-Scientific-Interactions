# 前端交互：从 Wodniack 到教学表达
研究日期：2026-10-31

## 看了什么
- [JIEJOE 视频](https://www.bilibili.com/video/BV1BTP5euE75/)：总长 5:10；实际打开全部 6 张联系图、21 张采样画面（0:00–5:00，每 15 秒），另查 4:00 原图。读取画面字幕，未转写音频；不能据此声称逐帧研究过所有缓动。
- [Wodniack 原站](https://wodniack.dev/)：浏览器查看首页和 Work 导航/滚动状态；不包含手机真机测试或完整站点源码审计。
- [作者 SVG CodePen](https://codepen.io/wodniack/pen/abeMZXQ) 与 [JIEJOE 简化实现](https://github.com/JIEJOE-WEB-Tutorial/016-wavy-lines)：核对来源并阅读后者 HTML 源码。没有导入第三方代码、素材或压缩包。
- Nod Coding 仅读取当前页面，未验证其交互；In Pieces 页面读取超时，关于它只记录视频画面。

## 视频中值得迁移的方法
| 时间 | 画面证据 | 本项目迁移判断 |
|---|---|---|
| 0:30–0:45、4:00 | 可受指针扰动的密集曲线；4:00 显示 SVG 多路径版本 | 让图形本身成为操作对象；曲线含义必须由模型定义，不能把装饰波纹当电场或流场 |
| 1:15–1:30 | 滚动时 WORK 字样与作品预览组合变化 | 背景提供定位、主体承载信息；讲义无需复制满屏重复文字 |
| 1:45–2:00、3:15 | 空间透视文字和可拖动元素；字幕提到 CSS transform | 平面层次关系可先考虑 CSS 透视；复杂曲面、遮挡与任意旋转仍使用真正的网格渲染 |
| 2:45–4:00 | 开发者工具与 SVG/CSS 示例 | 先分解图形与输入映射，再选择实现技术；“纯前端”不等于只能做简单按钮，也不等于不能用库 |
| 4:15–4:45 | 眼睛形状、低多边形动物等不同视觉表达 | 外形由表达目标决定；不是所有漂亮变形都有教学意义 |

## 源码阅读：手感从哪里来
JIEJOE 的简化实现把曲线拆成点；指针附近点受到扰动，位移回拉、速度衰减，随后重绘 SVG 路径。这是可调的视觉动力学，不是已验证的物理波动方程。

迁移前需要修正的工程边界（源码审查，未运行该简化版）：
1. 鼠标使用 pageX/pageY，触摸使用 clientX/clientY，再混合 bounding rect 与 scrollY；嵌入滚动讲义时应统一为 client 坐标减 rect，并重新读取位置，避免触点偏移。
2. 固定每帧衰减与位移步长，没有按时间差归一化；不同刷新率可能产生不同手感。科学时间用固定步长积分，观察动画使用经过限制的时间差。
3. 全局监听、持续 requestAnimationFrame；组件移除时应解绑，离屏/静止时停止无用绘制。
4. 单指 touchmove 不等于多指支持。使用 Pointer Events 区分拖动、旋转、缩放，处理取消和手势交接，不能吞掉整页滚动。

这些是对示例用途之外的迁移要求，不是断言作者完整原站存在相同问题。

## 前端能力补充
- [CSS perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/perspective)：为平面元素建立空间透视。可用于层叠材料、平面结构的展开；不把 CSS 当成通用 CAD 引擎。
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)：组织界面属性的时间变化与播放控制。教学状态仍由模型管理，动画只负责呈现。
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)：可将滚动与动画进度关联。适合长页叙事；普通翻页不应偷偷改变物理参数。缓动追赶期间读数需跟随实际显示状态。
- [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)：统一触摸、鼠标与笔；限定操作区域、处理 pointercancel、pointer capture 和 touch-action。
- [web.dev 动画性能](https://web.dev/articles/animations-guide)：界面位移优先 transform；需要变形时再更新几何。避免无目的布局重排；不要预先给所有元素加 will-change。
- [减少动态效果](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)：保留内容与可操作性，减少非必要运动，不把关闭装饰等同于关闭学习功能。

## 平台采用建议
采用“对象直接操作、连续映射、可中断恢复、按理解需要选择表示”四项能力；不固定一种配色或动效。

二维关系优先 SVG；平面层叠可以使用 CSS 透视；大量对象或真正空间遮挡使用 Canvas/WebGL。三者都是前端，按任务组合，不规定越立体越高级。

装饰弹性只用于操作反馈；表示真实物理量的曲线和速度必须由对应模型计算。对数值比较保持尺度，对对象变换保持身份，对观察操作保留回退。

本轮交付是研究与采用建议；未修改现有交互运行代码，也未把尚未实测的方法冒充通用组件。
