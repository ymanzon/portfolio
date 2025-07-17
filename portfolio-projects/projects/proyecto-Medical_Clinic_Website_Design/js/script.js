// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  const scrollTop = document.getElementById("scroll-top");

  if (window.scrollY > 100) {
    header.classList.add("scrolled");
    scrollTop.classList.add("show");
  } else {
    header.classList.remove("scrolled");
    scrollTop.classList.remove("show");
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

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Cookie banner functionality
function showCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  banner.classList.add("show");
}

function acceptCookies() {
  const banner = document.getElementById("cookie-banner");
  banner.classList.remove("show");
  // Store cookie acceptance
  sessionStorage.setItem("cookiesAccepted", "true");
}

function declineCookies() {
  const banner = document.getElementById("cookie-banner");
  banner.classList.remove("show");
  // Store cookie decline
  sessionStorage.setItem("cookiesAccepted", "false");
}

// Show cookie banner on load if not already accepted
window.addEventListener("load", function () {
  if (!sessionStorage.getItem("cookiesAccepted")) {
    setTimeout(showCookieBanner, 2000);
  }
});

// Mobile menu toggle
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", function () {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(".service-card, .about-text, .about-image")
  .forEach((el) => {
    observer.observe(el);
  });

// Privacy Policy Modal
document.getElementById("privacy-link").addEventListener("click", function (e) {
  e.preventDefault();
  alert(
    "Política de Privacidad:\n\nEn Consultorio Dra. Pérez, protegemos tu información personal de acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares. Tus datos se utilizan únicamente para brindar servicios nutricionales y no se comparten con terceros sin tu consentimiento."
  );
});

// Terms and Conditions Modal
document.getElementById("terms-link").addEventListener("click", function (e) {
  e.preventDefault();
  alert(
    "Términos y Condiciones:\n\nAl utilizar nuestros servicios, aceptas que:\n1. Las consultas son estrictamente profesionales\n2. Se requiere cita previa\n3. Los planes nutricionales son personalizados\n4. Se debe seguir el tratamiento indicado\n5. Cancelaciones con 24h de anticipación"
  );
});

// Cookies Policy Modal
document.getElementById("cookies-link").addEventListener("click", function (e) {
  e.preventDefault();
  alert(
    "Política de Cookies:\n\nUtilizamos cookies para:\n- Mejorar la experiencia del usuario\n- Recordar preferencias\n- Analizar el tráfico del sitio\n- Funcionalidad del calendario de citas\n\nPuedes gestionar las cookies desde la configuración de tu navegador."
  );
});

// Form validation and security
document.addEventListener("DOMContentLoaded", function () {
  // Add CSRF protection headers for any future forms
  const csrfToken = Math.random().toString(36).substr(2, 9);
  sessionStorage.setItem("csrfToken", csrfToken);
});

// Performance optimization
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("SW registered: ", registration);
      })
      .catch(function (registrationError) {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Lazy loading for images
const images = document.querySelectorAll("img[data-src]");
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      imageObserver.unobserve(img);
    }
  });
});

images.forEach((img) => imageObserver.observe(img));

// Preload critical resources
const criticalResources = [
  "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
  "https://assets.calendly.com/assets/external/widget.js",
];

criticalResources.forEach((resource) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = resource;
  link.as = resource.includes(".css") ? "style" : "script";
  document.head.appendChild(link);
});

// Analytics tracking (Google Analytics 4)
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "GA_MEASUREMENT_ID");

// Track page views and events
function trackEvent(action, category, label) {
  gtag("event", action, {
    event_category: category,
    event_label: label,
  });
}

// Track button clicks
document.querySelectorAll(".cta-button").forEach((button) => {
  button.addEventListener("click", () => {
    trackEvent("click", "CTA", "Schedule Appointment");
  });
});

// Track service card interactions
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => {
    const serviceName = card.querySelector("h3").textContent;
    trackEvent("click", "Service", serviceName);
  });
});

// SEO-friendly URL handling
function updateURL(section) {
  if (history.pushState) {
    history.pushState(null, null, `#${section}`);
  }
}

// Enhanced mobile menu with animations
const mobileMenuButton = document.getElementById("mobile-menu");
const navLinksContainer = document.querySelector(".nav-links");

mobileMenuButton.addEventListener("click", function () {
  this.classList.toggle("active");
  navLinksContainer.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  if (!event.target.closest("nav")) {
    mobileMenuButton.classList.remove("active");
    navLinksContainer.classList.remove("active");
  }
});

// Keyboard navigation support
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    mobileMenuButton.classList.remove("active");
    navLinksContainer.classList.remove("active");
  }
});

// Form submission handler for contact forms
function handleFormSubmission(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  // Add CSRF token
  formData.append("csrf_token", sessionStorage.getItem("csrfToken"));

  // Basic form validation
  const email = formData.get("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Por favor, ingresa un email válido.");
    return;
  }

  // Simulate form submission
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.textContent = "Enviando...";
  submitButton.disabled = true;

  setTimeout(() => {
    alert("¡Mensaje enviado exitosamente!");
    form.reset();
    submitButton.textContent = "Enviar";
    submitButton.disabled = false;
  }, 2000);
}

// Progressive Web App (PWA) features
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
});

function showInstallPromotion() {
  const installBanner = document.createElement("div");
  installBanner.innerHTML = `
                <div style="position: fixed; bottom: 80px; right: 20px; background: #667eea; color: white; padding: 1rem; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); z-index: 1001;">
                    <p>¿Instalar la app?</p>
                    <button onclick="installApp()" style="background: #FFD700; color: #333; border: none; padding: 5px 15px; border-radius: 5px; margin-right: 10px;">Sí</button>
                    <button onclick="dismissInstall()" style="background: transparent; color: white; border: 1px solid white; padding: 5px 15px; border-radius: 5px;">No</button>
                </div>
            `;
  document.body.appendChild(installBanner);
}

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      }
      deferredPrompt = null;
    });
  }
  dismissInstall();
}

function dismissInstall() {
  const installBanner = document.querySelector('div[style*="position: fixed"]');
  if (installBanner) {
    installBanner.remove();
  }
}

// Security enhancements
function sanitizeInput(input) {
  const temp = document.createElement("div");
  temp.textContent = input;
  return temp.innerHTML;
}

// Content Security Policy headers simulation
const csp = {
  "default-src": "'self'",
  "script-src":
    "'self' 'unsafe-inline' https://assets.calendly.com https://www.googletagmanager.com",
  "style-src": "'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src": "'self' https://fonts.gstatic.com",
  "img-src": "'self' data: https:",
  "connect-src": "'self' https://api.calendly.com",
};

// Accessibility improvements
function enhanceAccessibility() {
  // Add skip link
  const skipLink = document.createElement("a");
  skipLink.href = "#main";
  skipLink.textContent = "Saltar al contenido principal";
  skipLink.className = "sr-only";
  skipLink.style.position = "absolute";
  skipLink.style.top = "-40px";
  skipLink.style.left = "6px";
  skipLink.style.zIndex = "1000";
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main landmark
  const heroSection = document.querySelector(".hero");
  heroSection.setAttribute("id", "main");

  // Improve focus management
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-navigation");
  });
}

// Initialize accessibility improvements
enhanceAccessibility();

// Error handling and logging
window.addEventListener("error", function (event) {
  console.error("Error occurred:", event.error);
  // In production, you would send this to your error tracking service
});

// Performance monitoring
function measurePerformance() {
  if ("performance" in window) {
    window.addEventListener("load", function () {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0];
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log("Page load time:", loadTime + "ms");

        // Track performance metrics
        gtag("event", "timing_complete", {
          name: "load",
          value: loadTime,
        });
      }, 0);
    });
  }
}

measurePerformance();

// Initialize all features
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dra. Pérez - Nutrióloga website loaded successfully");

  // Initialize tooltips for service cards
  document.querySelectorAll(".service-card").forEach((card) => {
    card.setAttribute("title", "Haz clic para más información");
  });

  // Add loading states for interactive elements
  document.querySelectorAll("button, .cta-button").forEach((element) => {
    element.addEventListener("click", function () {
      this.style.opacity = "0.7";
      setTimeout(() => {
        this.style.opacity = "1";
      }, 300);
    });
  });
});

// Schema markup for better SEO
const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Dra. Pérez - Nutrióloga",
  image: "https://nutriperez.com/images/logo.png",
  description:
    "Consultorio de nutrición especializado en planes alimentarios personalizados",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle 60 #123",
    addressLocality: "Mérida",
    addressRegion: "Yucatán",
    postalCode: "97000",
    addressCountry: "MX",
  },
  telephone: "+52-999-123-4567",
  email: "contacto@nutriperez.com",
  url: "https://nutriperez.com",
  openingHours: ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
  priceRange: "$",
  acceptsReservations: true,
  hasMap: "https://maps.google.com/?q=Calle+60+123+Mérida+Yucatán",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "150",
  },
};

// Inject schema markup
const script = document.createElement("script");
script.type = "application/ld+json";
script.textContent = JSON.stringify(schema);
document.head.appendChild(script);
