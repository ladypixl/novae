// Scroll links configuration
document.querySelectorAll(".navbar_link").forEach((link) => {
	configureScrollTo(link);
});
document.querySelectorAll(".navbar_huge-link").forEach((link) => {
	configureScrollTo(link);
});
document.querySelectorAll(".footer_link").forEach((link) => {
	configureScrollTo(link);
});

function configureScrollTo(link) {
  link.addEventListener("click", () => {
      const target = "#" + link.getAttribute("data-target");
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 80
          },
          ease: "power2.out"
        });
      }
  });
}

// Process steps animation
gsap.utils.toArray(".process_item-wrapper").forEach((el, i) => {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      filter: window.BLURS.light
    },
    {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      filter: window.BLURS.none,
      duration: 1.6,
      ease: window.EFFECTS.easeInOut,
      delay: i * 0.4 // stagger effect
    }
  );
});