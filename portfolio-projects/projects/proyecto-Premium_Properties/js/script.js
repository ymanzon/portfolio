// Loading Screen
window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  setTimeout(() => {
    loading.classList.add("hidden");
  }, 1000);
});

// Header Scroll Effect
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth Scrolling
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

// Property Filters
const filterButtons = document.querySelectorAll(".filter-btn");
const propertyCards = document.querySelectorAll(".property-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    this.classList.add("active");

    const filter = this.getAttribute("data-filter");

    propertyCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block";
        card.style.animation = "fadeInUp 0.5s ease forwards";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Modal Functionality
const modal = document.getElementById("propertyModal");
const closeBtn = document.querySelector(".close");

function openModal(title, location, price, description) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalLocation").textContent = location;
  document.getElementById("modalPrice").textContent = price;
  document.getElementById("modalDescription").textContent = description;
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Scroll Reveal Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
    }
  });
}, observerOptions);

document.querySelectorAll(".scroll-reveal").forEach((element) => {
  observer.observe(element);
});

// Property Card Hover Effects
propertyCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Animated Counter (if needed for statistics)
function animateCounter(element, start, end, duration) {
  let startTime = null;

  function updateCounter(currentTime) {
    if (startTime === null) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

// Parallax Effect for Hero Section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Dynamic Property Loading (simulation)
function loadMoreProperties() {
  // This would typically fetch data from an API
  console.log("Loading more properties...");
}

// Search Functionality
function searchProperties(query) {
  const cards = document.querySelectorAll(".property-card");
  cards.forEach((card) => {
    const title = card
      .querySelector(".property-title")
      .textContent.toLowerCase();
    const location = card
      .querySelector(".property-location")
      .textContent.toLowerCase();
    const description = card
      .querySelector(".property-description")
      .textContent.toLowerCase();

    if (
      title.includes(query.toLowerCase()) ||
      location.includes(query.toLowerCase()) ||
      description.includes(query.toLowerCase())
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Price Range Filter
function filterByPrice(minPrice, maxPrice) {
  const cards = document.querySelectorAll(".property-card");
  cards.forEach((card) => {
    const priceText = card.querySelector(".property-price").textContent;
    const price = parseInt(priceText.replace(/[^\d]/g, ""));

    if (price >= minPrice && price <= maxPrice) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Contact Form Handling
function handleContactForm(event) {
  event.preventDefault();
  // Handle form submission
  alert("¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.");
}

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});

// Performance Optimization
let ticking = false;
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateAnimations);
    ticking = true;
  }
}

function updateAnimations() {
  // Update scroll-based animations
  ticking = false;
}

// Error Handling
window.addEventListener("error", function (event) {
  console.error("Error occurred:", event.error);
});

// Analytics Integration (placeholder)
function trackPropertyView(propertyId) {
  // Integration with Google Analytics or similar
  console.log("Property viewed:", propertyId);
}

// Social Media Sharing
function shareProperty(title, url) {
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url,
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, "_blank");
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations
  const animatedElements = document.querySelectorAll(".property-card");
  animatedElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
  });

  // Initialize tooltips or other interactive elements
  console.log("Premium Properties website loaded successfully!");
});

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("ServiceWorker registration successful");
      })
      .catch(function (error) {
        console.log("ServiceWorker registration failed");
      });
  });
}
