// Smooth scrolling
function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// Scroll reveal animation
function revealElements() {
  const elements = document.querySelectorAll(".scroll-reveal");
  const windowHeight = window.innerHeight;

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("revealed");
    }
  });
}

// Initialize animations
window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

// Add some interactive effects
document.querySelectorAll(".benefit-card, .package-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Dynamic background particles
function createParticle() {
  const particle = document.createElement("div");
  particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                animation: float-up 8s linear forwards;
            `;

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 8000);
}

// Add floating particles periodically
setInterval(createParticle, 2000);

// Add CSS for particle animation
const style = document.createElement("style");
style.textContent = `
            @keyframes float-up {
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);


  function openModal(title, description, imageUrl) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalImage').src = imageUrl;
    document.getElementById('portfolioModal').style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('portfolioModal').style.display = 'none';
  }

// Add click event to portfolio items
/*
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', () => {
    const title = item.querySelector('h3').textContent;
    const description = item.querySelector('p').textContent;
    const imageUrl = item.querySelector('img').src;

    openModal(title, description, imageUrl);
  });
});*/