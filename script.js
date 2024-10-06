document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    } else {
        console.error('Menu toggle or nav menu not found');
    }

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Gallery functionality
    const gallery = document.querySelector('.gallery');
    const baseUrl = 'https://alinart.ru/images/art/';
    const gallerySections = ['Илья', 'РЫБА', 'КАРАКУЛЕВАЯ УШАНКА', 'МОХАММАД', 'Хрупкость', 'До-Евы', 'РЕСПИРАЦИЯ'];

    // Load images for all gallery sections
    gallerySections.forEach(section => loadImagesForSection(section));

    function loadImagesForSection(section) {
        let imageIndex = 1;
        let loadedImages = 0;
        const maxImages = 20; // Adjust as needed

        function loadImage(index) {
            const img = new Image();
            img.onload = function() {
                const galleryItem = createGalleryItem(img.src, `${section} - Image ${index}`);
                gallery.appendChild(galleryItem);
                loadedImages++;
                if (loadedImages < maxImages) {
                    loadImage(imageIndex++);
                }
            };
            img.onerror = function() {
                console.log(`Loaded ${loadedImages} images for ${section}`);
            };
            img.src = `${baseUrl}${encodeURIComponent(section)}${index}.jpg`;
        }

        loadImage(imageIndex++);
    }

    function createGalleryItem(src, caption) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${src}" alt="${caption}">
            <div class="gallery-item-caption">${caption}</div>
        `;
        item.addEventListener('click', () => openLightbox(src, caption));
        return item;
    }

    // Lightbox functionality
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    function openLightbox(src, caption) {
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="${caption}">
                <div class="lightbox-caption">${caption}</div>
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        lightbox.classList.add('active');

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }


    // Typing animation for About Me section
    const aboutContent = document.querySelector('.about-content');
    const aboutParagraphs = aboutContent.querySelectorAll('p');
    let currentParagraph = 0;
    let currentChar = 0;
    const typingSpeed = 20; // milliseconds per character

    function typeWriter() {
        if (currentParagraph < aboutParagraphs.length) {
            const paragraph = aboutParagraphs[currentParagraph];
            const text = paragraph.getAttribute('data-text') || paragraph.textContent;
            
            if (currentChar < text.length) {
                paragraph.innerHTML = text.slice(0, currentChar + 1) + '<span class="cursor">|</span>';
                currentChar++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                paragraph.innerHTML = text;
                currentParagraph++;
                currentChar = 0;
                setTimeout(typeWriter, typingSpeed * 10); // Pause between paragraphs
            }
        } else {
            // Remove cursor from the last paragraph when typing is complete
            aboutParagraphs[aboutParagraphs.length - 1].innerHTML = aboutParagraphs[aboutParagraphs.length - 1].textContent;
        }
    }

    // Start typing animation when the About section is in view
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Store original text and clear paragraphs before starting animation
            aboutParagraphs.forEach(p => {
                p.setAttribute('data-text', p.textContent);
                p.textContent = '';
            });
            currentParagraph = 0;
            currentChar = 0;
            typeWriter();
            observer.unobserve(aboutSection);
        }
    }, { threshold: 0.5 });

    observer.observe(aboutSection);

    // Photo and Video Gallery Modals
    document.addEventListener('DOMContentLoaded', function() {
        console.log('JavaScript is running');
        const photoGalleryBtn = document.getElementById('photo-gallery-btn');
        const videoGalleryBtn = document.getElementById('video-gallery-btn');
        const photoGalleryModal = document.getElementById('photo-gallery-modal');
        const videoGalleryModal = document.getElementById('video-gallery-modal');
        const closePhotoGallery = document.getElementById('close-photo-gallery');
        const closeVideoGallery = document.getElementById('close-video-gallery');

        if (photoGalleryBtn) {
            photoGalleryBtn.onclick = function() {
                console.log('Photo Gallery Button Clicked');
                photoGalleryModal.style.display = 'block';
            };
        } else {
            console.error('Photo Gallery Button not found');
        }

        if (videoGalleryBtn && videoGalleryModal) {
            videoGalleryBtn.addEventListener('click', function() {
                console.log('Video Gallery Button Clicked');
                videoGalleryModal.style.display = 'flex'; // Open modal on button click
            });

            // Close modal when clicking the close button
            if (closeVideoGallery) {
                closeVideoGallery.addEventListener('click', function() {
                    videoGalleryModal.style.display = 'none';
                });
            }

            // Close modal when clicking outside the modal content
            window.addEventListener('click', function(event) {
                if (event.target === videoGalleryModal) {
                    videoGalleryModal.style.display = 'none';
                }
            });
        } else {
            console.error('Video Gallery Button or Modal not found');
        }

        window.onclick = function(event) {
            if (event.target == photoGalleryModal) {
                photoGalleryModal.style.display = 'none';
            }
            if (event.target == videoGalleryModal) {
                videoGalleryModal.style.display = 'none';
            }
        };
    });
});

// Ensure the script is placed at the end of the body in your HTML file

// Get the elements for the photo gallery
const photoGalleryBtn = document.getElementById('photo-gallery-btn');
const photoGalleryModal = document.getElementById('photo-gallery-modal');
const closePhotoGallery = document.getElementById('close-photo-gallery');

// Get the elements for the video gallery
const videoGalleryBtn = document.getElementById('video-gallery-btn');
const videoGalleryModal = document.getElementById('video-gallery-modal');
const closeVideoGallery = document.getElementById('close-video-gallery');

// Add click event listener to the photo gallery button
photoGalleryBtn.onclick = function() {
    photoGalleryModal.style.display = 'block';
};

// Add click event listener to the close button of the photo gallery
closePhotoGallery.onclick = function() {
    photoGalleryModal.style.display = 'none';
};

// Add click event listener to the video gallery button
videoGalleryBtn.addEventListener('click', function() {
    console.log('Video Gallery Button Clicked');
    videoGalleryModal.style.display = 'flex'; // Open modal on button click
});

// Add click event listener to the close button of the video gallery
closeVideoGallery.addEventListener('click', function() {
    videoGalleryModal.style.display = 'none';
});
// Add click event listener to the window to close the modals when clicking outside
window.onclick = function(event) {
    if (event.target == photoGalleryModal) {
        photoGalleryModal.style.display = 'none';
    }
    if (event.target == videoGalleryModal) {
        videoGalleryModal.style.display = 'none';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    } else {
        console.error('Menu toggle or nav menu not found');
    }
});