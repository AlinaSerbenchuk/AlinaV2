document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

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

    // Add pricing cards
    const pricingContainer = document.querySelector('.pricing-container');
    const pricingPlans = [
        { name: 'Basic', price: '$99', features: ['1-hour session', '10 edited photos', 'Online gallery'] },
        { name: 'Standard', price: '$199', features: ['2-hour session', '20 edited photos', 'Online gallery', 'Print release'] },
        { name: 'Premium', price: '$299', features: ['3-hour session', '30 edited photos', 'Online gallery', 'Print release', '1 canvas print'] }
    ];

    pricingPlans.forEach(plan => {
        const card = document.createElement('div');
        card.classList.add('pricing-card');
        card.innerHTML = `
            <h3>${plan.name}</h3>
            <p class="price">${plan.price}</p>
            <ul>
                ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button class="book-now">Book Now</button>
        `;
        pricingContainer.appendChild(card);
    });

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
});