document.addEventListener("DOMContentLoaded", () => {
    // 1. Typing Effect for Hero Section
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    const textArray = ["HTML", "CSS", "JavaScript", "Git & GitHub"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 1500;
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textIndex++;
            if (textIndex >= textArray.length) textIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }

    if (textArray.length) setTimeout(type, newTextDelay);

    // 2. Dark Mode Toggle
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });

        // Load saved theme
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
        }
    }

    // 3. Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // 4. Active Link Highlight on Scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // 5. Contact Form Validation
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nameInput = document.getElementById("name").value.trim();
            const emailInput = document.getElementById("email").value.trim();
            const messageInput = document.getElementById("message").value.trim();

            if (!nameInput || !emailInput || !messageInput) {
                formFeedback.textContent = "Please fill in all fields.";
                formFeedback.style.color = "red";
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput)) {
                formFeedback.textContent = "Please enter a valid email address.";
                formFeedback.style.color = "red";
                return;
            }

            formFeedback.textContent = "Thanks for reaching out! Your message was sent.";
            formFeedback.style.color = "green";
            contactForm.reset();
        });
    }
});