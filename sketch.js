// if (module.hot) {
// 	module.hot.dispose(function() {
// 		// module is about to be replaced
// 	});
// 	module.hot.accept(function() {
// 		// module or one of its dependencies was just updated
// 	});
// }

// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 1: Random Walker

const sub = p5.Vector.sub;

let walkers = [];
let slider;
let accSliderX;
let accSliderY;
let button;
let shouldStart = false;
function setup() {
	createCanvas(640, 360);
	// Make a Walker object
	slider = createSlider(0, 3000, 1);
	slider.position(10, 10);
	slider.style("width", "80px");

	// accSliderX = createSlider(-1, 1, 0);
	// accSliderX.position(20, 40);
	// accSliderY = createSlider(-1, 1, 0);
	// accSliderY.position(20, 80);
	button = createButton("start");
	button.mousePressed(() => (shouldStart = true));
	background(51);
}

function draw() {
	if (!shouldStart) return;
	let slideVal = slider.value();
	if (slideVal !== walkers.length) {
		const countDiv = document.querySelector("#count");
		countDiv.textContent = `Number of Particles: ${slideVal}`;
		clear();

		walkers = new Array(slideVal).fill(0).map((item, idx) => {
			return new Walker(25);
		});
	}
	background(51);

	// Update and display object
	walkers.forEach(walker => {
		walker.update();
		walker.display();
	});
}

function Walker(size) {
	// Start Walker in center
	this.pos = createVector(width / 2, height / 2);
	this.vel = createVector(0, 0);
	this.fillColor = color(random(0, 255), random(0, 150), random(0, 150));
	// this.fillColor = color(255);
	this.size = size || 10;

	this.update = function(accVec) {
		let mouse = createVector(mouseX, mouseY);
		this.acc = sub(mouse, this.pos);
		this.acc.normalize();
		this.acc.mult(0.1);
		this.acc.add(random(-0.1, 0.1), random(-0.1, 0.1));

		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.size = this.size + random(-0.2, 0.2);
	};

	this.display = function() {
		// Draw Walker as circle
		stroke("rgba(0,255,0,0)");
		fill(this.fillColor);
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	};
}
