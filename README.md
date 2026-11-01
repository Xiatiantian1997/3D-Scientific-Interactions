# 3D Scientific Interactions

三维科学交互 · 设备结构、空间关系与可追踪拆装。

本仓库今后以三维交互为主，用于触摸屏科学讲义的创作方法与 HTML 示例。重点是看懂结构、变化和因果条件，避免靠大段说明补救含义不清的图。


## 开放创作框架 3.1

范例可引用、改编、组合，也允许新的表达方式；它们不是固定题型。科学约束、视觉含义和验证诚实是底线，UI与布局是可调整的默认做法。多模型可同页独立使用、共享同一状态，或按明确接口耦合。新形式说明缺口、做最小样例并验证，详见[开放创作规则](docs/platform-policy.md)。

## 直接使用

打开 `index.html` 查看目录；在本地运行 `python3 -m http.server 8000` 后访问浏览器也可以。`examples/`中的示例为独立 HTML，无需 npm、账号或 API 密钥。GitHub 的文件页只显示源码，不会直接运行交互；本仓库没有自动开启公开托管。

## 仓库分工

- 本仓库：三维结构、旋转缩放、装配拆解、空间遮挡与材质。
- 二维仓库：曲线、波、场、参数联动、过程动画与基准比较。
- 共同遵守对象身份稳定、因果条件明确、触摸优先和可中断动画规则。二维与三维需要联动时，按完整教学问题组织，不强行拆开。
- 早期混合示例暂保留原路径，避免已有讲义失效；本次只调整定位和名称，不宣称已经完成迁移。

## 当前示例

| 文件 | 内容 | 状态 |
|---|---|---|
| [CVD 三维结构](examples/cvd-structure-3d.html) | 炉壳、石英管、晶舟、端盖的旋转与拆解 | 用户认可的结构交互参考 |
| [CVD 设备总览](examples/cvd-furnace.html) | 进气、加热、控压与抽气关系 | 结构示意 |
| [CVD 沟槽成膜](examples/cvd-trench-growth.html) | 口部收窄、封口与残留空腔；迁移/再发射区分 | 形貌趋势构造，非配方预测 |
| [硅烷成膜](examples/silane-cvd-motion.html) | 宏观输运、微观反应、成核与早期覆盖 | 表面机制经过简化 |
| [晶体缺陷](examples/crystal-layer-labels.html) | 点线面体缺陷、同位置比较、堆垛标签 | 当前缺陷示例 |
| [PN 结](examples/pn-junction-lesson.html) | 结区关系教学 | 既有试作 |

`archive/` 保留此前版本供回溯，包含用户已指出的问题，不能作为推荐模板照搬。

## 创作入口

新增 [公开交互方法与三维检查流程](docs/public-methods.md)：按理解困难整理外部参考，区分资料研究、采用建议与尚未完成的实测。

设备与复杂结构优先参考 [结构交互方法](docs/structure-interaction.md)：已记录本次 CVD 实例的有效做法、适用范围和后续必须保留的能力。

1. 阅读 [创作约定](docs/authoring-contract.md)，先写理解目标、模型与基准。
2. 阅读 [深入检查](docs/deeper-model-review.md)，核实术语、竞争机制与条件随过程改变的反馈。
3. 依据 [视觉含义](docs/visual-semantics.md) 确定颜色、对象与运动的唯一含义。
4. 先实现一个完整的操作与反馈闭环，保留已认可的比较能力。
5. 按 [验证约定](docs/validation.md) 检查实际状态，不把结构检查器通过当作科学正确性证明。

运行约定检查：`python3 scripts/validate_contract.py contracts/cvd-equipment.json`。

## 目录

- `examples/`：可直接打开的独立页面。
- `fragments/`：对话内预览源片段，与独立页面保持同源。
- `archive/`：早期版本。
- `docs/`：创作、模型、语义、交互、验证与来源。
- `contracts/`：项目约定和验证范围。
- `scripts/`：独立页生成与约定检查。

## 边界

这是可复用的创作方法和教学示例集，不是通用工艺仿真平台。没有启用第三方统计或公开部署。CVD 三维增强显示会按需加载 jsDelivr 上固定版本的 Three.js；失败时保留基础显示。三维设备参考 Anatomy 的表达方法，使用独立实现；见 [结构说明](docs/cvd-structure.md)。“科学交互”技能与本次开放组合规则同步更新；历史作品不会自动随规则修改。

## 模板与下一轮检查

进入 [模板提炼入口](templates/README.md)，查看候选类型、现有参考与逐例检查表；复制 [模板工作稿](templates/authoring-brief.md) 填写一个教学单元。当前完成的是组织与工作入口，现提供开放选型、组合和扩展规则；模型接入仍需逐例验证。

配套仓库：[2D Scientific Interactions](https://github.com/Xiatiantian1997/2d-scientific-interactions)。二维仓库提供共用隔离宿主与三主题打包器，可用于可信HTML片段；3D固定材质色和缓存渲染仍需适配，不能宣称全部自动换肤。旧作保留兼容路径，不新增无关演示。
