var snowboardRight;
var snowboardLeft;
var snowboard;
var x = 250;
var y = 10;

function preload() {
  snowboardRight = loadImage("Snowboard_Right.png");
  snowboardLeft = loadImage("Snowboard_Left.png");
}

function setup() {
  createCanvas(500, 500);
  
snowboard = {
    x: 250,
    y: 0,
    xDir: 5,
    snowboxX: 20,
    snowboxY: 30,
    img: snowboardRight
  };

}

function draw() {
  background(255);
  image(snowboard.img, snowboard.x, snowboard.y, 60, 60);
  if (keyIsPressed) { // Sets up the actions for when a key is pressed
    if (keyCode == RIGHT_ARROW) { // Sets up the action for pressing the RIGHT arrow
      snowboard.x = min(snowboard.x + snowboard.xDir, 450);// Moves the snowboarder right by xDir
      snowboard.img = snowboardRight;
    } else if (keyCode == LEFT_ARROW) { // Sets up the action for pressing the LEFT arrow
      snowboard.x = max(0, snowboard.x - snowboard.xDir); // Moves the snowboarder left by xDir
      snowboard.img = snowboardLeft;
    }
  }
}