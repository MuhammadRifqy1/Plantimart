  // Wait for the document to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Initialize Swiper
    var swiper = new Swiper("#swiperContainer", {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  });
