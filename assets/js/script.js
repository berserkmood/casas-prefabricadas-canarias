/* ========================================= */
/* SCRIPT PRINCIPAL - Casas Prefabricadas Canarias */
/* VERSIÓN SIMPLIFICADA Y CORREGIDA */
/* ========================================= */

// =========================================
// FUNCIONES DE UTILIDAD
// =========================================
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function smoothScroll(element, offset = 80) {
    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
    }
}

// =========================================
// HEADER SCROLL
// =========================================
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 100));
}

// =========================================
// DROPDOWN ISLAS DESKTOP - VERSIÓN MEJORADA
// =========================================
function initDropdownIslas() {
    console.log('🔧 Inicializando dropdown desktop...');
    
    const dropdown = document.getElementById('dropdownIslas');
    const dropdownBtn = document.getElementById('dropdownIslasBtn');
    
    if (!dropdown) {
        console.warn('⚠️ No se encontró #dropdownIslas');
        return;
    }
    
    if (!dropdownBtn) {
        console.warn('⚠️ No se encontró #dropdownIslasBtn');
        return;
    }
    
    console.log('✅ Elementos encontrados:', { dropdown, dropdownBtn });
    
    // Eliminar event listeners previos para evitar duplicados
    const newBtn = dropdownBtn.cloneNode(true);
    dropdownBtn.parentNode.replaceChild(newBtn, dropdownBtn);
    const newDropdownBtn = newBtn;
    
    // Función para abrir/cerrar
    function toggleDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('open');
        console.log('Dropdown toggled, clase open:', dropdown.classList.contains('open'));
    }
    
    newDropdownBtn.addEventListener('click', toggleDropdown);
    
    // Cerrar al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            if (dropdown.classList.contains('open')) {
                dropdown.classList.remove('open');
                console.log('Dropdown cerrado por click fuera');
            }
        }
    });
    
    // Prevenir que el click en el dropdown cierre
    dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    console.log('✅ Dropdown inicializado correctamente');
}
// =========================================
// MENÚ MÓVIL
// =========================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const menuContainer = document.getElementById('mobile-menu-container');
    const menuClose = document.getElementById('mobile-menu-close');
    
    if (!menuBtn || !menuContainer || !menuClose) return;
    
    function openMenu() {
        menuContainer.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        menuContainer.classList.remove('open');
        document.body.style.overflow = '';
        
        // Resetear submenú de islas
        const submenu = document.getElementById('mobileIslasSubmenu');
        const icon = document.getElementById('mobileIslasIcon');
        if (submenu && icon) {
            submenu.classList.remove('show');
            icon.style.transform = 'rotate(0deg)';
        }
    }
    
    menuBtn.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    menuContainer.addEventListener('click', (e) => {
        if (e.target === menuContainer) closeMenu();
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuContainer.classList.contains('open')) closeMenu();
    });
}

// =========================================
// ISLAS MÓVIL (TOGGLE)
// =========================================
function initMobileIslasToggle() {
    const trigger = document.getElementById('mobileIslasTrigger');
    const submenu = document.getElementById('mobileIslasSubmenu');
    const icon = document.getElementById('mobileIslasIcon');
    
    if (!trigger || !submenu || !icon) return;
    
    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = submenu.classList.contains('show');
        if (isOpen) {
            submenu.classList.remove('show');
            icon.style.transform = 'rotate(0deg)';
        } else {
            submenu.classList.add('show');
            icon.style.transform = 'rotate(180deg)';
        }
    });
}

// =========================================
// CARRUSEL MODERNO
// =========================================
function initCarousel() {
    const track = document.getElementById('carouselModernTrack');
    const slides = document.querySelectorAll('.carousel-modern-slide');
    const dotsContainer = document.getElementById('carouselModernDots');
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    
    if (!track || !slides.length || !dotsContainer || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        document.querySelectorAll('.carousel-modern-dots .dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    createDots();
}

// =========================================
// BOTÓN VOLVER ARRIBA
// =========================================
function initBackToTop() {
    const button = document.getElementById('backToTop');
    if (!button) return;
    
    const indexElement = document.querySelector('.article-menu') || document.querySelector('#indice');
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    }, 100));
    
    button.addEventListener('click', () => {
        if (indexElement) {
            smoothScroll(indexElement, 80);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// =========================================
// FAQ ACCORDION
// =========================================
function initFaqAccordion() {
    document.querySelectorAll('details.faq-item').forEach(details => {
        const summary = details.querySelector('summary');
        if (summary) {
            summary.addEventListener('click', (e) => {
                e.preventDefault();
                if (details.hasAttribute('open')) {
                    details.removeAttribute('open');
                } else {
                    details.setAttribute('open', '');
                }
            });
        }
    });
}

// =========================================
// ANIMACIONES SCROLL
// =========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.animate-fade-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// =========================================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// =========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    smoothScroll(target, 80);
                }
            }
        });
    });
}

// =========================================
// FORMULARIO
// =========================================
function initForm() {
    const form = document.getElementById('contact-form-filtered');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Validar checkbox
        const checkbox = form.querySelector('input[type="checkbox"][required]');
        if (checkbox && !checkbox.checked) {
            alert('Debes aceptar la política de privacidad para continuar.');
            checkbox.focus();
            return;
        }
        
        // Validar teléfono
        const phone = form.querySelector('input[type="tel"]');
        if (phone && phone.value && !/^[6-9]\d{8}$/.test(phone.value.replace(/\s/g, ''))) {
            alert('Por favor, introduce un teléfono móvil español válido (9 dígitos).');
            phone.focus();
            return;
        }
        
        // Validar email
        const email = form.querySelector('input[type="email"]');
        if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            alert('Por favor, introduce un email válido.');
            email.focus();
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                const successMsg = document.getElementById('success-message-filtered');
                if (successMsg) successMsg.classList.remove('hidden');
                form.reset();
                
                setTimeout(() => {
                    window.location.href = 'https://casasprefabricadascanarias.es/gracias.html';
                }, 1500);
            } else {
                alert('Hubo un error. Por favor, intenta de nuevo.');
            }
        } catch (error) {
            alert('Error de conexión. Por favor, intenta de nuevo.');
        } finally {
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 3000);
        }
    });
}

// =========================================
// INICIALIZACIÓN - VERSIÓN MEJORADA
// =========================================

// Función principal de inicialización
function initAll() {
    console.log('🚀 Inicializando scripts...');
    
    initHeaderScroll();
    initDropdownIslas();
    initMobileMenu();
    initMobileIslasToggle();
    initCarousel();
    initBackToTop();
    initFaqAccordion();
    initScrollAnimations();
    initSmoothScroll();
    initForm();
    
    console.log('✅ Todos los scripts inicializados correctamente');
}

// Ejecutar cuando el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    // DOM ya está cargado
    initAll();
}