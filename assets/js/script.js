function toggleMenu(btn) {
  const isOpen = document.body.classList.toggle('nav-open');
  btn.setAttribute('aria-expanded', isOpen);
  document.querySelector('nav').setAttribute('aria-hidden', !isOpen);
}

function closeMenu() {
  document.body.classList.remove('nav-open');
  document.querySelector('.hamburger').setAttribute('aria-expanded', 'false');
  document.querySelector('nav').setAttribute('aria-hidden', 'true');
}


// Carousel functionality
const buttons = document.querySelectorAll("[data-carousel-button]");
const AUTO_PLAY_INTERVAL = 3000; // 3 seconds

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    moveSlide(button, offset);
  });
});

function moveSlide(button, offset) {
  const slides = button
    .closest("[data-carousel]")
    .querySelector("[data-slides]");

  const activeSlide = slides.querySelector("[data-active]");
  let newIndex = [...slides.children].indexOf(activeSlide) + offset;

  if (newIndex < 0) newIndex = slides.children.length - 1;
  if (newIndex >= slides.children.length) newIndex = 0;

  slides.children[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
}

// Auto-play functionality

const carousel = document.querySelector("[data-carousel]");
const slides = carousel.querySelectorAll("[data-slides] li");
const prevButton = carousel.querySelector('[data-carousel-button="prev"]');
const nextButton = carousel.querySelector('[data-carousel-button="next"]');
const dotsContainer = carousel.querySelector(".carousel-dots");

let currentIndex = 0;
const autoplayDelay = 4000; // 4 seconds per slide
let autoplayInterval;

// create dots
slides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
    if(idx === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
        goToSlide(idx);
        resetAutoplay();
    });
    dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll("button");

// update carousel position & dots
function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.querySelector("ul").style.transform = `translateX(${offset}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}

// navigate to specific slide
function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// next/prev buttons
prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    updateCarousel();
    resetAutoplay();
});

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
    resetAutoplay();
});

// autoplay function
function startAutoplay() {
    autoplayInterval = setInterval(() => {
        nextButton.click();
    }, autoplayDelay);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
}

// pause on hover/focus for accessibility
carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);
carousel.addEventListener("focusin", stopAutoplay);
carousel.addEventListener("focusout", startAutoplay);

// swipe support
let startX = 0;
carousel.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    stopAutoplay();
});
carousel.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if(endX - startX > 50) prevButton.click();
    if(startX - endX > 50) nextButton.click();
    startAutoplay();
});

// initialize
updateCarousel();
startAutoplay();






// Animate announcement cards when they enter viewport
const cards = document.querySelectorAll('.announcement-child');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // optional: only animate once
      }
    });
  },
  {
    threshold: 0.2
  }
);

cards.forEach(card => observer.observe(card));



         
