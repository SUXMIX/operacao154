document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-start');
    const introScreen = document.getElementById('intro-screen');
    const soonScreen = document.getElementById('soon-screen');

    btn.addEventListener('click', () => {
        // Efeito de fade out na primeira tela
        introScreen.style.opacity = '0';
        
        setTimeout(() => {
            introScreen.style.display = 'none';
            
            // Ativa a tela "Em Breve"
            soonScreen.style.display = 'flex';
            soonScreen.style.opacity = '0';
            
            // Pequeno delay para o fade in suave
            setTimeout(() => {
                soonScreen.style.opacity = '1';
                soonScreen.style.transition = 'opacity 2s ease';
            }, 50);
            
        }, 1000); // Espera a animação de saída terminar
    });
});
