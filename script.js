
const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next-slide");
const prevBtn = document.querySelector(".prev-slide");
const dotsContainer = document.querySelector(".slider-dots");

let currentSlide = 0;
let slideInterval;

if (track && slides.length > 0 && nextBtn && prevBtn && dotsContainer) {

    // CREATE NAVIGATION DOTS
    slides.forEach((slide, index) => {
        const dot = document.createElement("button");
        dot.classList.add("slider-dot");

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            currentSlide = index;
            updateSlider();
            restartSlider();
        });

        dotsContainer.appendChild(dot);
    });

    // UPDATE SLIDER
    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        const dots = document.querySelectorAll(".slider-dot");

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }

    // NEXT IMAGE
    function nextSlide() {
        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        updateSlider();
    }

    // PREVIOUS IMAGE
    function previousSlide() {
        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        updateSlider();
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        restartSlider();
    });

    prevBtn.addEventListener("click", () => {
        previousSlide();
        restartSlider();
    });

    // AUTOMATIC SLIDING
    function startSlider() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function restartSlider() {
        clearInterval(slideInterval);
        startSlider();
    }

    startSlider();
}

/* HERO BACKGROUND SLIDESHOW */

const heroImages = [
    "logo-1.jpg",
    "building-1.jpg",
    "building-13.jpg",
    "building-12.jpg",
    "building-2.jpg",
    "building-3.jpg",
    "building-4.jpg",
    "building-5.jpg",
    "building-6.jpg",
    "building-7.jpg",
    "building-11.jpg"

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
