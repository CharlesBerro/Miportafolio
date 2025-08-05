// js/main.js
// js/main.js

document.addEventListener('DOMContentLoaded', function () {

    // --- Configuración de Typed.js (si quieres mantenerla) ---
    if (document.querySelector('#typed-text')) {
        const options = {
            strings: [
                'Desarrollador  Sitios Web.',
                'Creador de Dashboards en Excel.',
                'Te ayudo en Soporte Técnico.',
                'Analisis de Datos Tablas Dinamicas.',
                'Diseñador de Catálogos Digitales.'
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 2000,
            loop: true
        };
        const typed = new Typed('#typed-text', options);
    }

    // --- Smooth Scroll y Active Nav Link ---
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');

    // 1. Smooth Scroll al hacer clic en un enlace de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Calcula la posición del objetivo, restando la altura de la navbar
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Cierra el menú de hamburguesa en móviles después de hacer clic
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // 2. Resaltar el enlace activo mientras se hace scroll
    function onScroll() {
        let currentSection = '';
        const navbarHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50; // -50 es un pequeño offset
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Llama a la función una vez al cargar para establecer el estado inicial
});

// --- Lógica para el Carrusel 3D de Habilidades ---
const carousel = document.querySelector('.carousel');
if (carousel) { // Solo ejecuta si el carrusel existe en la página
    const cells = carousel.querySelectorAll('.carousel__cell');
    const cellCount = cells.length;


    let selectedIndex = 0;
    const rotateFn = 'rotateY'; // Podemos girar en Y o en X

    // Calcula el radio del círculo basado en el tamaño de las celdas
    const radius = Math.round((190 / 2) / Math.tan(Math.PI / cellCount));

    // Posiciona cada celda en el círculo 3D
    cells.forEach((cell, i) => {
        const cellAngle = (360 / cellCount) * i;
        const content = cell.querySelector('.cell__content');

        // 1. Posiciona la tarjeta (la celda) en el círculo
        cell.style.transform = `${rotateFn}(${cellAngle}deg) translateZ(${radius}px)`;

        // 2. Rota el contenido en la dirección OPUESTA para que siempre mire al frente
        if (content) {
            content.style.transform = `${rotateFn}(${-cellAngle}deg)`;
        }
    });

    function rotateCarousel() {
        const angle = (360 / cellCount) * selectedIndex * -1;
        carousel.style.transform = `translateZ(-${radius}px) ${rotateFn}(${angle}deg)`;
    }


    // Rotación automática (opcional)
    setInterval(() => {
        selectedIndex++;
        rotateCarousel();
    }, 1500); // Gira cada 4 segundos

    rotateCarousel(); // Posiciona el carrusel inicialmente
}

