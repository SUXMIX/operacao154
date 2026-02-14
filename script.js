// Rolagem suave
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Efeito de digitação
const text = "Desde que você entrou na minha vida, tudo ficou mais leve, mais bonito e mais verdadeiro.";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}
window.onload = typeWriter;

// Contador emocional
const inicio = new Date("2024-06-01"); // coloque a data real aqui
function atualizarContador() {
  const hoje = new Date();
  const diff = hoje - inicio;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("contador").innerText = 
    `Há ${dias} dias você mudou completamente a minha vida.`;
}
setInterval(atualizarContador, 1000);

// Surpresa
function surpresa() {
  const msg = document.getElementById("mensagemSecreta");
  msg.innerText = "Era impossível você resistir. Eu também não resisti a você.";
  msg.style.marginTop = "20px";
}

// Fundo estrelas
const canvas = document.getElementById("stars");
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

