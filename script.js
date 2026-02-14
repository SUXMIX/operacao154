// Revelar seções
const enterBtn = document.getElementById("enterBtn");
const sections = document.querySelectorAll(".section");

enterBtn.addEventListener("click", () => {
  sections.forEach(sec => sec.classList.remove("hidden"));
  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
});

// Efeito de digitação
const text = "Você mudou a forma como eu vejo o mundo. Cada detalhe da minha vida ficou mais bonito depois que você chegou.";
const typedText = document.getElementById("typedText");
let index = 0;

function typeEffect() {
  if (index < text.length) {
    typedText.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 40);
  }
}
typeEffect();

// Contador emocional
const startDate = new Date("2024-01-01");
const counter = document.getElementById("counter");

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  counter.innerText = days + " dias fazendo minha vida melhor.";
}
updateCounter();

// CONSTELAÇÃO
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Botão surpresa
const secretBtn = document.getElementById("secretBtn");

secretBtn.addEventListener("click", () => {
  document.body.style.background = "black";
  alert("Era impossível você resistir. Eu também não resisti a você.");
});
