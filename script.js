import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAS5FkoKGF1xOsYjWXf1fnPH49xIJaoPfg",
  authDomain: "exeti-site.firebaseapp.com",
  databaseURL: "https://exeti-site-default-rtdb.firebaseio.com",
  projectId: "exeti-site",
  storageBucket: "exeti-site.firebasestorage.app",
  messagingSenderId: "669341180692",
  appId: "1:669341180692:web:59f9936c175a653d3a5801"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let PASSWORD = "4953";
let players = [];

let filter = "all";
let searchText = "";

/* realtime */
onValue(ref(db, "players"), (snapshot) => {
  players = [];
  snapshot.forEach(child => {
    players.push({
      id: child.key,
      ...child.val()
    });
  });
  render();
});

/* render */
function render(){
  let list = document.getElementById("list");
  list.innerHTML = "";

  let filtered = players
    .filter(p => filter === "all" ? true : p.type === filter)
    .filter(p => p.name.toLowerCase().includes(searchText));

  if(filtered.length === 0) filtered = players;

  filtered.forEach((p,i)=>{
    let avatar = p.avatar || `https://mc-heads.net/avatar/${p.name}`;

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="rank">${i+1}</div>
      <img class="avatar" src="${avatar}">
      <div>${p.name}</div>
      <div class="region ${p.region}">${p.region.toUpperCase()}</div>
    `;

    list.appendChild(card);
  });
}

/* search */
document.querySelector(".search").addEventListener("input", (e)=>{
  searchText = e.target.value.toLowerCase();
  render();
});

/* filter */
function setFilter(f, el){
  filter = f;
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  el.classList.add("active");
  render();
}

/* menu */
function toggleMenu(){
  let menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

/* admin */
function openAdmin(){
  document.getElementById("admin").style.display = "flex";
}

function closeAdmin(){
  document.getElementById("admin").style.display = "none";
}

function login(){
  if(document.getElementById("pass").value === PASSWORD){
    document.getElementById("adminContent").style.display = "block";
  } else alert("wrong password");
}

/* add */
function addPlayer(){
  let name = document.getElementById("name").value;
  let avatar = document.getElementById("avatar").value;
  let type = document.getElementById("type").value;
  let region = document.getElementById("region").value;

  if(!name) return;

  push(ref(db, "players"), { name, avatar, type, region });
}

/* clear */
function clearPlayers(){
  remove(ref(db, "players"));
}

/* copy */
function copyTG(){
  navigator.clipboard.writeText("https://t.me/yourchannel");
}
