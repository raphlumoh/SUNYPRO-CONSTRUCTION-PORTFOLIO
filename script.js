
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
