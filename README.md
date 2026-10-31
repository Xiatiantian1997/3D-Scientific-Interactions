# 科学交互

用于触摸屏科学讲义的创作方法与 HTML 示例。重点是看懂结构、变化和因果条件，避免靠大段说明补救含义不清的图。

## 直接使用

打开 `index.html` 查看目录；在本地运行 `python3 -m http.server 8000` 后访问浏览器也可以。所有示例均为独立 HTML，无需 npm、账号或 API 密钥。GitHub 的文件页只显示源码，不会直接运行交互；本仓库没有自动开启公开托管。

## 当前示例

| 文件 | 内容 | 状态 |
|---|---|---|
| [CVD 三维结构](examples/cvd-structure-3d.html) | 炉壳、石英管、晶舟、端盖的旋转与拆解 | 新增教学结构模型 |
| [CVD 设备总览](examples/cvd-furnace.html) | 进气、加热、控压与抽气关系 | 结构示意 |
| [CVD 沟槽成膜](examples/cvd-trench-growth.html) | 口部收窄、封口与残留空腔；迁移/再发射区分 | 形貌趋势构造，非配方预测 |
| [硅烷成膜](examples/silane-cvd-motion.html) | 宏观输运、微观反应、成核与早期覆盖 | 表面机制经过简化 |
| [晶体缺陷](examples/crystal-layer-labels.html) | 点线面体缺陷、同位置比较、堆垛标签 | 当前缺陷示例 |
| [PN 结](examples/pn-junction-lesson.html) | 结区关系教学 | 既有试作 |

`archive/` 保留此前版本供回溯，包含用户已指出的问题，不能作为推荐模板照搬。

## 创作入口

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

这是可复用的创作方法和教学示例集，不是通用工艺仿真平台。没有启用第三方统计、外部请求或公开部署。三维设备参考 Anatomy 的表达方法，使用独立实现；见 [结构说明](docs/cvd-structure.md)。现有个人“科学交互”skill 的安装版本未在本次修改，新增规则保存在仓库规范中。
