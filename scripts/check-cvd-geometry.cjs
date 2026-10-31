// A focused geometric/state smoke test. This is not a CAD collision audit.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
let html=fs.readFileSync(path.join(__dirname,'../fragments/cvd-structure-3d.html'),'utf8');
let js=html.match(/<script>([\s\S]*?)<\/script>/)[1];
js=js.replace('render();requestAnimationFrame(tick);','globalThis.test={offsets,model,project,rasterDepth,set(p,a){progress=p;az=a}};render();requestAnimationFrame(tick);');
const context=new Proxy({},{get:(t,k)=>t[k]||(()=>{}),set:(t,k,v)=>(t[k]=v,true)});
context.createImageData=(w,h)=>({data:new Uint8ClampedArray(w*h*4)});let output;context.putImageData=img=>output=img.data;
const els={};function el(s){return els[s]||(els[s]={style:{},clientWidth:320,clientHeight:290,getContext:type=>type==='webgl'?null:context,addEventListener(){},setAttribute(){},value:0,textContent:''})}
const root={querySelector:el,querySelectorAll:()=>[]};
let sandbox={document:{getElementById:()=>root,hidden:false,addEventListener(){}},devicePixelRatio:1,matchMedia:()=>({matches:false}),ResizeObserver:class{observe(){}},IntersectionObserver:class{observe(){}},requestAnimationFrame(){}};
vm.createContext(sandbox);vm.runInContext(js,sandbox);let maxfaces=0;
for(let p of [0,.2,.4,.52,.66,.77,1])for(let a of [-Math.PI,-1,0,1,Math.PI]){
 sandbox.test.set(p,a);const f=sandbox.test.model();maxfaces=Math.max(maxfaces,f.length);
 for(let face of f)for(let v of face.v){if(!v.every(Number.isFinite))throw Error('nonfinite vertex');if(!sandbox.test.project(v,320,290).every(Number.isFinite))throw Error('nonfinite projection')}
 const o=sandbox.test.offsets(p);if(o.boat>0&&o.door<5.59)throw Error('boat before door');if(o.tube>0&&o.hood<3.19)throw Error('tube before hood clearance');
 const wafer=f.filter(x=>x.col[0]===66);const xs=wafer.flatMap(x=>x.v.map(v=>v[0]));if(Math.abs(Math.max(...xs)-Math.min(...xs)-4.85)>1e-8)throw Error('wafer group deformed');
}
console.log('35 pose/angle checks passed; fixed wafer span; staged separation; finite mesh/projections. Faces:',maxfaces);

// Crossing depths must resolve per pixel, independent of triangle submission order.
const tri=(z,c)=>[-.9,-.9,z[0],...c,.9,-.9,z[1],...c,0,.9,z[2],...c];
const a=tri([-.6,.6,0],[1,0,0]),b=tri([.2,.2,.2],[0,0,1]);
sandbox.test.rasterDepth([...a,...b],40,40);const first=Array.from(output);
sandbox.test.rasterDepth([...b,...a],40,40);
if(first.some((v,i)=>v!==output[i]))throw Error('depth depends on submission order');
if(!first.some((v,i)=>i%4===0&&v===255)||!first.some((v,i)=>i%4===2&&v===255))throw Error('crossing depths not resolved');
console.log('Crossing triangle depth test passed in both submission orders.');
