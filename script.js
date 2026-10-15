// ✏️ EDIT THESE: change any reason to your own words!
const reasons = [
  {e:"🤗", t:"You're my first friend", d:"Since we were little, you've been by my side in every game, every laugh and every secret."},
  {e:"🛡️", t:"You protect me", d:"I always feel safe knowing my brother is near. You stand up for me without being asked."},
  {e:"😂", t:"You make me laugh", d:"Nobody can make me giggle like you do, even on my worst days."},
  {e:"🤝", t:"You always support me", d:"You believe in my dreams, even when I doubt them myself."},
  {e:"💛", t:"Your kind heart", d:"You care for everyone around you, and that gentleness makes you truly special."},
  {e:"🌟", t:"You inspire me", d:"Your hard work and courage show me how to keep going and never give up."},
  {e:"🍬", t:"You share everything", d:"From the last sweet to your biggest joys, you always make room for me."},
  {e:"👂", t:"You listen to me", d:"You hear what I don't say out loud, and that means the world to me."},
  {e:"🏡", t:"You make home feel like home", d:"Every memory with you is warm, and our bond makes our family stronger."},
  {e:"♾️", t:"Because you're you", d:"Simply because you are my Lakshman, and I'd choose you as my brother in every lifetime."}
];
const colors = [
  ["#ff4d8d","#ff9a3c"],["#8e2de2","#e66cff"],["#00b4d8","#48e5c2"],["#ff6a00","#ffd000"],["#e6007e","#ff6f91"],
  ["#43cea2","#185a9d"],["#f7418c","#fbb034"],["#7f00ff","#e100ff"],["#fc4a1a","#f7b733"],["#c31432","#ff7eb3"]
];
const flowers = ["🌸","🌺","🌼","🌷","🌻","🌹","💐","🏵️","🌸","🌺"];

const grid = document.getElementById("grid");
const countEl = document.getElementById("count");
let opened = 0;

reasons.forEach((r,i)=>{
  const c = document.createElement("div");
  c.className = "card"; c.tabIndex = 0; c.setAttribute("role","button");
  c.style.setProperty("--c",`linear-gradient(135deg,${colors[i][0]},${colors[i][1]})`);
  c.style.setProperty("--b",colors[i][0]);
  c.style.setProperty("--d",(i*0.3)+"s");
  c.innerHTML = `<div class="inner">
    <div class="face front"><span class="flower">${flowers[i]}</span><span class="num">Reason ${i+1}</span></div>
    <div class="face back"><span class="e">${r.e}</span><h4>${r.t}</h4><p>${r.d}</p></div></div>`;
  const toggle = ()=>{
    const first = !c.dataset.seen;
    c.classList.toggle("open");
    if(first){ c.dataset.seen=1; opened++; countEl.textContent=opened; burst(c);
      if(opened===10){ const f=document.getElementById("finale"); f.classList.remove("hidden");
        setTimeout(()=>{f.scrollIntoView({behavior:"smooth"});for(let k=0;k<150;k++)spawn(true)},900);} }
  };
  c.addEventListener("click",toggle);
  c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle()}});
  grid.appendChild(c);
});

document.getElementById("openBtn").onclick = ()=>{
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("main").classList.remove("hidden");
  for(let k=0;k<80;k++) spawn(true);
};

// 🌸 Falling flower petals
const cv = document.getElementById("petals"), ctx = cv.getContext("2d");
const palette = ["#ff4d8d","#ff9a3c","#ffd000","#c77dff","#ff6f91","#ffffff","#ff5252","#7bdff2"];
let petals = [];
const resize = ()=>{cv.width=innerWidth;cv.height=innerHeight}; resize(); addEventListener("resize",resize);

function spawn(burstMode, x, y){
  petals.push({
    x: x ?? Math.random()*cv.width,
    y: y ?? (burstMode ? Math.random()*-cv.height : -20),
    s: 8+Math.random()*14, vy: 0.8+Math.random()*1.8, vx:(Math.random()-.5)*(x?6:1),
    r: Math.random()*6.28, vr:(Math.random()-.5)*.08,
    sw: Math.random()*6.28, c: palette[Math.floor(Math.random()*palette.length)]
  });
}
function burst(el){
  const b = el.getBoundingClientRect();
  for(let k=0;k<25;k++){ spawn(false,b.left+b.width/2,b.top+b.height/2); petals[petals.length-1].vy=-2+Math.random()*3; }
}
function drawPetal(p){
  ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r); ctx.fillStyle=p.c; ctx.globalAlpha=.85;
  ctx.beginPath(); ctx.moveTo(0,0);
  ctx.bezierCurveTo(p.s,-p.s*.6,p.s,p.s,0,p.s*1.3);
  ctx.bezierCurveTo(-p.s,p.s,-p.s,-p.s*.6,0,0); ctx.fill(); ctx.restore();
}
function loop(){
  ctx.clearRect(0,0,cv.width,cv.height);
  if(petals.length<70 && Math.random()<.25) spawn(false);
  petals = petals.filter(p=>p.y<cv.height+40);
  petals.forEach(p=>{ p.sw+=.03; p.x+=p.vx+Math.sin(p.sw)*.8; p.y+=p.vy; p.vy+=(p.vy<0?.05:0); p.r+=p.vr; drawPetal(p); });
  requestAnimationFrame(loop);
}
loop();
