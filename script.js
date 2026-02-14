// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const sections = document.querySelectorAll('.section');
    const btnIniciar = document.getElementById('btn-iniciar');
    const textoCarta = document.getElementById('texto-carta');
    const cardsFoto = document.querySelectorAll('.card-foto');
    const btnMemoria = document.getElementById('btn-memoria');
    const fraseMemoria = document.getElementById('frase-memoria');
    const btnPerigoso = document.getElementById('btn-perigoso');
    const mensagemPerigosa = document.getElementById('mensagem-perigosa');
    const nomeElement = document.querySelector('.nome');
    
    let cliqueCount = 0;
    let cartaIndex = 0;
    
    // Texto da carta (digitando)
    const cartaTexto = `Meu amor,

Desde que você chegou, tudo ganhou cor. 
O café de cada manhã ficou mais gostoso, 
as músicas no rádio fazem mais sentido, 
e até os dias comuns se tornaram especiais.

Você é a pessoa que eu quero ter por perto 
em todos os momentos - nos silêncios, nas risadas, 
nos abraços que duram mais que o tempo.

Obrigado por existir e por escolher ficar. 
Te admirar é fácil. Te amar é inevitável.

Com todo carinho,
Vitor 💕`;

    // Função para mostrar seção
    function mostrarSecao(index) {
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
                if (i === 1) iniciarDigitacao();
                if (i === 4) iniciarConstelacao();
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Botão iniciar
    btnIniciar.addEventListener('click', () => {
        mostrarSecao(1);
    });

    // Efeito de digitação
    function iniciarDigitacao() {
        cartaIndex = 0;
        textoCarta.textContent = '';
        function digitar() {
            if (cartaIndex < cartaTexto.length) {
                textoCarta.textContent += cartaTexto.charAt(cartaIndex);
                cartaIndex++;
                setTimeout(digitar, 50);
            }
        }
        digitar();
    }

    // Clique no nome (mensagem criptografada)
    nomeElement.addEventListener('click', function() {
        cliqueCount++;
        if (cliqueCount === 3) {
            alert('💕 Você é o meu lugar seguro. 💕');
            cliqueCount = 0;
        }
    });

    // Galeria com segredos
    cardsFoto.forEach(card => {
        card.addEventListener('click', function() {
            const segredo = this.dataset.segredo;
            alert(`✨ ${segredo} ✨`);
            this.classList.add('revelado');
        });
    });

    // Modo memória
    btnMemoria.addEventListener('click', function() {
        document.body.classList.toggle('modo-memoria-ativo');
        fraseMemoria.textContent = "Desde que você entrou na minha vida, tudo ficou mais bonito.";
        fraseMemoria.classList.add('visivel');
        
        setTimeout(() => {
            fraseMemoria.classList.remove('visivel');
        }, 3000);
    });

    // Botão perigoso
    btnPerigoso.addEventListener('click', function() {
        mensagemPerigosa.style.opacity = '0';
        mensagemPerigosa.textContent = '';
        
        setTimeout(() => {
            mensagemPerigosa.textContent = 'Era impossível você resistir. Eu também não resisti a você.';
            mensagemPerigosa.style.opacity = '1';
        }, 500);
    });

    // Constelação
    function iniciarConstelacao() {
        const canvas = document.getElementById('canvas-estrelas');
        const ctx = canvas.getContext('2d');
        const fraseConstelacao = document.getElementById('frase-constelacao');
        let width, height;
        let estrelas = [];
        let mouseX = 0, mouseY = 0;
        
        function resize() {
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = width;
            canvas.height = height;
            criarEstrelas();
        }
        
        function criarEstrelas() {
            estrelas = [];
            for (let i = 0; i < 50; i++) {
                estrelas.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    raio: Math.random() * 2 + 1,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2,
                    originalX: 0,
                    originalY: 0
                });
            }
            
            // Posicionar estrelas em formato de coração
            for (let i = 0; i < estrelas.length; i++) {
                const t = (i / estrelas.length) * Math.PI * 2;
                estrelas[i].originalX = width/2 + 100 * Math.sin(t) * Math.cos(t);
                estrelas[i].originalY = height/2 + 100 * Math.sin(t);
            }
        }
        
        function desenhar() {
            ctx.clearRect(0, 0, width, height);
            
            // Desenhar estrelas
            ctx.fillStyle = 'white';
            estrelas.forEach(estrela => {
                ctx.beginPath();
                ctx.arc(estrela.x, estrela.y, estrela.raio, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Conectar estrelas próximas ao mouse
            const distanciaMaxima = 80;
            ctx.strokeStyle = '#f8bbd0';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < estrelas.length; i++) {
                for (let j = i + 1; j < estrelas.length; j++) {
                    const distancia = Math.hypot(estrelas[i].x - estrelas[j].x, estrelas[i].y - estrelas[j].y);
                    
                    if (distancia < distanciaMaxima) {
                        ctx.beginPath();
                        ctx.moveTo(estrelas[i].x, estrelas[i].y);
                        ctx.lineTo(estrelas[j].x, estrelas[j].y);
                        ctx.strokeStyle = `rgba(248, 187, 208, ${1 - distancia/distanciaMaxima})`;
                        ctx.stroke();
                    }
                }
            }
            
            // Mover estrelas em direção ao mouse
            estrelas.forEach(estrela => {
                const dx = mouseX - estrela.x;
                const dy = mouseY - estrela.y;
                const dist = Math.hypot(dx, dy);
                
                if (dist < 100) {
                    estrela.x += dx * 0.01;
                    estrela.y += dy * 0.01;
                    
                    // Verificar se formou um coração
                    const coracaoCompleto = estrelas.every(e => 
                        Math.hypot(e.x - e.originalX, e.y - e.originalY) < 5
                    );
                    
                    if (coracaoCompleto) {
                        fraseConstelacao.textContent = 'Mesmo no meio do universo, eu escolheria você.';
                        fraseConstelacao.classList.add('visivel');
                    }
                } else {
                    // Voltar à posição original
                    estrela.x += (estrela.originalX - estrela.x) * 0.01;
                    estrela.y += (estrela.originalY - estrela.y) * 0.01;
                }
            });
            
            requestAnimationFrame(desenhar);
        }
        
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        
        canvas.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
            fraseConstelacao.classList.remove('visivel');
        });
        
        window.addEventListener('resize', resize);
        resize();
        desenhar();
    }

    // Scroll suave entre seções
    window.addEventListener('wheel', (e) => {
        const currentSection = Array.from(sections).findIndex(s => s.classList.contains('active'));
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
            mostrarSecao(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
            mostrarSecao(currentSection - 1);
        }
    });

    // Teclas de seta
    window.addEventListener('keydown', (e) => {
        const currentSection = Array.from(sections).findIndex(s => s.classList.contains('active'));
        if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
            mostrarSecao(currentSection + 1);
        } else if (e.key === 'ArrowLeft' && currentSection > 0) {
            mostrarSecao(currentSection - 1);
        }
    });

    // Contador emocional
    const dataInicio = new Date('2024-01-01'); // Ajuste para a data de vocês
    const hoje = new Date();
    const diffTime = Math.abs(hoje - dataInicio);
    const diffDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const contador = document.createElement('div');
    contador.className = 'contador';
    contador.innerHTML = `Há ${diffDias} dias você mudou completamente a minha vida.`;
    document.querySelector('#timeline .container').appendChild(contador);
});
