const screens=[...document.querySelectorAll(".screen")];
function next(id){screens.forEach(s=>s.classList.remove("active"));document.getElementById(id).classList.add("active");window.scrollTo(0,0)}
function startStory(){next("notice");toast("Story unlocked. ❤️")}
function toast(t){const x=document.getElementById("toast");x.textContent=t;x.style.opacity=1;x.style.transform="translate(-50%,0)";setTimeout(()=>{x.style.opacity=0;x.style.transform="translate(-50%,20px)"},1800)}
function sayHi(){document.getElementById("hiScene").classList.remove("hidden");toast("That was... smooth. 😂")}
function recruitTanvi(){document.getElementById("tanviDone").classList.remove("hidden");toast("Tanvi recruited successfully!")}
const chats=[
["her","Hi"],
["me","Hey 😅"],
["her","What are you doing?"],
["me","Nothing... just talking to you."],
["her","😂"],
["me","Late-night conversations unlocked."],
["her","Okay, goodnight!"],
["me","Goodnight..."],
["me","*waits for the next message* 😭"]
];
let chatI=0;
function nextChat(){
 if(chatI<chats.length){
   const [who,text]=chats[chatI++];const b=document.createElement("div");b.className="bubble "+who;b.textContent=text;document.getElementById("chat").appendChild(b);
 }else{
   document.getElementById("phoneNext").classList.remove("hidden");document.querySelector(".tap").textContent="STORY UNLOCKED";
 }
}
const questions=[
["Who helped turn two strangers into friends?",["Tanvi","A random professor","The notice board"],0],
["Where did this story begin?",["A café","A college notice board","WhatsApp"],1],
["What happened after the first “Hi”?",["She ran away 😂","We took a selfie","We went for coffee"],0],
["What was special about those early conversations?",["They were late at night","They were voice notes only","They happened in class"],0],
["After all the years, what are we?",["Business partners","Best friends ❤️","Still strangers"],1]
];
let qi=0, score=0;
function renderQ(){
 document.getElementById("qCount").textContent=`Question ${qi+1} / ${questions.length}`;
 document.getElementById("question").textContent=questions[qi][0];
 const a=document.getElementById("answers");a.innerHTML="";
 questions[qi][1].forEach((t,i)=>{const b=document.createElement("button");b.className="answer";b.textContent=t;b.onclick=()=>answer(i,b);a.appendChild(b)});
 document.getElementById("quizFeedback").textContent="";
}
function answer(i,b){
 const q=questions[qi];[...document.querySelectorAll(".answer")].forEach(x=>x.disabled=true);
 if(i===q[2]){b.classList.add("correct");score++;document.getElementById("quizFeedback").textContent="Correct. You survived another year of this friendship. 😂";}
 else{b.classList.add("wrong");document.querySelectorAll(".answer")[q[2]].classList.add("correct");document.getElementById("quizFeedback").textContent="Close enough... I'll allow it. 😌";}
 setTimeout(()=>{qi++;if(qi<questions.length)renderQ();else{toast(`Best Friend Check complete: ${score}/${questions.length} ❤️`);next("timeline");}},900)
}
renderQ();

const yearsData={
2017:"The year a nervous “Hi” became the beginning of everything.",
2018:"The year strangers became proper friends — and conversations became a habit.",
2019:"More laughs, more nonsense, and a friendship getting stronger.",
2020:"Different days, same friendship. Somehow, we stayed connected.",
2021:"Growing up, figuring life out, and still having each other around.",
2022:"Highs, lows, random fights — and the friendship still held on.",
2023:"More memories. More arguments. More reasons to laugh about them later.",
2024:"Life kept moving. The friendship kept finding its way back.",
2025:"Still annoying each other. Still showing up. Still us. 😂",
2026:"A birthday, another chapter, and one very important best friend. ❤️"
};
const years=document.getElementById("years");
Object.keys(yearsData).forEach((y,i)=>{const b=document.createElement("button");b.className="year";b.textContent=y;b.onclick=()=>showYear(y,b);years.appendChild(b)});
function showYear(y,b){
 document.querySelectorAll(".year").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 document.getElementById("yearCard").innerHTML=`<div><h3>${y}</h3><p>${yearsData[y]}</p></div>`;
 if(y==="2026")document.getElementById("timelineNext").classList.remove("hidden");
}
const heartLines=[
"Sometimes I expected too much from you.",
"Sometimes I fought with you over things that probably didn't deserve a fight.",
"Sometimes things weren't easy.",
"There were moments when you could have simply walked away.",
"But you stayed. ❤️"
];
let hi=0;
function revealHeart(){
 if(hi<heartLines.length){document.getElementById("heartText").textContent=heartLines[hi++];document.getElementById("heartCounter").textContent=`${Math.min(hi+1,heartLines.length)} / ${heartLines.length}`;if(hi===heartLines.length)document.getElementById("heartNext").classList.remove("hidden")}
}
let blown=0;
function blow(el){if(el.classList.contains("out"))return;el.classList.add("out");blown++;if(blown===5){document.getElementById("cakeHint").textContent="Wish ready. ✨";document.getElementById("finalButton").classList.remove("hidden");toast("All candles blown! 🎉")}}
function finale(){next("final");startFireworks()}
function makeParticles(){
 const p=document.getElementById("particles");
 for(let i=0;i<45;i++){const s=document.createElement("span");s.className="particle";s.style.left=Math.random()*100+"%";s.style.animationDuration=(8+Math.random()*15)+"s";s.style.animationDelay=(-Math.random()*15)+"s";p.appendChild(s)}
}
makeParticles();

function startFireworks(){
 const c=document.getElementById("fireworks"),ctx=c.getContext("2d");let W=c.width=innerWidth,H=c.height=innerHeight;
 addEventListener("resize",()=>{W=c.width=innerWidth;H=c.height=innerHeight});
 let sparks=[];
 function burst(x,y){
  for(let i=0;i<55;i++){const a=Math.PI*2*i/55,sp=2+Math.random()*5;sparks.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:70+Math.random()*35})}
 }
 let last=0;
 function loop(t){
  ctx.clearRect(0,0,W,H);
  if(t-last>900){burst(W*(.15+Math.random()*.7),H*(.15+Math.random()*.45));last=t}
  sparks=sparks.filter(s=>s.life>0);
  sparks.forEach(s=>{s.x+=s.vx;s.y+=s.vy;s.vy+=.035;s.life--;ctx.globalAlpha=Math.max(0,s.life/90);ctx.fillStyle="#fff";ctx.fillRect(s.x,s.y,2,2)});
  requestAnimationFrame(loop)
 }
 loop(0)
}
