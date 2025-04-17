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
    const minWidth = 2000;
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
        requestAnimationFrame(animate);
    }

    // Pause on hover
    container.addEventListener("mouseenter", () => {
        isPaused = true;
    });
    container.addEventListener("mouseleave", () => {
        isPaused = false;
        const hoveredSlide = container.querySelector(".carousel > div:hover");
        if (hoveredSlide) {
            hoveredSlide.style.transition = "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease"; // Add transition for gradual change
            hoveredSlide.style.transform = "none"; // Remove hover size change
            hoveredSlide.style.boxShadow = "none"; // Remove hover shadow
            hoveredSlide.style.border = "1px solid #475569"; // Reset border
        }
    });

    // Pause on touch and apply hover effects
    container.addEventListener("touchstart", (e) => {
        isPaused = true;
        const touchedSlide = e.target.closest(".carousel > div");
        if (touchedSlide) {
            touchedSlide.style.transition = "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease"; // Add transition for gradual change
            touchedSlide.style.transform = "scale(1.05)"; // Apply hover size change
            touchedSlide.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)"; // Apply hover shadow
            touchedSlide.style.border = "2px solid var(--primary)"; // Apply hover border
        }
    });

    container.addEventListener("touchend", (e) => {
        isPaused = false;
        const touchedSlide = e.target.closest(".carousel > div");
        if (touchedSlide) {
            touchedSlide.style.transform = "none"; // Remove hover size change
            touchedSlide.style.boxShadow = "none"; // Remove hover shadow
            touchedSlide.style.border = "1px solid #475569"; // Reset border
        }
    });

    // Start animation
    requestAnimationFrame(animate);
});