const testimonialsWrapper = document.querySelector(".testimonials_list");
const testimonialItems = Array.from(document.querySelectorAll(".testimonial_item"));
const previousTestimonialBtn = document.getElementById("gsap_previous_testimonial");
const nextTestimonialBtn = document.getElementById("gsap_next_testimonial");

const itemWidth = testimonialItems[0].offsetWidth + 48; // slide + gap
let currentIndex = testimonialItems.length; // on commence au vrai 1er (après clones)

// Clone début + fin pour boucle visuelle
const cloneStart = testimonialItems.map((el) => el.cloneNode(true));
const cloneEnd = testimonialItems.map((el) => el.cloneNode(true));
cloneStart.forEach((el) => testimonialsWrapper.appendChild(el));
cloneEnd
  .reverse()
  .forEach((el) => testimonialsWrapper.insertBefore(el, testimonialsWrapper.firstChild));

const counter = document.getElementById("gsap_testimonial_counter");

// Largeur totale = nouveaux éléments
const allItems = testimonialsWrapper.querySelectorAll(".testimonial_item");
const totalTestimonials = allItems.length;

// Position initiale centrée sur le "vrai" premier item
gsap.set(testimonialsWrapper, { x: -currentIndex * itemWidth });

// Event listeners
nextTestimonialBtn.addEventListener("click", () => slide(1));
previousTestimonialBtn.addEventListener("click", () => slide(-1));

// Slide function
function slide(direction) {
  currentIndex += direction;

  gsap.to(testimonialsWrapper, {
    x: -currentIndex * itemWidth,
    duration: 1.0,
    ease: window.EFFECTS.easeOut,
    onComplete: () => {
      checkLoop();
      //updateCounter(); TODO:: to be coded later
    }
  });
}

// Reset silencieux si on atteint un clone
function checkLoop() {  
  // Boucle avant (après dernier vrai slide)
  if (currentIndex >= totalTestimonials - testimonialItems.length) {
    currentIndex = testimonialItems.length;
    gsap.set(testimonialsWrapper, { x: -currentIndex * itemWidth });
  }
  // Boucle arrière (avant premier vrai slide)
  if (currentIndex < testimonialItems.length) {
    //currentIndex = totalTestimonials - testimonialItems.length * 2;
    currentIndex = totalTestimonials - testimonialItems.length - 1;
    gsap.set(testimonialsWrapper, { x: -currentIndex * itemWidth });
  }
}