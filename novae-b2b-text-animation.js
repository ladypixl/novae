const b2bLineStartDelays = [0.3, 0.15, 0.3, 0.45, 0.6, 0.75];
const b2bMinDuration = 1.2;
const b2bMaxDuration = 3.0;

const b2bContainer = document.getElementById("gsap_container_b2b");
const b2bDistanceFromRight = window.innerWidth - b2bContainer.getBoundingClientRect().right;
const b2bLeftPositionValue = b2bContainer.offsetWidth + b2bDistanceFromRight;

const b2bSplit = new SplitText("#gsap_b2b", {
  type: "words, lines",
  linesClass: "line++",
  wordsClass: "word++"
});

// force immediately the position of all words to be out of the screen (otherwise we see them when the scroll reaches them)
document.querySelectorAll(".word").forEach((el) => {
  el.style.position = "relative";
  el.style.left = b2bLeftPositionValue + "px";
});

const b2bMaster = gsap.timeline({
  scrollTrigger: {
    trigger: "#gsap_b2b",
    toggleActions: "restart pause reverse pause", // determines how the linked animation is controlled at the 4 toggle places: onEnter, onLeave, onEnterBack, and onLeaveBack
    start: "top 90%", // when the top of the trigger hits 90 from top of the viewport
    end: "bottom top"// when the bottom of the trigger hits the top of the viewport
  }
});

b2bMaster.add("start", 0);

let b2bWordIndex = 0;
b2bSplit.lines.forEach((line, i) => {
  let tl = gsap.timeline();
  const lineDelay = b2bLineStartDelays[i] ?? i * 0.2;
  const tlStart = `start${i}`;
  tl.add(tlStart, 0);
  const words = Array.from(line.children).filter((el) =>
    el.className.includes("word")
  );
  const total = words.length;
  words.forEach((word, j) => {
    b2bWordIndex++;
    const ratio = j / (total - 1 || 1);
    const duration = b2bMinDuration + (b2bMaxDuration - b2bMinDuration) * ratio;

    tl.fromTo(
      `.word${b2bWordIndex}`,
      {
        left: b2bLeftPositionValue,
        opacity: 0.4,
        filter: window.BLURS.light
      },
      {
        left: 0,
        opacity: 1,
        filter: window.BLURS.none,
        duration: duration,
        ease: window.EFFECTS.easeInOut
      },
      `start+=${lineDelay}`
    );
  });

  b2bMaster.add(tl, "start");
});