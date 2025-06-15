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