var trees = [];
var numTrees = 100;
var snowboardRight;
var snowboardLeft;
var snowboard = [];
page = 0;

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
      xDir: 0,
      yDir: -1,
      treeColor: color(102, 59, 26),
      leavesColor: color(22, 158, 33),
    });
  }
}

function draw() {
  // clear the background
  background(255);
  currentSnowboarder();
  // loop through the circles array
  // draw all the circles
  for (i = 0; i < trees.length; i++) {
    noFill();
    rect(trees[i].x - 10, trees[i].y - 50, trees[i].whiteBoxX, trees[i].whiteBoxY)
    fill(trees[i].treeColor);
    rect(trees[i].x, trees[i].y, trees[i].length, trees[i].tallness);
    fill(trees[i].leavesColor);
    triangle(trees[i].x - 15, trees[i].y, trees[i].x + 10, trees[i].y - 70, trees[i].x + 40, trees[i].y)


    //removeCollisions(i);
    // advance them forward
    trees[i].x += trees[i].xDir;
    trees[i].y += trees[i].yDir;
  }

  if (keyIsPressed) { // Sets up the actions for when a key is pressed
    if (keyCode == RIGHT_ARROW) { // Sets up the action for pressing the RIGHT arrow
      snowboard.x = min(snowboard.x + 2, 450); // Moves the basketball right 10 pixels at a time - stops at 950
      snowboard.img = snowboardRight
    } else if (keyCode == LEFT_ARROW) { // Sets up the action for pressing the LEFT arrow
      snowboard.x = max(0, snowboard.x - 2); // Moves the basketball left 10 pixels at a time - stops at 0
      snowboard.img = snowboardLeft
    }
  }
}

function checkTrees() {
  for (i = 0; i < trees.length; i++) {
    if (trees[i].whiteBoxX == snowboard.x) {

    }
  }
}







function currentSnowboarder() {
  image(snowboard.img, snowboard.x, snowboard.y, 60, 60);
}