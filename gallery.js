
// GET ALL GALLERY ELEMENTS

const galleryItems = document.querySelectorAll(".gallery-item");

const filterButtons = document.querySelectorAll(".filters button");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxCaption = document.getElementById("lightboxCaption");

const closeButton = document.getElementById("closeLightbox");

const prevButton = document.getElementById("prevBtn");

const nextButton = document.getElementById("nextBtn");


// STORE VISIBLE IMAGES

let currentImages = [];

let currentIndex = 0;


// FILTER PROJECT CATEGORIES

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        // Remove active class from all buttons

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Activate clicked button

        this.classList.add("active");

        // Get selected category

        const category = this.dataset.filter;

        // Filter gallery images

        galleryItems.forEach(item => {

            if (
                category === "all" ||
                item.dataset.category === category
            ) {

                item.classList.remove("hide");

            } else {

                item.classList.add("hide");

            }

        });

    });

});


// GET CURRENT VISIBLE IMAGES

function updateImages() {

    currentImages = Array.from(galleryItems).filter(item => {

        return !item.classList.contains("hide");

    });

}


// OPEN IMAGE LIGHTBOX

function openLightbox(index) {

    updateImages();

    currentIndex = index;

    showImage();

    lightbox.style.display = "flex";

}


// DISPLAY SELECTED IMAGE

function showImage() {

    const selectedItem = currentImages[currentIndex];

    const image = selectedItem.querySelector("img");

    const title = selectedItem.querySelector("h3");

    lightboxImage.src = image.src;

    lightboxCaption.textContent = title.textContent;

}


// CLICK IMAGE TO OPEN

galleryItems.forEach(item => {

    item.addEventListener("click", function() {

        updateImages();

        const index = currentImages.indexOf(this);

        openLightbox(index);

    });

});


// NEXT IMAGE

nextButton.addEventListener("click", function() {

    currentIndex++;

    if (currentIndex >= currentImages.length) {

        currentIndex = 0;

    }

    showImage();

});


// PREVIOUS IMAGE

prevButton.addEventListener("click", function() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = currentImages.length - 1;

    }

    showImage();

});


// CLOSE LIGHTBOX

function closeLightbox() {

    lightbox.style.display = "none";

    lightboxImage.src = "";

}


closeButton.addEventListener("click", closeLightbox);


// CLOSE WITH ESCAPE KEY

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeLightbox();

    }

});


// PREVENT CLICKING IMAGE FROM CLOSING LIGHTBOX

lightboxImage.addEventListener("click", function(event) {

    event.stopPropagation();

});


/* HERO BACKGROUND SLIDESHOW */

const heroImages = [
    "images/logo-1.jpg",
    "images/building-1.jpg",
    "images/building-13.jpg",
    "images/building-2.jpg",
    "images/building-3.jpg",
    "images/building-4.jpg",
    "images/building-5.jpg",
    "images/building-6.jpg",
    "images/building-7.jpg",
    "images/building-11.jpg"

    // Add more images here
];

const heroSlides = document.querySelectorAll(".hero-bg");

if (heroSlides.length === 2 && heroImages.length > 0) {

    let currentImage = 0;
    let activeSlide = 0;

    heroSlides[0].style.backgroundImage =
        `url("${heroImages[0]}")`;

    heroSlides[0].classList.add("active");

    heroSlides[1].classList.remove("active");

    setInterval(() => {

        currentImage =
            (currentImage + 1) % heroImages.length;

        const nextSlide = 1 - activeSlide;

        const image = new Image();

        image.onload = () => {

            heroSlides[nextSlide].style.backgroundImage =
                `url("${heroImages[currentImage]}")`;

            heroSlides[nextSlide].classList.add("active");

            heroSlides[activeSlide].classList.remove("active");

            activeSlide = nextSlide;
        };

        image.src = heroImages[currentImage];

    }, 5000);
}
