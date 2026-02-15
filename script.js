// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initButtonInteraction();
    initSoundEffects();
});

// ===================================
// SISTEMA DE PARTÍCULAS FLUTUANTES
// ===================================

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 30 : 50; // Menos partículas em mobile
    
    // Criar partículas iniciais
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    // Criar novas partículas continuamente
    setInterval(() => {
        if (document.getElementById('mainPage').classList.contains('active')) {
            createParticle(particlesContainer);
        }
    }, 800);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Propriedades aleatórias
    const size = Math.random() * 4 + 2; // 2-6px
    const startX = Math.random() * 100; // Posição X inicial (%)
    const drift = (Math.random() - 0.5) * 100; // Deriva horizontal (-50 a 50px)
    const duration = Math.random() * 10 + 10; // 10-20 segundos
    const delay = Math.random() * 3; // 0-3 segundos de delay
    
    // Aplicar estilos
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}%`;
    particle.style.bottom = '0';
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.setProperty('--drift', `${drift}px`);
    
    // Cor aleatória entre fogo e água
    const isFire = Math.random() > 0.5;
    if (isFire) {
        particle.style.background = `radial-gradient(circle, rgba(255, 107, 53, 0.8) 0%, rgba(255, 69, 0, 0) 70%)`;
    } else {
        particle.style.background = `radial-gradient(circle, rgba(111, 255, 233, 0.8) 0%, rgba(0, 212, 255, 0) 70%)`;
    }
    
    container.appendChild(particle);
    
    // Remover partícula após a animação
    setTimeout(() => {
        particle.remove();
    }, (duration + delay) * 1000);
}

// ===================================
// INTERAÇÃO DO BOTÃO PRINCIPAL
// ===================================

function initButtonInteraction() {
    const button = document.getElementById('mainButton');
    const mainPage = document.getElementById('mainPage');
    const comingSoonPage = document.getElementById('comingSoonPage');
    
    // Efeito de ripple ao clicar
    button.addEventListener('click', function(e) {
        createRipple(e, button);
        
        // Aguardar um pouco antes de fazer a transição
        setTimeout(() => {
            transitionToComingSoon(mainPage, comingSoonPage);
        }, 600);
    });
    
    // Efeito adicional ao passar o mouse
    button.addEventListener('mouseenter', function() {
        intensifyEffects(true);
    });
    
    button.addEventListener('mouseleave', function() {
        intensifyEffects(false);
    });
    
    // Efeito de movimento do mouse sobre o botão
    button.addEventListener('mousemove', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x / 10;
        const moveY = y / 10;
        
        button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', function() {
        button.style.transform = '';
    });
}

// Criar efeito ripple ao clicar
function createRipple(event, element) {
    const ripple = element.querySelector('.button-ripple');
    
    if (!ripple) {
        const newRipple = document.createElement('div');
        newRipple.classList.add('button-ripple');
        element.appendChild(newRipple);
    }
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const rippleEffect = element.querySelector('.button-ripple');
    rippleEffect.style.width = rippleEffect.style.height = `${size}px`;
    rippleEffect.style.left = `${x}px`;
    rippleEffect.style.top = `${y}px`;
    rippleEffect.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)';
    rippleEffect.style.animation = 'rippleEffect 0.6s ease-out';
    
    setTimeout(() => {
        rippleEffect.style.animation = '';
    }, 600);
}

// Intensificar efeitos ao passar o mouse
function intensifyEffects(intensify) {
    const waterParticles = document.querySelectorAll('.water-particle');
    const flames = document.querySelectorAll('.flame');
    
    if (intensify) {
        waterParticles.forEach(particle => {
            particle.style.animationDuration = '2s';
        });
        flames.forEach(flame => {
            flame.style.animationDuration = '2s';
        });
    } else {
        waterParticles.forEach(particle => {
            particle.style.animationDuration = '4s';
        });
        flames.forEach(flame => {
            flame.style.animationDuration = '3.5s';
        });
    }
}

// Transição para a página "Em Breve"
function transitionToComingSoon(fromPage, toPage) {
    // Adicionar classe de fade out
    fromPage.classList.add('fade-out');
    
    // Após a animação, trocar as páginas
    setTimeout(() => {
        fromPage.classList.remove('active', 'fade-out');
        toPage.classList.add('active');
        
        // Adicionar animação de entrada
        toPage.style.animation = 'fadeInScale 1s ease-out';
    }, 800);
}

// ===================================
// EFEITOS SONOROS (OPCIONAL)
// ===================================

function initSoundEffects() {
    // Criar um contexto de áudio para feedback tátil
    // Nota: Sons reais podem ser adicionados aqui se desejar
    const button = document.getElementById('mainButton');
    
    button.addEventListener('click', function() {
        // Feedback visual adicional
        createSparkles(button);
    });
}

// Criar sparkles ao clicar no botão
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        createSparkle(centerX, centerY);
    }
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    
    // Cor aleatória entre fogo e água
    const isFire = Math.random() > 0.5;
    sparkle.style.background = isFire ? '#ff4500' : '#00d4ff';
    sparkle.style.boxShadow = isFire 
        ? '0 0 10px #ff4500, 0 0 20px #ff6b35'
        : '0 0 10px #00d4ff, 0 0 20px #6fffe9';
    
    document.body.appendChild(sparkle);
    
    // Direção e velocidade aleatórias
    const angle = (Math.PI * 2 * Math.random());
    const velocity = Math.random() * 3 + 2;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let posX = 0;
    let posY = 0;
    let opacity = 1;
    
    const animate = () => {
        posX += vx;
        posY += vy;
        opacity -= 0.02;
        
        sparkle.style.transform = `translate(${posX}px, ${posY}px)`;
        sparkle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            sparkle.remove();
        }
    };
    
    animate();
}

// ===================================
// ANIMAÇÃO DO CURSOR (OPCIONAL)
// ===================================

function initCursorEffect() {
    let cursorTrail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', function(e) {
        // Adicionar ponto ao rastro
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        // Limitar tamanho do rastro
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
        
        // Criar elemento visual do rastro (opcional)
        if (Math.random() > 0.9) { // 10% de chance
            createCursorParticle(e.clientX, e.clientY);
        }
    });
}

function createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.borderRadius = '50%';
    particle.style.background = 'rgba(255, 255, 255, 0.6)';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.transition = 'all 0.5s ease-out';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = 'scale(0)';
    }, 10);
    
    setTimeout(() => {
        particle.remove();
    }, 500);
}

// Inicializar efeito de cursor (descomente se quiser usar)
// initCursorEffect();

// ===================================
// OTIMIZAÇÕES DE PERFORMANCE
// ===================================

// Pausar animações quando a página não está visível
document.addEventListener('visibilitychange', function() {
    const mainPage = document.getElementById('mainPage');
    
    if (document.hidden) {
        // Pausar animações pesadas
        mainPage.style.animationPlayState = 'paused';
    } else {
        // Retomar animações
        mainPage.style.animationPlayState = 'running';
    }
});

// ===================================
// REDIMENSIONAMENTO RESPONSIVO
// ===================================

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recriar partículas com novo tamanho
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            initParticles();
        }
    }, 250);
});

// ===================================
// PREVENÇÃO DE CLIQUE DUPLO
// ===================================

let isTransitioning = false;
const button = document.getElementById('mainButton');

if (button) {
    button.addEventListener('click', function(e) {
        if (isTransitioning) {
            e.preventDefault();
            return false;
        }
        isTransitioning = true;
    });
}

// ===================================
// LOADING INICIAL
// ===================================

window.addEventListener('load', function() {
    // Garantir que tudo está carregado antes de mostrar
    document.body.style.opacity = '1';
    
    // Adicionar classe de carregado
    document.body.classList.add('loaded');
});

// ===================================
// CONSOLE EASTER EGG (OPCIONAL)
// ===================================

console.log('%c💕 Feito com amor para Isabelly 💕', 
    'font-size: 20px; font-weight: bold; color: #ff4500; text-shadow: 2px 2px 4px #00d4ff;');
console.log('%cFogo 🔥 + Água 💧 = Amor Eterno ❤️', 
    'font-size: 14px; color: #ffffff; background: linear-gradient(to right, #ff4500, #00d4ff); padding: 10px;');
