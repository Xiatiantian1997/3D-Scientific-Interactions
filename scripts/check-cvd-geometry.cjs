// A focused geometric/state smoke test. This is not a CAD collision audit.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
let html=fs.readFileSync(path.join(__dirname,'../fragments/cvd-structure-3d.html'),'utf8');
let js=html.match(/<script>([\s\S]*?)<\/script>/)[1];
js=js.replace('render();requestAnimationFrame(tick);','globalThis.test={offsets,model,project,set(p,a){progress=p;az=a}};render();requestAnimationFrame(tick);');
const context=new Proxy({},{get:(t,k)=>t[k]||(()=>{}),set:(t,k,v)=>(t[k]=v,true)});
const els={};function el(s){return els[s]||(els[s]={style:{},clientWidth:320,clientHeight:290,getContext:()=>context,addEventListener(){},setAttribute(){},value:0,textContent:''})}
const root={querySelector:el,querySelectorAll:()=>[]};
let sandbox={document:{getElementById:()=>root,hidden:false},devicePixelRatio:1,matchMedia:()=>({matches:false}),ResizeObserver:class{observe(){}},IntersectionObserver:class{observe(){}},requestAnimationFrame(){}};
vm.createContext(sandbox);vm.runInContext(js,sandbox);let maxfaces=0;
for(let p of [0,.2,.4,.52,.66,.77,1])for(let a of [-Math.PI,-1,0,1,Math.PI]){
 sandbox.test.set(p,a);const f=sandbox.test.model();maxfaces=Math.max(maxfaces,f.length);
 for(let face of f)for(let v of face.v){if(!v.every(Number.isFinite))throw Error('nonfinite vertex');if(!sandbox.test.project(v,320,290).every(Number.isFinite))throw Error('nonfinite projection')}
 const o=sandbox.test.offsets(p);if(o.boat>0&&o.door<4.59)throw Error('boat before door');if(o.tube>0&&o.hood<2.55)throw Error('tube before hood clearance');
 const wafer=f.filter(x=>x.col[0]===66);const xs=wafer.flatMap(x=>x.v.map(v=>v[0]));if(Math.abs(Math.max(...xs)-Math.min(...xs)-5.05)>1e-8)throw Error('wafer group deformed');
}
console.log('35 pose/angle checks passed; fixed wafer span; staged separation; finite mesh/projections. Faces:',maxfaces);
