
const NUM_LAYERS = 8;
const palette = [
    "#878a87",
    "#cbdbc8",
    "#e8e0d4",
    "#b29e91",
    "#9f736c",
    "#b76254",
    "#dfa372",
];
/**
 * @type {import("../types/millefeuille.d.ts").LayerSystem}
 */
let myLayerSystem;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    myLayerSystem = createLayerSystem();

    myLayerSystem.createLayer("background");
    for (let i = 0; i < NUM_LAYERS; i++) {
        myLayerSystem
            .createLayer(i.toString(), {
                // blendMode: BlendModes.MULTIPLY
            })
            .setOpacity(0.5);
    }
    fillAllLayers();
}

function draw() {
    // Composite all myLayerSystem to main canvas
    myLayerSystem.render();
}

function fillAllLayers() {
    myLayerSystem.begin("background");
    clear();
    background(30);
    myLayerSystem.end();

    
	myLayerSystem.getLayers().forEach(fillLayerWithRandom);
}

/**
 * 
 * @param {import("../types/millefeuille.d.ts").Layer} layer
 */
function fillLayerWithRandom(layer) {
    //brittle. relies on layers having numeric names.
	const layerNumber = parseInt(layer.name)

	myLayerSystem.begin(layer.name);
    clear();
    fill(random(palette));
    const numCirclesInLayer = 2;
    for (let i = 0; i < numCirclesInLayer; i++) {
        const x = randomGaussian(0, width / 4);
        const y = randomGaussian(0, height / 4);
        push();
        translate(x, y);
        circle(0, 0, random(50, 150));
        drawDots(layerNumber);
        pop();
    }
	
    myLayerSystem.end();
}

function mousePressed() {
    fillAllLayers();
}

/**
 * draws a number of dots starting at 0, 0, proceeding to the right.  useful for indicating a layer number.
 * @param {number} numDots 
 */
function drawDots(numDots){
		fill(255);
        for(let i =0; i < numDots; i++){
			stroke(30)
			circle(0, 0, 5);
			translate(10, 0)
		}
}