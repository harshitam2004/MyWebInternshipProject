document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // MODULE 1: Mobile Navigation Bar Logic
    // ==========================================
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinksContainer = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links a");

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener("click", () => {
            // Toggles the visibility of the mobile slide-out menu
            navLinksContainer.classList.toggle("active");
            
            // Toggles the hamburger icon to an 'X' close icon
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });

        // Closes the menu drawer automatically when a user selects an anchor link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navLinksContainer.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-xmark");
                }
            });
        });
    }

    // ==========================================
    // MODULE 2: Active Link Tracker on Scrolling
    // ==========================================
    const sections = document.querySelectorAll("section");
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener("scroll", () => {
            let currentSectionId = "";
            
            // Evaluates which section container viewport is currently intersecting
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                // Triggers when the user scrolls past 1/3rd of the section area
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    currentSectionId = section.getAttribute("id");
                }
            });

            // Swaps the 'active' navigation indicator class highlighted on the UI
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });
        });
    }

    // ==========================================
    // MODULE 3: 3D Tilt Card Component Engine
    // ==========================================
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const cardBoundingRect = card.getBoundingClientRect();
            
            // Calculates mouse coordinates relative to the individual card limits
            const mouseX = e.clientX - cardBoundingRect.left;
            const mouseY = e.clientY - cardBoundingRect.top;
            
            const cardWidth = cardBoundingRect.width;
            const cardHeight = cardBoundingRect.height;
            
            // Translates mouse vectors into degree orientation metrics (Max 15° variance)
            const rotateX = ((cardHeight / 2 - mouseY) / (cardHeight / 2)) * 15;
            const rotateY = ((mouseX - cardWidth / 2) / (cardWidth / 2)) * 15;
            
            // Modifies DOM styling matrix properties on the fly
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Flattens the perspective matrix state smoothly back to resting values on exit
        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });

    // ==========================================
    // MODULE 4: Skills Tab Switcher System
    // ==========================================
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetSelector = button.getAttribute("data-target");

            // Flushes out 'active' classes from all peer structural groups
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Sets active status tokens to the matching button/content targets
            button.classList.add("active");
            const activeContent = document.querySelector(targetSelector);
            if (activeContent) {
                activeContent.classList.add("active");
            }
        });
    });

    // ==========================================
    // MODULE 5: Contact Form Validation & Security
    // ==========================================
    const contactForm = document.getElementById("contact-form");
    const formSuccessMessage = document.getElementById("form-success");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Blocks default server-side document refreshes
            let isFormValid = true;

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");

            // Form Input Rule 1: Alphabetical validation constraint checking
            if (!validateNameFormat(nameInput.value)) {
                showInputError(nameInput);
                isFormValid = false;
            } else {
                clearInputError(nameInput);
            }

            // Form Input Rule 2: RegEx Email parsing check
            if (!validateEmailFormat(emailInput.value)) {
                showInputError(emailInput);
                isFormValid = false;
            } else {
                clearInputError(emailInput);
            }

            // Form Input Rule 3: Text length validation constraint checking
            if (messageInput.value.trim() === "") {
                showInputError(messageInput);
                isFormValid = false;
            } else {
                clearInputError(messageInput);
            }

            // Performs async state view shifts when all fields pass validation rules
            if (isFormValid) {
                contactForm.style.display = "none";
                if (formSuccessMessage) {
                    formSuccessMessage.style.display = "block";
                }
                contactForm.reset();
            }
        });
    }

    // Helper Utility Methods for Validation Modules
    function showInputError(inputElement) {
        if (inputElement && inputElement.parentElement) {
            inputElement.parentElement.classList.add("invalid");
        }
    }

    function clearInputError(inputElement) {
        if (inputElement && inputElement.parentElement) {
            inputElement.parentElement.classList.remove("invalid");
        }
    }

    function validateNameFormat(name) {
        // Enforces string to hold only alphabetical characters (A-Z, a-z) & spacing tokens. Min length: 2.
        const namePattern = /^[A-Za-z\s]{2,}$/;
        return namePattern.test(name.trim());
    }

    function validateEmailFormat(email) {
        const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexPattern.test(email);
    }
});