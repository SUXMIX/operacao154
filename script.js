// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    const botaoSim = document.getElementById('botao-sim');
    const paginaInicial = document.getElementById('pagina-inicial');
    const paginaBreve = document.getElementById('pagina-breve');

    // Função para transição suave entre páginas
    function transitarParaBreve() {
        // Adiciona classe para fade out na página inicial
        paginaInicial.style.opacity = '0';
        setTimeout(() => {
            paginaInicial.classList.add('oculto');
            paginaBreve.classList.remove('oculto');
            paginaBreve.style.opacity = '1';
        }, 500); // Tempo da transição
    }

    // Evento de clique no botão
    botaoSim.addEventListener('click', transitarParaBreve);

    // Opcional: Adicionar efeito de hover no botão com JS para mais interatividade
    botaoSim.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });

    botaoSim.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});
