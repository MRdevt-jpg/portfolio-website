const DEFAULT_AVATARS = ["🧑‍🚀","🧙‍♂️","🧑‍💻","🦸","🤖","🐉"];
const avatarChoices = document.getElementById("avatarChoices");
const charForm = document.getElementById("charForm");

// Avatare rendern
DEFAULT_AVATARS.forEach(emo => {
  const div = document.createElement("div");
  div.className = "avatar-option";
  div.textContent = emo;
  div.addEventListener("click", () => {
    document.querySelectorAll(".avatar-option").forEach(d => d.classList.remove("active"));
    div.classList.add("active");
    charForm.dataset.avatar = emo;
  });
  avatarChoices.appendChild(div);
});

// Formular absenden
charForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const name = document.getElementById("charName").value.trim();
  const goal = document.getElementById("charGoal").value.trim();
  const color = document.getElementById("themeColor").value;
  const avatar = charForm.dataset.avatar || DEFAULT_AVATARS[0];

  const character = {
    name, goal, color, avatar,
    xp: 0, level: 1,
    stats: { S:0, I:0, D:0, A:0, C:0, F:0 } // Stärke, Intelligenz, Disziplin, Ausdauer, Charisma, Fokus
  };
  localStorage.setItem("character", JSON.stringify(character));
  window.location.href = "game 3.html";
});
