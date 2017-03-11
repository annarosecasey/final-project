var snowboardRight;
var snowboardLeft;
var snowboard;
var x = 250;
var y = 10;
var page = 0;
var rectX = 300;
var rectY = 300;

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
  if (page == 0) {
    fill(156);
    rect(rectX, rectY, 100, 100);
    rectX = max(rectX - 1, 0);
    rectY = max(rectY - 1, 0);
  }
  if (rectX == 0) {
    rect(200, 200, 100, 50);
  }
  if (mouseIsPressed) {
    page = 1;
    rectX = 1;
  }
  if (page == 1) {
    currentSnowboarder();
    if (keyIsPressed) { // Sets up the actions for when a key is pressed
      if (keyCode == RIGHT_ARROW) { // Sets up the action for pressing the RIGHT arrow
        snowboard.x = min(snowboard.x + snowboard.xDir, 450); // Moves the snowboarder right by xDir
        snowboard.img = snowboardRight;
      } else if (keyCode == LEFT_ARROW) { // Sets up the action for pressing the LEFT arrow
        snowboard.x = max(0, snowboard.x - snowboard.xDir); // Moves the snowboarder left by xDir
        snowboard.img = snowboardLeft;
      }
    }
  }
}

function currentSnowboarder() {
  image(snowboard.img, snowboard.x, snowboard.y, 60, 60);
}