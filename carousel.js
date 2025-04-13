document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("#skills .carousel");
    if (!carousel) return;

    // Duplicate items for seamless looping
    const items = Array.from(carousel.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });

    // Reset animation when it finishes
    carousel.addEventListener("animationiteration", () => {
        carousel.style.animation = "none"; // Pause animation
        carousel.offsetHeight; // Trigger reflow
        carousel.style.animation = ""; // Restart animation
    });

    // Pause on hover
    carousel.addEventListener("mouseenter", () => {
        carousel.style.animationPlayState = "paused";
    });
    carousel.addEventListener("mouseleave", () => {
        carousel.style.animationPlayState = "running";
    });

    // Pause on touch
    carousel.addEventListener("touchstart", () => {
      carousel.style.animationPlayState = "paused";
    });
    carousel.addEventListener("touchend", () => {
      carousel.style.animationPlayState = "running";
    });
});

