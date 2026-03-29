let players = [
  { name: "missed", region: "na" },
  { name: "exight", region: "na" },
  { name: "loxssy", region: "eu" }
];

let filter = "all";
let searchText = "";

/* render */
function render(){
  let list = document.getElementById("list");
  list.innerHTML = "";

  let filtered = players
    .filter(p => filter === "all" ? true : p.type === filter)
    .filter(p => p.name.toLowerCase().includes(searchText));

  if(filtered.length === 0) filtered = players;

  filtered.forEach((p,i)=>{
    let avatar = `https://mc-heads.net/avatar/${p.name}`;

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

/* copy TG */
function copyTG(){
  navigator.clipboard.writeText("https://exetiqueik.t.me").then(()=>{
    alert("Copied!");
  });
}

/* init */
render();
