let siswa=[
"Agha Muhammad Azam Ar-Rosyid",
"Aldiansah Arga Pratama",
"Fahad Ahmad Alamudi",
"Intan Nirmalasari Salabila Roskiani",
"Mohammad Farid Syaifulloh",
"Mohammad Musyafa Akbar",
"Muhammad Irfan Arisaputra Islahudin",
"Muhammad Michael Al-Muhith",
"Naila Rheisy Admaja Veaka",
"Salma Larissa Indrasari"
];

let jadwalPelajaran={
Senin:["Geografi","Matematika","B Indo","Seni","Biologi"],
Selasa:["B Jawa","Sejarah","Kemuh","Informatika","Geografi","Ekonomi"],
Rabu:["Penjaskes","Arab","PAI","Ekonomi"],
Kamis:["Biologi","B Indo","PAI","B Inggris","Sosiologi"],
Jumat:["PPKN","BK","Matematika","Sosiologi"]
};

let jadwalPiket={
Senin:["Azam","Salma"],
Selasa:["Farid","Musyafa"],
Rabu:["Michael","Irma"],
Kamis:["Fahad","Rheisy"],
Jumat:["Arga","Irfan"]
};

let tugas=JSON.parse(localStorage.getItem("tugas"))||[];
let absensi=JSON.parse(localStorage.getItem("absensi"))||{};

let motivasi=[
"Semangat belajar 🌸",
"Kamu hebat 💜",
"Jangan menyerah ✨",
"Sukses menunggumu 🚀"
];

let adminUser="admineleventwolighthouse";
let adminPass="112rumahbercahaya";

let siswaPass="siswaeleventwolighthouse";

let isAdmin=false;

// ================= LOGIN =================

function login(){

let u=username.value.toLowerCase().trim();
let p=password.value.toLowerCase().trim();

// ADMIN
if(u===adminUser && p===adminPass){
isAdmin=true;
openApp();
return;
}

// SISWA (nama lengkap + password sama)
for(let s of siswa){
if(s.toLowerCase()===u && p===siswaPass){
isAdmin=false;
openApp();
return;
}

loginMsg.innerText="Username atau password salah";
}

function openApp(){
loginSection.style.display="none";
appSection.style.display="block";
initApp();
}

function logout(){
location.reload();
}

// ================= INIT =================

function initApp(){
renderSiswa();
renderAbsensi();
renderTugas();
renderJadwal();
motivasiRandom();
}

// ================= TAB =================

function showTab(id,el){
document.querySelectorAll(".tabContent").forEach(t=>t.style.display="none");
document.getElementById(id).style.display="block";
document.querySelectorAll(".tabBtn").forEach(b=>b.classList.remove("active"));
el.classList.add("active");
}

// ================= SISWA =================

function renderSiswa(){
daftarSiswa.innerHTML="";
siswa.forEach(s=>{
let li=document.createElement("li");
li.innerText=s;
daftarSiswa.appendChild(li);
});
}

function searchSiswa(){
let q=searchSiswa.value.toLowerCase();
document.querySelectorAll("#daftarSiswa li").forEach(li=>{
li.style.display=li.innerText.toLowerCase().includes(q)?"block":"none";
});
}

// ================= ABSENSI =================

function renderAbsensi(){
absensiList.innerHTML="";
siswa.forEach(s=>{
absensiList.innerHTML+=`${s}
<select ${!isAdmin?"disabled":""} onchange="updateAbsensi('${s}',this.value)">
<option></option>
<option>Hadir</option>
<option>Izin</option>
<option>Sakit</option>
<option>Alpha</option>
</select><br>`;
});
}

function updateAbsensi(s,v){
if(!isAdmin)return;
let t=new Date().toISOString().slice(0,10);
if(!absensi[t])absensi[t]={};
absensi[t][s]=v;
localStorage.setItem("absensi",JSON.stringify(absensi));
}

// ================= TUGAS =================

function renderTugas(){
listTugas.innerHTML="";
tugas.forEach((t,i)=>{
listTugas.innerHTML+=`${t.nama} (${t.deadline})
<input type="checkbox" ${t.done?"checked":""} onchange="toggleTugas(${i})"><br>`;
});
localStorage.setItem("tugas",JSON.stringify(tugas));
}

function tambahTugas(){
if(!isAdmin){alert("Hanya admin");return;}
let n=prompt("Nama tugas");
let d=prompt("Deadline");
if(n&&d){tugas.push({nama:n,deadline:d,done:false});renderTugas();}
}

function toggleTugas(i){
if(!isAdmin)return;
tugas[i].done=!tugas[i].done;
renderTugas();
}

// ================= JADWAL =================

function renderJadwal(){
jadwalList.innerHTML="";
for(let h in jadwalPelajaran){
jadwalList.innerHTML+=`
<div class="jadwalItem">
<b>${h}</b><br>
Pelajaran: ${jadwalPelajaran[h].join(", ")}<br>
Piket: ${jadwalPiket[h].join(", ")}
</div>`;
}
}

// ================= MOTIVASI =================

function motivasiRandom(){
motivasiText.innerText=motivasi[Math.floor(Math.random()*motivasi.length)];
}

// ================= SEARCH =================

function searchOption(){
let q=searchOption.value.toLowerCase();
document.querySelectorAll(".tabBtn").forEach(b=>{
b.style.display=b.innerText.toLowerCase().includes(q)?"inline":"none";
});
}

// ================= SERVICE WORKER =================

if("serviceWorker"in navigator){
navigator.serviceWorker.register("service-worker.js");
}
