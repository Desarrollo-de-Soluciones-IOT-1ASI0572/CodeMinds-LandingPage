// Función para obtener el idioma del navegador
function getBrowserLanguage() {
    return navigator.language.split('-')[0] || 'es';
}

// Función para obtener el idioma guardado
function getSavedLanguage() {
    return localStorage.getItem('language') || getBrowserLanguage();
}

// Función para guardar el idioma seleccionado
function saveLanguage(lang) {
    localStorage.setItem('language', lang);
}

// Función para traducir el contenido
function translateContent(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = translations[lang];
        for (const k of keys) {
            translation = translation[k];
        }
        if (translation) {
            element.textContent = translation;
        }
    });

    // Traducir placeholders
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const keys = key.split('.');
        let translation = translations[lang];
        for (const k of keys) {
            translation = translation[k];
        }
        if (translation) {
            element.placeholder = translation;
        }
    });

    // Actualizar el atributo lang del HTML
    document.documentElement.lang = lang;
}

// Inicializar el selector de idiomas
const languageSelect = document.getElementById('language-select');
const currentLang = getSavedLanguage();

// Establecer el idioma inicial
languageSelect.value = currentLang;
translateContent(currentLang);

// Manejar el cambio de idioma
languageSelect.addEventListener('change', (e) => {
    const newLang = e.target.value;
    saveLanguage(newLang);
    translateContent(newLang);
});

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación del header al hacer scroll
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Formulario de contacto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí iría la lógica para enviar el formulario
    // Por ahora solo mostraremos un mensaje de éxito
    const currentLang = getSavedLanguage();
    alert(translations[currentLang].contacto.exito);
    contactForm.reset();
});

// Animación de elementos al hacer scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.feature-card, .benefit-item').forEach(el => {
    observer.observe(el);
});

// Menú móvil
const menuButton = document.createElement('button');
menuButton.classList.add('menu-button');
menuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').prepend(menuButton);

menuButton.addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('show');
});

// Añadir clase para animación
document.querySelectorAll('.feature-card, .benefit-item').forEach(el => {
    el.classList.add('fade-in');
}); 