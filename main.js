const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

const banner = document.querySelector(".banner__container");

const bannerContent = Array.from(banner.children);

bannerContent.forEach((item) => {
  const duplicateNode = item.cloneNode(true);
  duplicateNode.setAttribute("aria-hidden", true);
  banner.appendChild(duplicateNode);
});

ScrollReveal().reveal(".arrival__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".sale__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".sale__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".sale__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".sale__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

/* Sign Up Form Toggle */
const signupBtn = document.getElementById("signup-btn");
const signupForm = document.getElementById("signup-form");
const closeBtn = document.getElementById("close-btn");

signupBtn.addEventListener("click", () => {
  signupForm.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  signupForm.style.display = "none";
});
const exploreButtons = document.querySelectorAll(".explore-btn");

exploreButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default anchor click behavior
    const diseaseId = button.getAttribute("data-disease");
    const description = document.getElementById(`${diseaseId}-description`);

    // Hide all descriptions first
    document.querySelectorAll(".disease-description").forEach((desc) => {
      desc.style.display = "none";
    });

    // Show the clicked disease description
    description.style.display = "block";
  });
});
document.getElementById('book-appointment').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior

    // Sample list of nearby dermatologists
    const dermatologists = [
        { name: "Dr. Smith", address: "123 Skin St, Dermatown", phone: "(123) 456-7890" },
        { name: "Dr. Jones", address: "456 Derm Ave, Skintown", phone: "(987) 654-3210" },
        { name: "Dr. Brown", address: "789 Care Blvd, Skincare City", phone: "(555) 555-5555" }
    ];

    // Create a modal or display the list in a new section
    const appointmentModal = document.createElement('div');
    appointmentModal.style.position = 'fixed';
    appointmentModal.style.top = '50%';
    appointmentModal.style.left = '50%';
    appointmentModal.style.transform = 'translate(-50%, -50%)';
    appointmentModal.style.background = '#fff';
    appointmentModal.style.padding = '20px';
    appointmentModal.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    appointmentModal.style.zIndex = '1000';

    let content = '<h3>Nearby Dermatologists</h3><ul>';
    dermatologists.forEach(doc => {
        content += `<li>${doc.name} - ${doc.address} - ${doc.phone}</li>`;
    });
    content += '</ul><button id="close-modal">Close</button>';
    appointmentModal.innerHTML = content;

    document.body.appendChild(appointmentModal);

    // Close modal functionality
    document.getElementById('close-modal').addEventListener('click', () => {
        document.body.removeChild(appointmentModal);
    });
});

// Initialize ScrollReveal
ScrollReveal().reveal('.arrival__card', {
  duration: 1000,
  distance: '20px',
  interval: 200,
  origin: 'bottom'
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

