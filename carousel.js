document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("#skills .carousel");
    const container = document.querySelector("#skills .carousel-container");
    if (!carousel || !container) return;

    const slides = Array.from(carousel.children);
    let isPaused = false; // Start running by default
    let translateX = 0;
    let lastTime = 0;
    const speed = 0.05; // Pixels per millisecond (~27s cycle)

    // Calculate slide width (including margins)
    const slideWidth = slides[0].offsetWidth + 32; // 16px margin each side

    // Duplicate slides to fill at least 2400px (~9-10 slides)
    const minWidth = 2400;
    const slidesNeeded = Math.ceil(minWidth / slideWidth) - slides.length + 1;
    for (let i = 0; i < slidesNeeded; i++) {
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            carousel.appendChild(clone);
        });
    }

    // Initialize carousel position
    carousel.style.transform = `translateX(${translateX}px)`;

    // Animation loop
    function animate(time) {
        if (!isPaused) {
            if (!lastTime) lastTime = time;
            const delta = time - lastTime;
            translateX -= speed * delta; // Move left

            // Check if first slide is out of view
            const firstSlide = carousel.firstElementChild;
            const slideRect = firstSlide.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            if (slideRect.right <= containerRect.left) {
                // Move first slide to end
                carousel.appendChild(firstSlide);
                // Adjust translateX to compensate
                translateX += slideWidth;
            }

            carousel.style.transform = `translateX(${translateX}px)`;
        }

        lastTime = time;
        if (!window.matchMedia("(max-width: 768px)").matches) {
            requestAnimationFrame(animate);
        }
    }

    // Pause on hover
    container.addEventListener("mouseenter", () => {
        isPaused = true;
    });
    container.addEventListener("mouseleave", () => {
        isPaused = false;
    });

    // Pause on touch
    container.addEventListener("touchstart", () => {
        isPaused = true;
    });
    container.addEventListener("touchend", () => {
        isPaused = false;
    });

    // Stop animation on mobile
    function checkMobile() {
        if (window.matchMedia("(max-width: 768px)").matches) {
            carousel.style.transform = "translateX(0)";
            isPaused = true;
        } else if (!isPaused) {
            requestAnimationFrame(animate);
        }
    }

    // Initial check and resize listener
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Start animation if not mobile
    if (!window.matchMedia("(max-width: 768px)").matches) {
        requestAnimationFrame(animate);
    }
});