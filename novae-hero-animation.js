/** variables */
const appareanceDuration = 1.0;
const appareanceDelay = 0.1;
const ease = "power3.inOut";
const heroElementIds = ["gsap_menu_link1", "gsap_menu_link2", "gsap_menu_link3", 
"gsap_menu_link4", "gsap_menu_link5", "gsap_menu_link6",  "gsap_menu_link7", 
"gsap_cta_who", "gsap_cta_what"];
const heroElementsSlowingFactor = 1.4;

/** timelines */
let masterH1 = gsap.timeline();
masterH1.add("start", 1);

/** event listeners */
window.addEventListener("load", function(event) {
  animationHeroSection();
});

/** methods */
function animationHeroSection() {
  const splitBecome = new SplitText("#gsap_h1_become", {
    type: "chars",
    charsClass: "become++"
  });
  const splitMemorable = new SplitText("#gsap_h1_memorable", {
    type: "chars",
    charsClass: "memorable++"
  });
  // to handle different languages because the word length might vary
  const appareanceDurationBecome =
  appareanceDelay * (splitBecome.chars.length + 2); 
  
  // make first word appear
  createH1Timeline(splitBecome, "become", 0);
  // make first word go "behind"
  putWordInTheBlur(appareanceDurationBecome);
  // make second word appear
  createH1Timeline(splitMemorable, "memorable", appareanceDurationBecome);
  // display menu elements and CTAs
  showOtherHeroElements(appareanceDurationBecome + 0.4);
}

function createH1Timeline(split, className, masterDelay) {
  let tl = gsap.timeline();
  tl.add("start", 0);
  split.chars.forEach((char, i) => {
    let delay = i * appareanceDelay;
    let charCount = i + 1;
    tl.to(
      `.${className}${charCount}`,
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: appareanceDuration,
        ease: ease
      },
      `start+=${delay}`
    );
    masterH1.add(tl, `start+=${masterDelay}`);
  });
}
function putWordInTheBlur(delay) {
  let tl = gsap.timeline();
  tl.to(".become", {
    filter: "blur(4px)",
    duration: 0.8,
    ease: "power1.out"
  });
  masterH1.add(tl, `start+=${delay}`);
}
function showOtherHeroElements(masterDelay) {
  let tl = gsap.timeline();
  tl.add("start", 0);
  let i = 0;
  let lastDelay = 0;
  heroElementIds.forEach((id) => {  	
  	let delay = i * appareanceDelay * heroElementsSlowingFactor;
    i++;
    // make the last element even slower (otherwise it seems to appear
    // in the same time as the previous one)
    if (id == "gsap_cta_what") {
    	delay = delay * heroElementsSlowingFactor;
      lastDelay = masterDelay + delay;
    }
    tl.to(
     	`#${id}`, 
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: appareanceDuration * heroElementsSlowingFactor,
        ease: ease
      },
      `start+=${delay}`);
  });
  masterH1.add(tl, `start+=${masterDelay}`);
  showRedHeroElements(lastDelay);
}
function showRedHeroElements(masterDelay) {
  masterH1.to(
    ".memorable4",
    {
      color: "#eb4d58",
      duration: appareanceDuration,
      ease: ease
    },
    `start+=${masterDelay}`
  );
  let delay = masterDelay + (appareanceDuration/2);
  masterH1.to(
    "#gsap_cta_btn",
    {
      opacity: 1,
      filter: "blur(0px)",
      duration: appareanceDuration,
      ease: ease
    },
    `start+=${delay}`
  );
}