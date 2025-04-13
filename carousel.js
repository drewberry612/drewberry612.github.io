document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("#skills .carousel");
    if (!carousel) return;

    // Duplicate items for seamless looping
    const items = Array.from(carousel.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });

    // Pause on hover or touch
    carousel.addEventListener("mouseenter", () => {
        carousel.style.animationPlayState = "paused";
    });
    carousel.addEventListener("mouseleave", () => {
        carousel.style.animationPlayState = "running";
    });
    carousel.addEventListener("touchstart", () => {
        carousel.style.animationPlayState = "paused";
    });
    carousel.addEventListener("touchend", () => {
        carousel.style.animationPlayState = "running";
    });
});

