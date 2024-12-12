document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Lazy loading for iframes
  const videoItems = document.querySelectorAll(".video-wrapper iframe");

  const loadVideo = (video) => {
    if (!video.src && video.dataset.src) {
      video.src = video.dataset.src;
    }
  };

  // Intersection Observer for lazy loading
  const observerOptions = {
    root: null,
    rootMargin: "50px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadVideo(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all video iframes
  videoItems.forEach((video) => {
    observer.observe(video);
  });

  // Optional: Add video play/pause functionality
  const handleVideoVisibility = () => {
    videoItems.forEach((video) => {
      const rect = video.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (!isVisible && video.contentWindow) {
        // Pause video when not visible
        video.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    });
  };

  // Listen for scroll events to handle video visibility
  window.addEventListener("scroll", handleVideoVisibility, { passive: true });

  // Add pageshow event listener to handle back/forward navigation
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      // Page was restored from bfcache
      videoItems.forEach((video) => {
        loadVideo(video);
      });
    }
  });
});
