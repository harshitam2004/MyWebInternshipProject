document.addEventListener("DOMContentLoaded", () => {
    // --- Mobile Navigation Bar Logic ---
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinksContainer = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links a");

    menuToggle.addEventListener("click", () => {
        navLinksContainer.classList.toggle("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinksContainer.classList.remove("active");
            const icon = menuToggle.querySelector("i");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");
        });
    });

    // --- Active Link Tracker on Scrolling ---
    const sections = document.querySelectorAll("section");
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // --- Dynamic JavaScript 3D Tilt Card Component Engine ---
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const cardBoundingRect = card.getBoundingClientRect();
            
            const mouseX = e.clientX - cardBoundingRect.left;
            const mouseY = e.clientY - cardBoundingRect.top;
            
            const cardWidth = cardBoundingRect.width;
            const cardHeight = cardBoundingRect.height;
            
            const rotateX = ((cardHeight / 2 - mouseY) / (cardHeight / 2)) * 15; // Max 15 degree X-tilt
            const rotateY = ((mouseX - cardWidth / 2) / (cardWidth / 2)) * 15;  // Max 15 degree Y-tilt
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });

    // --- Skills Tab Switcher System ---
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetSelector = button.getAttribute("data-target");

            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            button.classList.add("active");
            document.querySelector(targetSelector).classList.add("active");
        });
    });

    // --- Contact Form Client-Side Validation ---
    const contactForm = document.getElementById("contact-form");
    const formSuccessMessage = document.getElementById("form-success");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let isFormValid = true;

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        if (nameInput.value.trim() === "") {
            showInputError(nameInput);
            isFormValid = false;
        } else {
            clearInputError(nameInput);
        }

        if (!validateEmailFormat(emailInput.value)) {
            showInputError(emailInput);
            isFormValid = false;
        } else {
            clearInputError(emailInput);
        }

        if (messageInput.value.trim() === "") {
            showInputError(messageInput);
            isFormValid = false;
        } else {
            clearInputError(messageInput);
        }

        if (isFormValid) {
            contactForm.style.display = "none";
            formSuccessMessage.style.display = "block";
            contactForm.reset();
        }
    });

    function showInputError(inputElement) {
        inputElement.parentElement.classList.add("invalid");
    }

    function clearInputError(inputElement) {
        inputElement.parentElement.classList.remove("invalid");
    }

    function validateEmailFormat(email) {
        const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexPattern.test(email);
    }
});