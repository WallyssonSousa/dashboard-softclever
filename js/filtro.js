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

function filterCards(period) {
    var cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        if (period === "" || card.dataset.period === period) {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
            card.style.display = "block";
        } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.9)";
            setTimeout(() => card.style.display = "none", 300);
        }
    });
}

function filterByCategory(category) {
    var cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        if (category === "" || card.dataset.category === category) {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
            card.style.display = "block";
        } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.9)";
            setTimeout(() => card.style.display = "none", 300);
        }
    });
}
