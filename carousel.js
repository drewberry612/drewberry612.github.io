document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("#skills .carousel");
  
    // Pause on mouse hover
    carousel.addEventListener("mouseenter", () => {
      carousel.style.animationPlayState = "paused";
    });
  
    // Resume on mouse leave
    carousel.addEventListener("mouseleave", () => {
      carousel.style.animationPlayState = "running";
    });
  
    // Pause on touch
    carousel.addEventListener("touchstart", () => {
      carousel.style.animationPlayState = "paused";
    });
  
    // Resume on touch end
    carousel.addEventListener("touchend", () => {
      carousel.style.animationPlayState = "running";
    });
  });
  