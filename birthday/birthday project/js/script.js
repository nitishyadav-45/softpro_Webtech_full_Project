// Loader removal
window.addEventListener("load",()=>{
setTimeout(()=>{
document.getElementById("loader").style.display="none";
},3000);
});

// Theme Toggle
function toggleTheme(){
document.body.classList.toggle("dark");
}

// Countdown
const countdown = document.getElementById("countdown");
const eventDate = new Date("March 10, 2026 00:00:00").getTime();

setInterval(()=>{
let now = new Date().getTime();
let gap = eventDate - now;

let d = Math.floor(gap / (1000*60*60*24));
let h = Math.floor((gap%(1000*60*60*24))/(1000*60*60));
let m = Math.floor((gap%(1000*60*60))/(1000*60));
let s = Math.floor((gap%(1000*60))/1000);

if(countdown){
countdown.innerHTML = `⏳ ${d}d ${h}h ${m}m ${s}s`;
}
},1000);

// Advanced Confetti Engine
const canvas = document.getElementById("confettiCanvas");
if(canvas){
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

for(let i=0;i<200;i++){
confetti.push({
x: Math.random()*canvas.width,
y: Math.random()*canvas.height,
size: Math.random()*6+2,
speed: Math.random()*4+1,
color: `hsl(${Math.random()*360},100%,50%)`
});
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);
confetti.forEach(p=>{
ctx.fillStyle = p.color;
ctx.fillRect(p.x,p.y,p.size,p.size);
p.y += p.speed;
if(p.y > canvas.height) p.y=0;
});
requestAnimationFrame(animate);
}
animate();
}