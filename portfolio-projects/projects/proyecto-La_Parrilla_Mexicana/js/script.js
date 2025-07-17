// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animate on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate-on-scroll");
  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Form submission
document.getElementById("reservaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const nombre = formData.get("nombre");
  const telefono = formData.get("telefono");
  const fecha = formData.get("fecha");
  const hora = formData.get("hora");
  const personas = formData.get("personas");
  const comentarios = formData.get("comentarios");

  // Validate required fields
  if (!nombre || !telefono || !fecha || !hora || !personas) {
    alert("Por favor, completa todos los campos obligatorios.");
    return;
  }

  // Validate date (not in the past)
  const selectedDate = new Date(fecha);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    alert("Por favor, selecciona una fecha válida.");
    return;
  }

  // Create WhatsApp message
  const message = `¡Hola! Me gustaría hacer una reserva en La Parrilla Mexicana:
            
👤 Nombre: ${nombre}
📞 Teléfono: ${telefono}
📅 Fecha: ${fecha}
⏰ Hora: ${hora}
👥 Personas: ${personas}
${comentarios ? `💬 Comentarios: ${comentarios}` : ""}
            
¡Gracias!`;

  // Send to WhatsApp
  const whatsappUrl = `https://wa.me/529991234567?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");

  // Show success message
  alert("¡Reserva enviada! Te contactaremos pronto para confirmar tu reserva.");
  this.reset();
});

// Download menu function
function downloadMenu() {
  // Create a simple PDF-like content
  const menuContent = `
MENÚ - LA PARRILLA MEXICANA
===============================

🥩 ESPECIALIDADES DE LA PARRILLA
- Arrachera Premium ..................... $280
- Rib Eye 400g .......................... $380
- T-Bone 450g ........................... $420
- Fajitas Mixtas ........................ $240
- Parrillada para 2 ..................... $480

🌮 ANTOJITOS MEXICANOS
- Tacos al Pastor (5 piezas) ............ $85
- Quesadillas de Flor de Calabaza ....... $95
- Guacamole con Totopos ................. $75
- Nachos Supremos ....................... $120

🍹 BEBIDAS
- Margarita Clásica ..................... $95
- Agua de Horchata ...................... $45
- Cerveza Nacional ...................... $35
- Refrescos ............................. $25

🍮 POSTRES
- Flan Napolitano ....................... $55
- Churros con Cajeta .................... $65
- Helado de Vainilla .................... $45

📞 Reservas: +52 999 123 4567
📍 Calle 60 #475, Centro, Mérida, Yucatán
`;

  // Create a blob and download
  const blob = new Blob([menuContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Menu_La_Parrilla_Mexicana.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Gallery image lazy loading simulation
const galleryItems = document.querySelectorAll(".gallery-item");
galleryItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`;
});

// Add loading animation to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    if (this.type === "submit") {
      this.style.opacity = "0.7";
      this.innerHTML = "Enviando...";
      setTimeout(() => {
        this.style.opacity = "1";
        this.innerHTML = "Confirmar Reserva";
      }, 2000);
    }
  });
});

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", function () {
  // Add entrance animations
  setTimeout(() => {
    document.querySelector(".hero-content").style.opacity = "1";
    document.querySelector(".hero-content").style.transform = "translateY(0)";
  }, 100);

  // Set minimum date for reservations to today
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("fecha").setAttribute("min", today);
});

// Performance optimization - throttle scroll events
let ticking = false;
function updateScrollEffects() {
  // Header effect
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Animate on scroll
  animateOnScroll();
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}

window.addEventListener("scroll", requestTick);

// Add hover effects to gallery items
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add click tracking for analytics (simulation)
document.querySelectorAll("a, button").forEach((element) => {
  element.addEventListener("click", function () {
    // Simulate analytics tracking
    console.log("Click tracked:", this.textContent || this.alt || this.title);
  });
});

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
  if (window.innerWidth <= 768) {
    const nav = document.querySelector("nav ul");
    const header = document.querySelector("header");

    if (!document.querySelector(".mobile-menu-toggle")) {
      const toggle = document.createElement("button");
      toggle.className = "mobile-menu-toggle";
      toggle.innerHTML = "☰";
      toggle.style.cssText = `
                        background: none;
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        cursor: pointer;
                        display: block;
                    `;

      toggle.addEventListener("click", () => {
        nav.style.display = nav.style.display === "flex" ? "none" : "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "100%";
        nav.style.left = "0";
        nav.style.right = "0";
        nav.style.background = "var(--primary-color)";
        nav.style.padding = "1rem";
        nav.style.boxShadow = "var(--shadow)";
      });

      document.querySelector(".nav-container").appendChild(toggle);
    }
  }
};

window.addEventListener("resize", createMobileMenu);
createMobileMenu();
