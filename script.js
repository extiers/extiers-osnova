let PASSWORD = "4953";

let players = JSON.parse(localStorage.getItem("players") || "[]");

let filter = "all";
let searchText = "";

/* SAVE */
function save(){
  localStorage.setItem("players", JSON.stringify(players));
}

/* RENDER */
function render(){
  let list = document.getElementById("list");
  list.innerHTML = "";

  let filtered = players
    .filter(p => {
      if(filter === "all") return true;
      return p.type === filter;
    })
    .filter(p => p.name.toLowerCase().includes(searchText));

  // если пусто — показываем всех
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

/* SEARCH FIX */
let searchInput = document.querySelector(".search");

searchInput.addEventListener("input", (e)=>{
  searchText = e.target.value.toLowerCase();
  render();
});

/* FILTER FIX */
function setFilter(f, el){
  filter = f;

  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  el.classList.add("active");

  render();
}

/* MENU */
function toggleMenu(){
  let menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

/* ADMIN */
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

/* ADD PLAYER */
function addPlayer(){
  let name = document.getElementById("name").value;
  let avatar = document.getElementById("avatar").value;
  let type = document.getElementById("type").value;
  let region = document.getElementById("region").value;

  if(!name) return alert("введи ник");

  players.push({name, avatar, type, region});

  save();
  render();
}

/* CLEAR */
function clearPlayers(){
  players = [];
  save();
  render();
}

/* TG COPY FIX */
function copyTG(){
  let text = "https://t.me/yourchannel";

  navigator.clipboard.writeText(text).then(()=>{
    alert("Скопировано!");
  }).catch(()=>{
    alert("Ошибка копирования");
  });
}

/* INIT */
render();
