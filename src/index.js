import * as PIXI from 'pixi.js';
import initRenderer from './initRenderer';
import preloadResources from './preloadResources';
import getTexture from './getTexture';

// "Global" variables we need to use across multiple functions
let demoStage;
let blinky;
let pinky;
let hSpeed = 1;
let vSpeed = 1;

// Define the main game loop
const redraw = (time, renderer) => {
  // Redraw when browser is ready
  requestAnimationFrame(t => redraw(t, renderer));

  // Render the scene
  renderer.render(demoStage);
};

document.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'KeyW':
      blinky.y -= 4;
      break;
    case 'KeyS':
      blinky.y += 4;
      break;
    case 'KeyD':
      blinky.x += 4;
      break;
    case 'KeyA':
      blinky.x -= 4;
      break;
    default:
      break;
  }
});

/**
 *  Set up the game after the window and resources have finished loading.
 *  Creates the renderer, sets up the stages, and performs the initial render.
 */
const setup = () => {
  const renderer = initRenderer();

  // Create a container object called the `stage`
  demoStage = new PIXI.Container();

  const ghostTex = getTexture('images/ghost.png');
  blinky = new PIXI.Sprite(ghostTex);
  pinky = new PIXI.Sprite(ghostTex);

  blinky.position.set(160, 80);
  pinky.position.set(50, 50);

  demoStage.addChild(blinky);
  demoStage.addChild(pinky);

  // Perform initial render
  redraw(-1, renderer);
};

/* ---------- Initialisation ---------- */

// Wait until the page is fully loaded
window.addEventListener('load', () => {
  // List of resources to load
  const resources = ['images/ghost.png'];

  // Then load the images
  preloadResources(resources, () => {
    // Then run the setup() function
    setup();
  });
});
