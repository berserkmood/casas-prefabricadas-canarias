/* ========================================= */
/* SCRIPT PRINCIPAL - Casas Prefabricadas Canarias */
/* ========================================= */

// =========================================
// HEADER SCROLL EFFECT
// =========================================
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// =========================================
// FUNCIONES PARA EL MENÚ MÓVIL MEJORADO
// =========================================

// Variables globales para el menú móvil
let mobileMenuContainer, mobileMenuButton, mobileMenuClose;

// Inicializar elementos del menú móvil
function initMobileMenu() {
    mobileMenuContainer = document.getElementById('mobile-menu-container');
    mobileMenuButton = document.getElementById('mobile-menu-button');
    mobileMenuClose = document.getElementById('mobile-menu-close');
}

// Función para abrir el menú móvil
function openMobileMenu() {
    if (mobileMenuContainer) {
        mobileMenuContainer.classList.add('open');
        document.body.style.overflow = 'hidden'; // Evitar scroll del body
    }
}

// Función para cerrar el menú móvil
function closeMobileMenu() {
    if (mobileMenuContainer) {
        mobileMenuContainer.classList.remove('open');
        document.body.style.overflow = ''; // Restaurar scroll del body
    }
}

// Configurar event listeners del menú móvil
function setupMobileMenu() {
    // Abrir menú móvil
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            openMobileMenu();
        });
    }

    // Cerrar menú móvil con botón X
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Cerrar menú móvil al hacer clic fuera
    if (mobileMenuContainer) {
        mobileMenuContainer.addEventListener('click', function(e) {
            if (e.target === mobileMenuContainer) {
                closeMobileMenu();
            }
        });
    }

    // Cerrar menú móvil al hacer clic en enlaces
    document.querySelectorAll('.mobile-menu-item, .mobile-menu-cta a').forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Cerrar menú móvil con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuContainer && mobileMenuContainer.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    // ELIMINADO: Evento que cerraba el menú al hacer scroll (mala UX en móviles)
    // Ahora el menú permanece abierto aunque el usuario haga scroll accidental
}

// =========================================
// FORMULARIO FORMSPREE
// =========================================

// Función para manejar el envío de formularios
function handleFormSubmit(formId, successMessageId) {
    const contactFormFiltered = document.getElementById(formId);
    
    if (contactFormFiltered) {
        contactFormFiltered.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const successMessage = document.getElementById(successMessageId);
            
            // Deshabilitar botón durante el envío
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Mostrar mensaje de éxito
                    if (successMessage) {
                        successMessage.classList.remove('hidden');
                    }
                    
                    this.reset();
                    
                    // Scroll al mensaje de éxito
                    if (successMessage) {
                        successMessage.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                    
                    // 🔴 NUEVO: Redirigir a gracias.html después de 1.5 segundos
                    setTimeout(function() {
                        window.location.href = 'https://casasprefabricadascanarias.es/gracias.html';
                    }, 1500);
                    
                    // Restaurar botón después de 3 segundos (por si acaso)
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.innerHTML = 'Enviar solicitud <i class="fas fa-paper-plane ml-2"></i>';
                    }, 3000);
                } else {
                    alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Enviar solicitud <i class="fas fa-paper-plane ml-2"></i>';
                }
            } catch (error) {
                alert('Error de conexión. Por favor, intenta de nuevo.');
                submitButton.disabled = false;
                submitButton.innerHTML = 'Enviar solicitud <i class="fas fa-paper-plane ml-2"></i>';
            }
        });
    }
}

// Configurar todos los formularios de la página
function setupForms() {
    // Formulario principal (común en todas las páginas)
    handleFormSubmit('contact-form-filtered', 'success-message-filtered');
    
    // Puedes añadir más formularios aquí si los tienes
    // handleFormSubmit('otro-formulario', 'otro-mensaje-exito');
}

// =========================================
// FAQ ACCORDION
// =========================================

// Función para configurar el accordion de FAQ
function setupFaqAccordion() {
    document.querySelectorAll('details.faq-item').forEach(details => {
        const summary = details.querySelector('summary');
        
        if (summary) {
            summary.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Si es un FAQ exclusivo (solo uno abierto a la vez)
                if (details.classList.contains('faq-exclusive')) {
                    // Cerrar todos los demás elementos FAQ
                    document.querySelectorAll('details.faq-item').forEach(otherDetails => {
                        if (otherDetails !== details) {
                            otherDetails.removeAttribute('open');
                        }
                    });
                }
                
                // Alternar elemento actual
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
// ANIMACIONES AL SCROLL
// =========================================

// Configurar animaciones de elementos al hacer scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos con animate-fade-up class
    document.querySelectorAll('.animate-fade-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// =========================================
// VALIDACIÓN DE FORMULARIOS
// =========================================

// Función opcional para validación de formularios
function setupFormValidation() {
    const forms = document.querySelectorAll('form[id*="contact-form"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Validación básica de teléfono español
            const telefono = this.querySelector('input[type="tel"]');
            if (telefono && telefono.value) {
                const phoneRegex = /^[6-9]\d{8}$/;
                const phoneNumber = telefono.value.replace(/\s/g, '');
                
                if (!phoneRegex.test(phoneNumber)) {
                    alert('Por favor, introduce un teléfono móvil español válido (9 dígitos, empezando por 6, 7, 8 o 9).');
                    e.preventDefault();
                    telefono.focus();
                    return;
                }
            }
            
            // Validación básica de email
            const email = this.querySelector('input[type="email"]');
            if (email && email.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!emailRegex.test(email.value)) {
                    alert('Por favor, introduce un email válido.');
                    e.preventDefault();
                    email.focus();
                    return;
                }
            }
            
            // Validación de checkbox de privacidad
            const privacyCheckbox = this.querySelector('input[type="checkbox"][required]');
            if (privacyCheckbox && !privacyCheckbox.checked) {
                alert('Debes aceptar la política de privacidad para continuar.');
                e.preventDefault();
                privacyCheckbox.focus();
                return;
            }
        });
    });
}

// =========================================
// REDIRECCIÓN AUTOMÁTICA PARA PÁGINAS DE AGRADECIMIENTO
// =========================================

// Configurar redirección automática después de 15 segundos en páginas de agradecimiento
// =========================================
// REDIRECCIÓN AUTOMÁTICA PARA PÁGINAS DE AGRADECIMIENTO
// =========================================

// Configurar redirección automática después de 15 segundos en páginas de agradecimiento
function setupThankYouRedirect() {
    // Verificar si estamos en una página de agradecimiento
    const thankYouContainer = document.querySelector('.thank-you-container');
    
    if (thankYouContainer) {
        let userInteracted = false;
        
        // Redirección después de 15 segundos a la página principal
        setTimeout(function() {
            if (!userInteracted) {
                window.location.href = 'https://casasprefabricadascanarias.es';
            }
        }, 15000); // 15 segundos

        // Detectar interacción del usuario
        document.addEventListener('click', function() {
            userInteracted = true;
        });

        document.addEventListener('keydown', function() {
            userInteracted = true;
        });
        
        // Detectar movimiento del mouse (opcional)
        document.addEventListener('mousemove', function() {
            userInteracted = true;
        });
        
        console.log('Redirección automática configurada para página de agradecimiento');
    }
}

// =========================================
// FUNCIONES DE INICIALIZACIÓN
// =========================================

// Función principal de inicialización
function init() {
    // Inicializar menú móvil
    initMobileMenu();
    setupMobileMenu();
    
    // Configurar formularios
    setupForms();
    
    // Configurar FAQ accordion
    setupFaqAccordion();
    
    // Configurar animaciones al scroll
    setupScrollAnimations();
    
    // Configurar validación de formularios (opcional)
    // setupFormValidation();
    
    // Configurar redirección para páginas de agradecimiento
    setupThankYouRedirect();
    
    // Añadir otras inicializaciones aquí...
}

// =========================================
// UTILIDADES ADICIONALES
// =========================================

// Función para hacer smooth scroll a secciones
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo manejar enlaces que sean IDs en la misma página
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Ajuste para header fijo
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Función para mejorar accesibilidad del menú móvil
function improveMobileMenuAccessibility() {
    // Asegurar que el menú sea accesible por teclado
    if (mobileMenuButton) {
        mobileMenuButton.setAttribute('aria-label', 'Abrir menú de navegación');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.setAttribute('aria-controls', 'mobile-menu-container');
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.setAttribute('aria-label', 'Cerrar menú de navegación');
    }
    
    // Actualizar estado ARIA cuando el menú se abre/cierra
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                const isOpen = mobileMenuContainer.classList.contains('open');
                if (mobileMenuButton) {
                    mobileMenuButton.setAttribute('aria-expanded', isOpen.toString());
                }
                
                // Mover foco al menú cuando se abre
                if (isOpen && mobileMenuClose) {
                    setTimeout(() => {
                        mobileMenuClose.focus();
                    }, 100);
                }
            }
        });
    });
    
    if (mobileMenuContainer) {
        observer.observe(mobileMenuContainer, { attributes: true });
    }
}

// =========================================
// EJECUCIÓN AL CARGAR LA PÁGINA
// =========================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    init();
    
    // Configurar smooth scroll
    setupSmoothScroll();
    
    // Mejorar accesibilidad del menú móvil
    improveMobileMenuAccessibility();
    
    // Añadir clase de JavaScript activo para estilos específicos
    document.documentElement.classList.add('js-active');
    
    console.log('Scripts de Casas Prefabricadas Canarias inicializados correctamente.');
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', function() {
    // Si el menú está abierto y la pantalla se hace grande, cerrarlo
    if (window.innerWidth >= 768 && mobileMenuContainer && mobileMenuContainer.classList.contains('open')) {
        closeMobileMenu();
    }
});

// =========================================
// EXPORTACIÓN DE FUNCIONES (para uso en consola de desarrollo)
// =========================================

// Hacer disponibles funciones útiles en la consola de desarrollo
if (typeof window !== 'undefined') {
    window.CasasPrefabricadasCanarias = {
        openMobileMenu,
        closeMobileMenu,
        init,
        setupForms,
        setupFaqAccordion,
        setupScrollAnimations,
        setupSmoothScroll,
        setupThankYouRedirect
    };

}

