const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const scrollTopButton = document.querySelector(".scroll-top");
const revealItems = document.querySelectorAll(".reveal");
function closeMenu() {
    if (!menuButton || !navLinks) return;
    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector("i")?.classList.replace("fa-xmark", "fa-bars");
}
function updateScrollState() {
    const isScrolled = window.scrollY > 50;
    header?.classList.toggle("scrolled", isScrolled);
    scrollTopButton?.classList.toggle("visible", window.scrollY > 500);
}
if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        document.body.classList.toggle("menu-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        const icon = menuButton.querySelector("i");
        icon?.classList.toggle("fa-bars", !isOpen);
        icon?.classList.toggle("fa-xmark", isOpen);
    });
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });
}
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});
if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
    });
}, { threshold: 0.12 });
revealItems.forEach(item => observer.observe(item));
window.addEventListener("scroll", updateScrollState);
window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeMenu();
});
updateScrollState();
