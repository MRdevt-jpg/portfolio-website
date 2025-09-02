let character = JSON.parse(localStorage.getItem("character"));
if(!character){
  window.location.href = "index.html";
}
let quests = JSON.parse(localStorage.getItem("quests")) || [];


const quotes = [
  "Heute wird gebaut, nicht geträumt.",
  "Konstanz schlägt Intensität.",
  "Klein anfangen. Groß denken.",
  "Mut wird belohnt.",
  "Disziplin ist die Brücke zwischen Ziel und Erfolg."
];


const welcomeText = document.getElementById("welcomeText");
const charAvatar = document.getElementById("charAvatar");
const charTitle = document.getElementById("charTitle");
const charGoalText = document.getElementById("charGoalText");
const charXP = document.getElementById("charXP");
const charLevel = document.getElementById("charLevel");

const S_val = document.getElementById("S_val");
const I_val = document.getElementById("I_val");
const D_val = document.getElementById("D_val");
const A_val = document.getElementById("A_val");
const C_val = document.getElementById("C_val");
const F_val = document.getElementById("F_val");
const S_bar = document.getElementById("S_bar");
const I_bar = document.getElementById("I_bar");
const D_bar = document.getElementById("D_bar");
const A_bar = document.getElementById("A_bar");
const C_bar = document.getElementById("C_bar");
const F_bar = document.getElementById("F_bar");

const questList = document.getElementById("questList");
const newQuestInput = document.getElementById("newQuest");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const categorySel = document.getElementById("category");
const diffSel = document.getElementById("difficulty");

const dailyQuote = document.getElementById("dailyQuote");
const nextQuoteBtn = document.getElementById("nextQuoteBtn");


function setAccent(color){ document.documentElement.style.setProperty("--accent", color); }

function renderCharacter(){
  welcomeText.textContent = `Willkommen zurück, ${character.name}!`;
  charAvatar.textContent = character.avatar;
  charTitle.textContent = character.name;
  charGoalText.textContent = character.goal ? "Ziel: " + character.goal : "Ziel: –";
  charXP.textContent = character.xp;
  charLevel.textContent = character.level;
  setAccent(character.color || "#00d1ff");
  renderStats();
}

function renderStats(){
  const maxStat = 200; 
  const { S,I,D,A,C,F } = character.stats;
  S_val.textContent = S; I_val.textContent = I; D_val.textContent = D;
  A_val.textContent = A; C_val.textContent = C; F_val.textContent = F;
  S_bar.style.width = Math.min(100, (S/maxStat)*100) + "%";
  I_bar.style.width = Math.min(100, (I/maxStat)*100) + "%";
  D_bar.style.width = Math.min(100, (D/maxStat)*100) + "%";
  A_bar.style.width = Math.min(100, (A/maxStat)*100) + "%";
  C_bar.style.width = Math.min(100, (C/maxStat)*100) + "%";
  F_bar.style.width = Math.min(100, (F/maxStat)*100) + "%";
}


function showQuote(){
  const day = new Date().getDate();
  dailyQuote.textContent = "„" + quotes[day % quotes.length] + "“";
}

function renderQuests(){
  questList.innerHTML = "";
  quests.forEach((q, i)=>{
    const li = document.createElement("li");
    li.className = "quest-item " + (q.done ? "completed" : "");

    const cb = document.createElement("input");
    cb.type = "checkbox"; cb.checked = q.done;
    cb.addEventListener("change", ()=>toggleQuest(i));

    const label = document.createElement("label");
    label.textContent = q.text;

    const meta = document.createElement("div");
    meta.className = "quest-meta";
    const tagCat = document.createElement("span");
    tagCat.className = "tag";
    tagCat.textContent = catLabel(q.cat);
    const tagDiff = document.createElement("span");
    tagDiff.className = "tag";
    tagDiff.textContent = diffLabel(q.diff);
    meta.appendChild(tagCat);
    meta.appendChild(tagDiff);

    li.appendChild(cb);
    li.appendChild(label);
    li.appendChild(meta);
    questList.appendChild(li);
  });
}

function addQuest(){
  const text = newQuestInput.value.trim();
  if(!text) return;
  const cat = categorySel.value;
  const diff = parseInt(diffSel.value, 10);
  quests.push({ text, done:false, cat, diff });
  newQuestInput.value = "";
  saveAndRender();
}

function toggleQuest(i){
  const q = quests[i];
  q.done = !q.done;

 
  const { xpDelta, statDelta } = deltasFor(q.cat, q.diff);
  if(q.done){
    character.xp += xpDelta;
    character.stats[q.cat] += statDelta;
  } else {
    character.xp = Math.max(0, character.xp - xpDelta);
    character.stats[q.cat] = Math.max(0, character.stats[q.cat] - statDelta);
  }

  
  const newLevel = Math.max(1, Math.floor(character.xp / 100) + 1);
  character.level = newLevel;

  persist();
  saveAndRender();
  renderCharacter();
}

function resetQuests(){
  quests = [];
  saveAndRender();
}

function saveAndRender(){
  localStorage.setItem("quests", JSON.stringify(quests));
  renderQuests();
}

function persist(){
  localStorage.setItem("character", JSON.stringify(character));
}


function deltasFor(cat, diff){
  
  const xpByDiff = { 1: 5, 2: 10, 3: 20 };
  
  const statByDiff = { 1: 1, 2: 2, 3: 4 };
  return { xpDelta: xpByDiff[diff] || 10, statDelta: statByDiff[diff] || 2 };
}

function catLabel(c){
  return {
    S:"💪 Stärke", I:"🧠 Intelligenz", D:"📏 Disziplin",
    A:"🏃 Ausdauer", C:"🗣️ Charisma", F:"🎯 Fokus"
  }[c] || "–";
}
function diffLabel(d){ return {1:"Leicht",2:"Mittel",3:"Schwer"}[d] || "Mittel"; }


addBtn.addEventListener("click", addQuest);
newQuestInput.addEventListener("keypress", e=>{ if(e.key==="Enter") addQuest(); });
resetBtn.addEventListener("click", resetQuests);
nextQuoteBtn.addEventListener("click", showQuote);


renderCharacter();
renderQuests();
showQuote();
