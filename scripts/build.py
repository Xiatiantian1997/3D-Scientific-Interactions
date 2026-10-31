"""Build offline standalone pages from the same fragments used in chat previews."""
from pathlib import Path
from html import escape
ROOT=Path(__file__).resolve().parents[1]
TITLES={'cvd-structure-3d':'CVD 三维结构','cvd-furnace':'CVD 设备总览','cvd-trench-growth':'CVD 沟槽成膜','silane-cvd-motion':'硅烷成膜','crystal-layer-labels':'晶体缺陷','pn-junction-lesson':'PN 结'}
CSS='''
:root{--background:#f6f3e7;--foreground:#293f46;--card:#fffcf3;--card-foreground:#293f46;--muted:#e2e2d7;--muted-foreground:#647477;--border:#d6d8cc;--primary:#477d84;--primary-foreground:#fff;--blue:#477d84;--orange:#af9060;--viz-series-1:#477d84;--viz-series-2:#af9060;--viz-series-3:#7f8e72;--font-size-base:16px}
*{box-sizing:border-box}body{margin:0;background:var(--background);color:var(--foreground);font:16px/1.65 system-ui,sans-serif}main{max-width:980px;margin:auto;padding:20px 12px}h1,h2,h3{line-height:1.35}a{color:#326b76}button,input,select{font:inherit}button{cursor:pointer}button:focus-visible,a:focus-visible{outline:3px solid #af9060;outline-offset:3px}.btn{min-height:44px;padding:9px 14px;border:1px solid var(--border);background:var(--card);color:var(--foreground);border-radius:12px}.btn[aria-pressed=true],.btn-primary{background:var(--primary);color:var(--primary-foreground)}.viz-controls,.viz-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.text-small{font-size:13px}.text-muted{color:var(--muted-foreground)}.form-range{min-height:44px;accent-color:var(--primary)}.form-label{display:block}.card{background:var(--card);padding:16px;border-radius:16px}hr{border:0;border-top:1px solid var(--border);margin:24px 0}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.back{display:inline-block;margin:0 0 16px;min-height:44px;padding:8px}.archive-note{padding:12px;background:#e9ddbd}.nav{display:flex;gap:8px;flex-wrap:wrap}
'''
def page(title,content):
 return '<!doctype html>\n<html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escape(title)+'</title><style>'+CSS+'</style><main>'+content+'</main></html>\n'
for p in (ROOT/'fragments').rglob('*.html'):
 old=p.parent.name=='archive';dest=ROOT/('archive' if old else 'examples')/p.name;dest.parent.mkdir(exist_ok=True)
 title=TITLES.get(p.stem,p.stem);note='<div class="archive-note">历史试作：保留用于回溯，不作为推荐版本。</div>' if old else ''
 dest.write_text(page(title,'<a class="back" href="../index.html">← 返回目录</a>'+note+p.read_text()))
links=''.join('<li><a href="examples/'+name+'.html">'+title+'</a></li>' for name,title in TITLES.items())
ROOT.joinpath('index.html').write_text(page('科学交互','<h1>科学交互</h1><p>先看懂，再操作。独立示例与可复用的创作方法。</p><ul style="line-height:3">'+links+'</ul><p>模型适用范围见各示例说明。源代码与创作规范在仓库中；无需外部依赖。</p>'))
print('Built',len(list((ROOT/'examples').glob('*.html'))),'examples and',len(list((ROOT/'archive').glob('*.html'))),'historical pages')
