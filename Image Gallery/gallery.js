// DOM Elements
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightboxBtn = document.getElementById('close-lightbox');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Current image index for navigation
let currentImageIndex = 0;
const images = Array.from(document.querySelectorAll('.gallery-item img'));

// Filter Gallery
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active filter button
        filterBtns.forEach(b => {
            b.classList.remove('active-filter', 'bg-blue-500', 'text-white');
            b.classList.add('bg-gray-200', 'text-gray-800');
        });
        btn.classList.add('active-filter', 'bg-blue-500', 'text-white');
        btn.classList.remove('bg-gray-200', 'text-gray-800');
        
        const filter = btn.dataset.filter;
        
        // Filter gallery items
        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lightbox functionality
function openLightbox(index) {
    currentImageIndex = index;
    const imgElement = images[index];
    
    lightboxImage.src = imgElement.src;
    lightboxImage.alt = imgElement.alt;
    lightboxCaption.textContent = imgElement.alt;
    
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
}

function navigate(direction) {
    currentImageIndex += direction;
    
    // Wrap around if at beginning/end
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    
    const imgElement = images[currentImageIndex];
    lightboxImage.src = imgElement.src;
    lightboxImage.alt = imgElement.alt;
    lightboxCaption.textContent = imgElement.alt;
}

// Set up event listeners for each image
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

// Lightbox controls
closeLightboxBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => navigate(-1));
nextBtn.addEventListener('click', () => navigate(1));

// Close lightbox when clicking on backdrop
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigate(-1);
        } else if (e.key === 'ArrowRight') {
            navigate(1);
        }
    }
});
