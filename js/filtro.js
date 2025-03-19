document.getElementById('filtroGrafico').addEventListener('input', function() {
    const filtro = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const titulo = card.querySelector('h3').textContent.toLowerCase();
        if (titulo.includes(filtro)) {
            card.style.display = ''; 
        } else {
            card.style.display = 'none'; 
        }
    });
});