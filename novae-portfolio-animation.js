// Ciblage des éléments
const slides = document.querySelectorAll(".slide");
const contents = document.querySelectorAll(".content");
const titles = document.querySelectorAll(".slider_content-title");
const testimonials = document.querySelectorAll(".slider_content-testimonial");
const legends = document.querySelectorAll(".slider_content-legend");
const numbers = document.querySelectorAll(".slider_content-number");

let current = 0;
const total = Math.min(slides.length, contents.length);

// Position initiale
gsap.set(slides, { xPercent: (i) => i * 100, opacity: 0, zIndex: 0 });
gsap.set(titles, { xPercent: (i) => i * 100, opacity: 0, zIndex: 0 });
gsap.set(legends, { xPercent: (i) => i * 100, opacity: 0, zIndex: 0 });
gsap.set(testimonials, { xPercent: (i) => i * 100, opacity: 0, zIndex: 0 });
gsap.set(numbers, { xPercent: (i) => i * 100, opacity: 0, zIndex: 0 });

gsap.set(slides[0], { opacity: 1, filter: window.BLURS.none, zIndex: 900 });
gsap.set(titles[0], { opacity: 1, filter: window.BLURS.none, zIndex: 900 });
gsap.set(testimonials[0], { opacity: 1, filter: window.BLURS.none, zIndex: 900 });
gsap.set(legends[0], { opacity: 1, filter: window.BLURS.none, zIndex: 900 });
gsap.set(numbers[0], { opacity: 1, filter: window.BLURS.none, zIndex: 900 });
contents[0].classList.add("active");

// Next slide
const nextSlideBtn = document.querySelector("#gsap_next_slide");
nextSlideBtn.addEventListener("click", () => nextSlide());

function nextSlide() {
  const next = (current + 1) % total;

  // Masquer l'ancien contenu
  contents[current].classList.remove("active");

  // Afficher le nouveau avant les animations internes
  contents[next].classList.add("active");

  // Slide sortant
  gsap.to([slides[current], titles[current], testimonials[current], legends[current], numbers[current]], {
    xPercent: -100,
    opacity: 0,
    filter: window.BLURS.light,
    zIndex: 0,
    duration: 1.2,
    ease: window.EFFECTS.easeInOut
  });

  /// Slider entrant avec effet stagger
  const tl = gsap.timeline();
  tl.fromTo(
    slides[next],
    { xPercent: 100, opacity: 0, filter: window.BLURS.light, zIndex: 1 },
    {
      xPercent: 0,
      opacity: 1,
      filter: window.BLURS.none,
      duration: 1.2,
      ease: window.EFFECTS.easeOut
    }
    )
    .fromTo(titles[next],  
    	{ xPercent: 100, opacity: 0, filter: window.BLURS.light, zIndex: 1 },
      {
        xPercent: 0,
        opacity: 1,
        filter: window.BLURS.none,
        duration: 1,
        ease: window.EFFECTS.easeOut
      },
      "-=1" // commence pendant l'animation du slide
    )
    .fromTo(
      testimonials[next],
      { xPercent: 100, opacity: 0, filter: window.BLURS.light, zIndex: 1 },
      {
        xPercent: 0,
        opacity: 1,
        filter: window.BLURS.none,
        duration: 1,
        ease: window.EFFECTS.easeOut
      },
     "-=0.9" // léger décalage (stagger)
    )
     .fromTo(
      legends[next],
      { xPercent: 100, opacity: 0, filter: window.BLURS.light, zIndex: 1 },
      {
        xPercent: 0,
        opacity: 1,
        filter: window.BLURS.none,
        duration: 0.9,
        ease: window.EFFECTS.easeOut
      },
      "-=0.8" // léger décalage (stagger)
    )
    .fromTo(
      numbers[next],
      { xPercent: 100, opacity: 0, filter: window.BLURS.light, zIndex: 1 },
      {
        xPercent: 0,
        opacity: 1,
        filter: window.BLURS.none,
        duration: 0.9,
        ease: window.EFFECTS.easeOut
      },
      "-=0.8" // léger décalage (stagger)
    );

  current = next;
  }