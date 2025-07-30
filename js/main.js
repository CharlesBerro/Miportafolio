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

