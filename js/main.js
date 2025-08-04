// js/main.js
// js/main.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Configuración de Typed.js (si quieres mantenerla) ---
    if (document.querySelector('#typed-text')) {
        const options = {
            strings: [
                'Desarrollador Web.',
                'Creador de Dashboards en Excel.',
                'Especialista en Soporte Técnico.',
                'Diseñador de Catálogos Digitales.'
            ],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 1500,
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
        link.addEventListener('click', function(e) {
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
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');

        let selectedIndex = 0;
        const rotateFn = 'rotateY'; // Podemos girar en Y o en X

        // Calcula el radio del círculo basado en el tamaño de las celdas
        const radius = Math.round((190 / 2) / Math.tan(Math.PI / cellCount));

        // Posiciona cada celda en el círculo 3D
        cells.forEach((cell, i) => {
            const cellAngle = (360 / cellCount) * i;
            cell.style.transform = `${rotateFn}(${cellAngle}deg) translateZ(${radius}px)`;
        });

        function rotateCarousel() {
            const angle = (360 / cellCount) * selectedIndex * -1;
            carousel.style.transform = `translateZ(-${radius}px) ${rotateFn}(${angle}deg)`;
        }

        // Event Listeners para los botones
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                selectedIndex--;
                rotateCarousel();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                selectedIndex++;
                rotateCarousel();
            });
        }

        // Rotación automática (opcional)
        setInterval(() => {
            selectedIndex++;
            rotateCarousel();
        }, 4000); // Gira cada 4 segundos

        rotateCarousel(); // Posiciona el carrusel inicialmente
    }

