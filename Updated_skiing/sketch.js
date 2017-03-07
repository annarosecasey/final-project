// array to hold all the balls
var trees = [];
var numCircles = 100;
var snowboardRight;
var snowboardLeft;
var snowboard = [];
var snowBoardx = 250;
var snowBoardy = 10;

function preload() {
  snowboardRight = loadImage("Snowboard_Right.png");
  snowboardLeft = loadImage("Snowboard_Left.png");
}

function setup() {
  // create my canvas
  createCanvas(500, 500);
  // set to noStroke, so the circles do no have outlines
  noStroke();
  image(snowboardLeft, snowBoardx, snowBoardy, 60, 60);
  // create numCircles circle objects
  // add them to teh circles array
  for (i = 0; i < numCircles; i++) {
    // define the current circles size
    
    // add this new circle to the array
    append(trees, 
      { length: 20,
        tallness: 40,
        whiteBoxX: 40,
        whiteBoxY: 80,
        x: random(20, 300),
        y: random(700,500),
        xDir: 0,
        yDir: -1,
        treeColor: color(102,59,26),
        leavesColor: color(22, 158, 33),
      }
    );
  }
}

function draw() {
  // clear the background
  background(255);
  image(snowboardLeft, snowBoardx, snowBoardy, 60, 60);
  // loop through the circles array
  // draw all the circles
  for (i = 0; i < trees.length; i++) {
    noFill();
    rect(trees[i].x - 10, trees[i].y - 50, trees[i].whiteBoxX, trees[i].whiteBoxY)
    fill(trees[i].treeColor);
    rect(trees[i].x, trees[i].y, trees[i].length, trees[i].tallness);
    fill(trees[i].leavesColor);
    triangle(trees[i].x -15, trees[i].y, trees[i].x + 10, trees[i].y -70, trees[i].x + 40, trees[i].y)
    
    
    removeCollisions(i);
    // advance them forward
    trees[i].x += trees[i].xDir;
    trees[i].y += trees[i].yDir;
}
  if (keyIsPressed) { // Sets up the actions for when a key is pressed
    if (keyCode == RIGHT_ARROW) { // Sets up the action for pressing the RIGHT arrow
      snowBoardx = min(snowBoardx + 10, 500); // Moves the basketball right 10 pixels at a time - stops at 950
      image(snowboardRight, snowBoardx, snowBoardy, 60, 60);
    } else if (keyCode == LEFT_ARROW) { // Sets up the action for pressing the LEFT arrow
      image(snowboardLeft, snowBoardx, snowBoardy, 60, 60); // This calls the snowboarder
      snowBoardx = max(0, snowBoardx - 10); // Moves the basketball left 10 pixels at a time - stops at 0
    }
  }
}

  


function removeCollisions(i) {
  for (j = 0; j < trees.length; j++) {
    if (i != j) {
      if (Math.abs(trees[i].x - trees[j].x) < 90 &&
          Math.abs(trees[i].y - trees[j].y) < 90) {
        trees.splice(i, 1);
        j = trees.length;
      }
    } 
  }
}
