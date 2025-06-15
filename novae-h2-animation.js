// split all H2 in chars
const splitPortfolio = splitH2Text("portfolio");
const splitSignature = splitH2Text("signature");
const splitProcess = splitH2Text("process");
const splitContact = splitH2Text("contact");

// create a master timeline per H2
const masterPortfolioTimeline = createH2MasterTimeline("portfolio");
const masterSignatureTimeline = createH2MasterTimeline("signature");
const masterProcessTimeline = createH2MasterTimeline("process");
const masterContactTimeline = createH2MasterTimeline("contact");

// highlight specific characters with the accent color
highlightH2Characters(masterPortfolioTimeline, ".portfolio3");
highlightH2Characters(masterSignatureTimeline, ".signature3");
highlightH2Characters(masterProcessTimeline, ".process6");
highlightH2Characters(masterContactTimeline, ".contact5");

function highlightH2Characters(timeline, className) {
	timeline.add(
	  gsap.fromTo(
		className,
		{
		  color: window.COLORS.text
		},
		{
		  color: window.COLORS.accent,
		  duration: 3,
		  ease: window.EFFECTS.easeInOut
		}
	  ),
	  "start+=0.4"
	);
}

function createH2MasterTimeline(name) {
	let master = gsap.timeline({
	  scrollTrigger: {
		trigger: `#gsap_h2_${name}`,
		toggleActions: "play none none none",
		start: "top 80%",
		end: "+=400"
	  }
	});
	master.add("start", 0);
	master.add(
	  gsap.fromTo(
		`#gsap_h2_${name}`,
		{
		  opacity: 0,
		  filter: window.BLURS.light
		},
		{
		  opacity: 1,
		  filter: window.BLURS.none,
		  duration: 2,
		  ease: window.EFFECTS.easeInOut
		}
	  ),
	  "start"
	);
	return master; 
}

function splitH2Text(name) {
	return new SplitText(
	`#gsap_h2_${name}`, 
	{
	  type: "chars",
	  charsClass: `${name}++`
	});
}
