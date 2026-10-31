// Execute the real input handlers and clock, with rendering replaced for deterministic checks.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let js=fs.readFileSync(require('node:path').join(__dirname,'../fragments/cvd-structure-3d.html'),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
js=js.replace('render();requestAnimationFrame(tick);','render=()=>{dirty=false};globalThis.api={tick,project,state:()=>({az,el,zoom,progress,touring})};requestAnimationFrame(tick);');
function fixture(){const els={},events={};const q=s=>els[s]||(els[s]={value:0,style:{},getContext:()=>null,addEventListener(n,f){events[n]=f},setPointerCapture(){},setAttribute(){}});let visibility,intersection;
const doc={hidden:false,getElementById:()=>({querySelector:q,querySelectorAll:()=>[]}),addEventListener(n,f){visibility=f}};
const env={document:doc,matchMedia:()=>({matches:false}),ResizeObserver:class{observe(){}},IntersectionObserver:class{constructor(f){intersection=f}observe(){}},requestAnimationFrame(){}};
vm.createContext(env);vm.runInContext(js,env);return{api:env.api,q,events,hide(v){doc.hidden=v;visibility()},intersect(v){intersection([{isIntersecting:v}])}}}
for(const step of [1000/120,1000/60,100,250]){const f=fixture();f.q('#cvd-explode').oninput({target:{value:0}});f.q('.tour').onclick();f.api.tick(0);for(let t=step;t<6000;t+=step)f.api.tick(t);f.api.tick(6000);assert.ok(Math.abs(f.api.state().progress-1)<1e-9,'duration depends on frame rate')}
const f=fixture();f.q('#cvd-explode').oninput({target:{value:0}});f.q('.tour').onclick();f.api.tick(0);f.api.tick(1500);assert.equal(f.api.state().progress,.25);f.hide(true);f.api.tick(10000);f.hide(false);f.api.tick(20000);assert.equal(f.api.state().progress,.25);f.api.tick(21500);assert.equal(f.api.state().progress,.5);f.q('.tour').onclick();f.api.tick(25000);assert.equal(f.api.state().progress,.5);
f.q('#cvd-explode').oninput({target:{value:0}});
const event=(x,y)=>({pointerId:1,clientX:x,clientY:y});
for(const [dx,dy] of [[-12,0],[12,0],[0,-12],[0,12]]){f.q('.reset').onclick();const a=f.api.state().az;const near=[Math.sin(a),Math.cos(a),2.25];const before=f.api.project(near,500,400);f.events.pointerdown(event(100,100));f.events.pointermove(event(100+dx,100+dy));const after=f.api.project(near,500,400);assert.ok(dx?(after[0]-before[0])*dx>0:(after[1]-before[1])*dy>0,'front surface must follow finger');f.events.pointerup(event(100+dx,100+dy))}
f.q('.reset').onclick();const a=f.api.state().az;f.q('.rotate').onclick();assert.ok(f.api.state().az>a);f.q('.rotate-right').onclick();assert.equal(f.api.state().az,a);
console.log('Motion passed: 120/60/10/4 fps = 6 seconds; hidden-time exclusion; pause; four drag directions and buttons.');
