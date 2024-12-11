document.addEventListener("DOMContentLoaded", () => {
  // Lazy loading for iframes
  const videoItems = document.querySelectorAll(".video-wrapper iframe");

  const loadVideo = (video) => {
    // Store the src
    const src = video.src;

    // Remove src temporarily
    video.src = "";

    // Set it back - this triggers the load when the element is in viewport
    setTimeout(() => {
      video.src = src;
    }, 100);
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
});
