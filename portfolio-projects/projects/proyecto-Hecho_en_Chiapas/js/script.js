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

// Admin panel toggle
function toggleAdmin() {
  const panel = document.getElementById("adminPanel");
  panel.classList.toggle("active");
}

// Product image update
function updateProductImage() {
  const select = document.getElementById("productSelect");
  const newImage = document.getElementById("newProductImage");
  const selectedIndex = select.value;

  if (newImage.value.trim()) {
    const productCards = document.querySelectorAll(".product-card");
    const imageDiv =
      productCards[selectedIndex].querySelector(".product-image");

    // Extract icon from current text
    const currentText = imageDiv.textContent;
    const icon = currentText.split(" ")[0];

    imageDiv.textContent = `${icon} Imagen: ${newImage.value}`;
    newImage.value = "";

    // Show success animation
    imageDiv.style.background = "linear-gradient(45deg, #32CD32, #90EE90)";
    setTimeout(() => {
      imageDiv.style.background = "linear-gradient(45deg, #D2691E, #8B4513)";
    }, 1000);
  }
}

// Price update
function updatePrice() {
  const select = document.getElementById("productSelect");
  const newPrice = document.getElementById("newPrice");
  const selectedIndex = select.value;

  if (newPrice.value.trim()) {
    const productCards = document.querySelectorAll(".product-card");
    const priceDiv =
      productCards[selectedIndex].querySelector(".product-price");

    priceDiv.textContent = newPrice.value;
    newPrice.value = "";

    // Show success animation
    priceDiv.style.color = "#32CD32";
    setTimeout(() => {
      priceDiv.style.color = "#D2691E";
    }, 1000);
  }
}

// Add gallery item
function addGalleryItem() {
  const title = document.getElementById("galleryTitle");
  const desc = document.getElementById("galleryDesc");

  if (title.value.trim() && desc.value.trim()) {
    const galleryGrid = document.getElementById("galleryGrid");
    const newItem = document.createElement("div");
    newItem.className = "gallery-item";
    newItem.textContent = `🎨 ${title.value}`;
    newItem.onclick = () => openZoom(title.value, desc.value);

    galleryGrid.appendChild(newItem);

    title.value = "";
    desc.value = "";

    // Animation for new item
    newItem.style.opacity = "0";
    newItem.style.transform = "scale(0.8)";
    setTimeout(() => {
      newItem.style.transition = "all 0.3s ease";
      newItem.style.opacity = "1";
      newItem.style.transform = "scale(1)";
    }, 100);
  }
}

// Update contact info
function updateContactInfo() {
  const phone = document.getElementById("newPhone");
  const email = document.getElementById("newEmail");
  const address = document.getElementById("newAddress");

  const contactItems = document.querySelectorAll(".contact-item");

  if (phone.value.trim()) {
    contactItems[1].innerHTML = `<strong>📞 Teléfono:</strong><br>${phone.value}`;
    phone.value = "";
  }

  if (email.value.trim()) {
    contactItems[2].innerHTML = `<strong>✉️ Email:</strong><br>${email.value}`;
    email.value = "";
  }

  if (address.value.trim()) {
    contactItems[0].innerHTML = `<strong>📍 Ubicación:</strong><br>${address.value}`;
    address.value = "";
  }
}

// Update hero text
function updateHeroText() {
  const title = document.getElementById("heroTitle");
  const desc = document.getElementById("heroDesc");

  if (title.value.trim()) {
    document.querySelector(".hero-content h1").textContent = title.value;
    title.value = "";
  }

  if (desc.value.trim()) {
    document.querySelector(".hero-content p").textContent = desc.value;
    desc.value = "";
  }
}

// Zoom modal functions
function openZoom(title, description) {
  document.getElementById("zoomTitle").textContent = title;
  document.getElementById("zoomDescription").textContent = description;
  document.getElementById("zoomModal").classList.add("active");
}

function closeZoom() {
  document.getElementById("zoomModal").classList.remove("active");
}

// Close modal when clicking outside
document.getElementById("zoomModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeZoom();
  }
});

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = document.querySelector(".submit-btn");
  const submitText = document.getElementById("submitText");
  const submitLoading = document.getElementById("submitLoading");

  // Show loading
  submitText.style.display = "none";
  submitLoading.style.display = "inline-block";
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    submitText.style.display = "inline-block";
    submitLoading.style.display = "none";
    submitBtn.disabled = false;

    // Show success message
    submitText.textContent = "¡Mensaje Enviado!";
    submitBtn.style.background = "linear-gradient(45deg, #32CD32, #90EE90)";

    // Reset form
    this.reset();

    // Reset button after 3 seconds
    setTimeout(() => {
      submitText.textContent = "Enviar Mensaje";
      submitBtn.style.background = "linear-gradient(45deg, #FFD700, #FFA500)";
    }, 3000);
  }, 2000);
});

// Scroll animations
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".product-card, .gallery-item, .payment-card"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Initialize scroll animations
window.addEventListener("load", () => {
  const elements = document.querySelectorAll(
    ".product-card, .gallery-item, .payment-card"
  );
  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(50px)";
    element.style.transition = "all 0.6s ease";
  });
});

window.addEventListener("scroll", animateOnScroll);

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(139, 69, 19, 0.98)";
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
  } else {
    header.style.background = "rgba(139, 69, 19, 0.95)";
    header.style.boxShadow = "none";
  }
});

// Add hover effects to product cards
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add floating animation to random elements
function addFloatingAnimation() {
  const elements = document.querySelectorAll(".payment-card");
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("floating");
    }, index * 200);
  });
}

// Initialize floating animations after page load
window.addEventListener("load", () => {
  setTimeout(addFloatingAnimation, 1000);
});

// Keyboard navigation for modal
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeZoom();
  }
});

// Add touch support for mobile
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("touchstart", function () {
    this.style.transform = "scale(1.05)";
  });

  item.addEventListener("touchend", function () {
    this.style.transform = "scale(1)";
  });
});

// Performance optimization: Lazy loading simulation
function lazyLoadElements() {
  const elements = document.querySelectorAll(".product-image, .gallery-item");

  elements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight + 200) {
      element.style.opacity = "1";
    }
  });
}

window.addEventListener("scroll", lazyLoadElements);
window.addEventListener("load", lazyLoadElements);

// Add particle effect to hero section
function createParticles() {
  const hero = document.querySelector(".hero");
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "4px";
    particle.style.height = "4px";
    particle.style.background = "#FFD700";
    particle.style.borderRadius = "50%";
    particle.style.opacity = "0.7";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animation = `float ${
      3 + Math.random() * 2
    }s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 2 + "s";
    hero.appendChild(particle);
  }
}

window.addEventListener("load", createParticles);
