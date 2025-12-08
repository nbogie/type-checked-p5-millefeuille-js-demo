//ideas:
// procgen map layers: land, water, vegetation, snow, clouds, ...?
// noise layers strata (like my shader planes one)

const palette = [
	"#878a87",
	"#cbdbc8",
	"#e8e0d4",
	"#b29e91",
	"#9f736c",
	"#b76254",
	"#dfa372"
];
let layers;

function setup() {
	createCanvas(800, 600, WEBGL);

	layers = createLayerSystem();

	layers.createLayer('background');
	for (let i = 0; i < 5; i++) {
		layers.createLayer('rnd-' + i, {
				// blendMode: BlendModes.MULTIPLY
			})
			.setOpacity(0.7)
	}
	fillAllLayers()
}


function draw() {
	
	// Composite all layers to main canvas
	layers.render();
}

function fillAllLayers(){
	// Draw to background layer
	layers.begin('background');
	clear();
	background(30);
	layers.end();

	for (let i = 0; i < 5; i++) {
		fillLayerWithRandom("rnd-" + i);
	}

}

function fillLayerWithRandom(layerName) {
	layers.begin(layerName);
	clear();
	fill(random(palette))
	for (let i = 0; i < 5; i++) {
		circle(randomGaussian(0, width/2), randomGaussian(0, height/2), random(50, 150))
	}
	layers.end();
}
function mousePressed(){
	fillAllLayers()
}