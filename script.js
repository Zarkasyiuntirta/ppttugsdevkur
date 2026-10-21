const slides=[...document.querySelectorAll(".slide")];
const prevBtn=document.getElementById("prevBtn");
const nextBtn=document.getElementById("nextBtn");
const counter=document.getElementById("counter");
const progress=document.getElementById("progress");
const overview=document.getElementById("overview");
const overviewGrid=document.getElementById("overviewGrid");
let current=0;

function showSlide(index){
  current=(index+slides.length)%slides.length;
  slides.forEach((s,i)=>s.classList.toggle("active",i===current));
  counter.textContent=`${String(current+1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;
  progress.style.width=`${((current+1)/slides.length)*100}%`;
  document.title=`${slides[current].dataset.title} — EduAI Research`;
}
function next(){showSlide(current+1)}
function prev(){showSlide(current-1)}
nextBtn.addEventListener("click",next);
prevBtn.addEventListener("click",prev);

document.addEventListener("keydown",e=>{
  if(["ArrowRight","PageDown"," "].includes(e.key)){e.preventDefault();next()}
  if(["ArrowLeft","PageUp"].includes(e.key)){e.preventDefault();prev()}
  if(e.key==="Home")showSlide(0);
  if(e.key==="End")showSlide(slides.length-1);
  if(e.key.toLowerCase()==="f")toggleFullscreen();
  if(e.key==="Escape")overview.classList.remove("open");
});

let touchX=0;
document.addEventListener("touchstart",e=>touchX=e.changedTouches[0].screenX,{passive:true});
document.addEventListener("touchend",e=>{
  const dx=e.changedTouches[0].screenX-touchX;
  if(Math.abs(dx)>55) dx<0?next():prev();
},{passive:true});

function toggleFullscreen(){
  if(!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
}
document.getElementById("fullscreenBtn").addEventListener("click",toggleFullscreen);

slides.forEach((s,i)=>{
  const item=document.createElement("button");
  item.className="overview-item";
  item.innerHTML=`<span>${String(i+1).padStart(2,"0")}</span><b>${s.dataset.title}</b>`;
  item.addEventListener("click",()=>{showSlide(i);overview.classList.remove("open")});
  overviewGrid.appendChild(item);
});
document.getElementById("overviewBtn").addEventListener("click",()=>overview.classList.add("open"));
document.getElementById("closeOverview").addEventListener("click",()=>overview.classList.remove("open"));

const particles=document.getElementById("bgParticles");
for(let i=0;i<55;i++){
  const p=document.createElement("i");
  p.className="particle";
  p.style.left=Math.random()*100+"%";
  p.style.animationDelay=(-Math.random()*8)+"s";
  p.style.animationDuration=(5+Math.random()*8)+"s";
  p.style.opacity=(.25+Math.random()*.55);
  particles.appendChild(p);
}

const addieData={
 analysis:{title:"Analisis & Kurikulum",num:"01",items:["Mempelajari capaian pembelajaran, merumuskan tujuan, serta mengenali kemampuan awal siswa."]},

 design:{title:"Strategi & Media",num:"02",items:["Memilih pendekatan, model, metode, media, serta menyusun urutan aktivitas secara realistis."]},

 development:{title:"Asesmen & Kendala",num:"03",items:["Menentukan bentuk asesmen/kriteria ketercapaian serta mengantisipasi kendala ketersediaan waktu."]},

 implementation:{title:"Pelaksanaan Pembelajaran",num:"04",items:["Kegiatan Pendahuluan","Membangun suasana kondusif, menggali pengetahuan lewat pertanyaan pemantik, dan menyampaikan tujuan."]},
 evaluation:{title:"Kegiatan Inti",num:"05",items:["Siswa mengamati, berdiskusi, bereksperimen, membuat karya, dan menyelesaikan masalah."]}
 
};
const addieData1={
 analysis:{title:"Kegiatan Pendahuluan",num:"01",items:["Membangun suasana kondusif, menggali pengetahuan lewat pertanyaan pemantik, dan menyampaikan tujuan."]},

 design:{title:"Kegiatan Inti",num:"02",items:["Siswa mengamati, berdiskusi, bereksperimen, membuat karya, dan menyelesaikan masalah."]},

 development:{title:"Kegiatan Penutup",num:"03",items:["Menyimpulkan materi bersama, refleksi mandiri, memberikan umpan balik, dan tindak lanjut."]},

 implementation:{title:"Pelaksanaan Pembelajaran",num:"04",items:["Kegiatan Pendahuluan","Membangun suasana kondusif, menggali pengetahuan lewat pertanyaan pemantik, dan menyampaikan tujuan."]},
 evaluation:{title:"Kegiatan Inti",num:"05",items:["Siswa mengamati, berdiskusi, bereksperimen, membuat karya, dan menyelesaikan masalah."]}
 
};


const stepTitle=document.getElementById("stepTitle");
const stepNumber=document.getElementById("stepNumber");
const stepList=document.getElementById("stepList");
function updateAddie(key){
  const d=addieData[key];
  stepTitle.textContent=d.title;
  stepNumber.textContent=d.num;
  stepList.innerHTML=d.items.map(x=>`<li>${x}</li>`).join("");
  document.querySelectorAll(".addie-node").forEach(n=>n.classList.toggle("active",n.dataset.step===key));
}
document.querySelectorAll(".addie-node").forEach(n=>n.addEventListener("click",()=>updateAddie(n.dataset.step)));
updateAddie("analysis");
showSlide(0);
