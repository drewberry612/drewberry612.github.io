// Get the button
var scrollTopBtn = document.querySelector(".scroll-top-btn");

// Show the button when the user scrolls down 100px from the top
window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

// When the button is clicked, scroll to the top
scrollTopBtn.onclick = function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Smooth scroll
  });
};
