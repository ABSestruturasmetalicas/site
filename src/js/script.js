document.getElementById('showProductsBtn').addEventListener('click', function() {
    const productsList = document.getElementById('productsList');
    // Alterna a visibilidade da lista de produtos
    if (productsList.style.display === 'none') {
        productsList.style.display = 'block';
    } else {
        productsList.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let sequence = "";
    const easterEggCode = "serralheiro";

    document.addEventListener("keydown", function (event) {
        sequence += event.key.toLowerCase();
        if (!easterEggCode.startsWith(sequence)) {
            sequence = event.key.toLowerCase(); 
        }
        if (sequence === easterEggCode) {
            activateEasterEgg();
            sequence = ""; 
        }
    });

    function activateEasterEgg() {
        document.addEventListener("mousemove", createSparks);
        setTimeout(() => {
            document.removeEventListener("mousemove", createSparks);
        }, 5000);
    }

    function createSparks(event) {
        for (let i = 0; i < 5; i++) {
            const spark = document.createElement("div");
            spark.classList.add("spark");
            document.body.appendChild(spark);

            const size = Math.random() * 5 + 3;
            spark.style.width = `${size}px`;
            spark.style.height = `${size}px`;

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            const velocityX = Math.cos(angle) * speed;
            const velocityY = Math.sin(angle) * speed;

            spark.style.left = `${event.clientX}px`;
            spark.style.top = `${event.clientY}px`;

            let posX = event.clientX;
            let posY = event.clientY;
            let opacity = 1;

            function animateSpark() {
                posX += velocityX;
                posY += velocityY;
                opacity -= 0.05;

                spark.style.left = `${posX}px`;
                spark.style.top = `${posY}px`;
                spark.style.opacity = opacity;

                if (opacity > 0) {
                    requestAnimationFrame(animateSpark);
                } else {
                    spark.remove();
                }
            }

            animateSpark();
        }
    }
});

window.onscroll = function() {
    let backToTopBtn = document.getElementById('backToTopBtn');
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollPosition = window.innerHeight + window.scrollY;

    // Verifica se o usuário está no final da página
    if (scrollPosition >= scrollHeight - 1) {
        backToTopBtn.style.display = "block"; // Exibe o botão
    } else {
        backToTopBtn.style.display = "none"; // Esconde o botão
    }
};

// Função para rolar suavemente até o topo
document.getElementById("backToTopBtn").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Seleciona todos os botões de imagem na galeria
const buttons = document.querySelectorAll('.image-button');

// Seleciona o modal e o botão de fechar
const modal = document.getElementById('modal');
const modalImg = document.getElementById('imagem-ampliada');
const closeBtn = document.querySelector('.close');

// Adiciona um evento de clique em cada botão de imagem
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Altera a fonte da imagem ampliada para a imagem clicada
        const imgSrc = this.querySelector('img').src;
        modalImg.src = imgSrc;
        
        // Exibe o modal
        modal.style.display = "block";
    });
});

// Fecha o modal quando o botão de fechar for clicado
closeBtn.addEventListener('click', function() {
    modal.style.display = "none";
});

// Fecha o modal se o usuário clicar fora da imagem (na área escura)
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
