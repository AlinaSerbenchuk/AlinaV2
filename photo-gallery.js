document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxContent = document.querySelector(".lightbox-content");
  const close = document.querySelector(".close");

  // Lazy loading and smooth image appearance
  const loadImage = (item) => {
    const img = item.querySelector("img");

    img.addEventListener("load", () => {
      item.classList.add("loaded");
    });

    if (img.complete) {
      item.classList.add("loaded");
    }
  };

  galleryItems.forEach(loadImage);

  // Lightbox functionality
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      lightboxContent.src = img.src;
      lightbox.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // Close lightbox
  const closeLightbox = () => {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  };

  close.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });

  // Touch events for mobile
  let touchStartY;

  lightbox.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
  });

  lightbox.addEventListener("touchmove", (e) => {
    if (!touchStartY) return;

    const touchEndY = e.touches[0].clientY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > 50) {
      closeLightbox();
      touchStartY = null;
    }
  });
});
