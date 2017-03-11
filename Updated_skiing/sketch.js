var trees = [];
var numTrees = 150;
var snowboardRight;
var snowboardLeft;
var snowboard = [];
backgroundColor = 255;
score = 100;
xDir = 0;
yDir = -1;
objectSpeed = 2
page = 1

function preload() {
  snowboardRight = loadImage("Snowboard_Right.png");
  snowboardLeft = loadImage("Snowboard_Left.png");
}

function setup() {
  // create my canvas
  createCanvas(500, 500);

  snowboard = {
    x: 250,
    y: 0,
    xDir: 5,
    snowboxX: 20,
    snowboxY: 30,
    img: snowboardRight
  };

  noStroke();

  // add them to teh circles array
  for (i = 0; i < numTrees; i++) {
    // define the current circles size

    // add this new circle to the array
    append(trees, {
      length: 20,
      tallness: 40,
      whiteBoxX: 40,
      whiteBoxY: 80,
      x: random(1, 450),
      y: random(500, 7000),
      treeColor: color(102, 59, 26),
      leavesColor: color(22, 158, 33),
    });
  }
}

function draw() {
  // clear the background
  background(backgroundColor);
  currentSnowboarder();
  checkTrees();
  currentTime = skiTime();
  gameOver();
  speed();
  fill(0);
  text("Score: " + score, 0, 5, 300, 300);
  text("Frame Rate: " + currentTime, 0, 20, 300, 300); // print x coordinate in upper left corner
  // loop through the circles array
  // draw all the circles
  for (i = 0; i < trees.length; i++) {
    noFill();
    rect(trees[i].x - 10, trees[i].y - 50, trees[i].whiteBoxX, trees[i].whiteBoxY)
    fill(trees[i].treeColor);
    rect(trees[i].x, trees[i].y, trees[i].length, trees[i].tallness);
    fill(trees[i].leavesColor);
    triangle(trees[i].x - 15, trees[i].y, trees[i].x + 10, trees[i].y - 70, trees[i].x + 40, trees[i].y)



    trees[i].x += xDir;
    trees[i].y += yDir - objectSpeed;
  }

  if (keyIsPressed) { // Sets up the actions for when a key is pressed
    if (keyCode == RIGHT_ARROW) { // Sets up the action for pressing the RIGHT arrow
      snowboard.x = min(snowboard.x + objectSpeed, 450); // Moves the basketball right 10 pixels at a time - stops at 950
      snowboard.img = snowboardRight
    } else if (keyCode == LEFT_ARROW) { // Sets up the action for pressing the LEFT arrow
      snowboard.x = max(0, snowboard.x - objectSpeed); // Moves the basketball left 10 pixels at a time - stops at 0
      snowboard.img = snowboardLeft
    }
  }
}

function checkTrees() {
  for (i = 0; i < trees.length; i++) {
    if (snowboard.x + 30 > trees[i].x && snowboard.y + 30 > trees[i].y && snowboard.x + 30 < trees[i].x + trees[i].length && snowboard.y + 30 < trees[i].y + trees[i].tallness) {
      score = score - 1;
    }
  }
}

function currentSnowboarder() {
  image(snowboard.img, snowboard.x, snowboard.y, 60, 60);
  fill(150, 0, 0);
}

function skiTime() {
  return frameCount; // modulo loops frameCount at 1800 by returning remainder after dividing by 1800
}

function gameOver() { // when mouse is pressed
  if (currentTime > 2300)
  //page = 1 + page; // make page one minus page
    background(100, 30, 100);
    fill(255);
    textSize(30);
    text("GAME OVER", 200, 200, 300, 300)
}
function speed() { // when mouse is pressed
  if (currentTime > 600) {
    objectSpeed = 3
  }
}