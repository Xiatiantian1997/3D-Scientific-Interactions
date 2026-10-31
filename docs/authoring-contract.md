# 创作约定：写在实现之前

## 最小工作材料

在项目目录维护一份 `interaction-contract.json`，用于交互作品；仅解释知识或修改框架本身时，不强制虚构作品记录。文件属于作者材料，不展示为学习者表单，不要求用户填写。

必填键及用途：
- `version`：固定为 `3.0`。
- `goal`：操作后应能解释的一件事。
- `model`：`assumptions`（边界/示意）、`evidence`（实际读到的依据，不编造）。
- `states`：每项 `id`、`meaning`；包含初始、基准、目标及有独立语义的过渡/观察状态。
- `encodings`：每项 `scope`、`channel`、`token`、`role`、`meaning`。同一作品默认共用一个scope；只有明确不同表示模式才分开，并在说明中记录切换方式。
- `actions`：每项 `id`、`kind`、`changes` 字符串数组、`fixed` 字符串数组、`feedback`。kind 取 `model`、`compare`、`time`、`construct`、`observe`、`inspect`。
- `comparison`：`required` 布尔值；需要时填写 `baseline`、`target`（states中的ID）、`action`（compare动作ID）、`fixed` 非空数组、`placement`（可见入口位置）；不需要时填写具体 `reason`。
- `preserved`：每项 `feature`、`status`（`retained` 或 `changed_with_reason`）、`evidence`。首次创作可空；改版把用户已认可的能力逐项列入，改变时解释任务依据。
- `checks`：每项 `area`、`status`、`evidence`。area 至少包含 `model`、`semantics`、`interaction`、`layout`、`host`；status 为 `tested`、`reviewed` 或 `pending`。不得把源码阅读填作设备实测。

最小格式片段（字段示例，不是可直接通过的完整记录）：

```json
{
  "encodings": [{"scope":"lesson","channel":"atom.fill","token":"species-silicon","role":"identity","meaning":"硅元素身份"}],
  "actions": [{"id":"rotate","kind":"observe","changes":["camera"],"fixed":["atom_positions","atom_count"],"feedback":"只改变投影，结构不变"}]
}
```

`role` 取 `identity`、`state`、`quantity`、`relation`、`attention`、`observer`。token 是主题语义令牌，另在实现中唯一映射到实际色值/线型。不能把同一金色写成两个token从而绕开检查，实际画面仍须核对。actions 的 changes/fixed 不能重叠；观察动作固定模型变量。

## 科学模型附记

在同一工作材料旁写清自由输入、固定条件、系统状态、派生量和依赖；引用材料、实验条件、单位、初始/边界条件。涉及化学时记录元素/物质收支，涉及示踪时记录一标记代表多少或仅代表采样。未校准模型不得输出仿佛工厂配方的精确温度、速率和覆盖率。

## 基准与已有能力

“正常”必须是明确基准，不能等同“把金色变蓝”。比较保持相机、尺度、光照和非干预变量，涉及生成/移除原子说明外部物质库或仅作结构对照。必要时允许有理由的相机变化，但不能用它制造前后差异。

已有交互被认可后，记录用户认可的动作及结果，不只记录控件名称。例如：同位置正常/缺陷对照、可追踪换位、虚影标记基准、三维旋转。改版至少复查这些能力，不因统一UI而退回静态图。

## 实现职责

ContentModel 负责约束与科学状态；InteractionState 负责合法动作和可中断的过渡；Representation 从统一状态渲染含义；Theme 只映射样式；HostAdapter 负责触摸/尺寸/嵌入。无需引入大型框架，但不得用主题色反推对象类型，或由图形坐标私自改变模型。

约定检查器只检查字段、已声明的编码冲突、引用与动作一致性。科学合理性、视觉误读与保留清单是否漏项，必须对照来源、实际画面及用户反馈检查。
