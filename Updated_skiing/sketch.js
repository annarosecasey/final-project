var trees = [];
var numTrees = 300;
var snowboardRight;
var snowboardLeft;
var snowboard = [];
page = 0;
backgroundColor = 255;
score = 50;
xDir = 0;
yDir = -1;
objectSpeed = 2;
jumpValue = 0 //Y value of red line's jump
jumpDir = 5 //speed and direction
var rectX = 300;
var rectY = 300;
var crash
liftX = 395;
liftY = 450;
var startTime

function preload() {
  mySound = loadSound('eye.mp3');
  crash = loadSound('jab_fixed.m4a')
  myFont = loadFont('VT323-Regular.ttf');
  snowboardRight = loadImage("Snowboard_Right.png");
  snowboardLeft = loadImage("Snowboard_Left.png");
}

function setup() {
  // create my canvas
  createCanvas(500, 500);

  mySound.setVolume(0.1);
  mySound.play();

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
      x: random(1, 500),
      y: random(1000, 9000),
      treeColor: color(102, 59, 26),
      leavesColor: color(22, 158, 33),
    });
  }
}

function draw() {
  // clear the background
  if (page == 0) {
    background(94, 190, 242);
    intro();

  }
  if (page == 1) {
    background(backgroundColor);
    noStroke();
    redLine(0, 600 + jumpValue)
    currentTime = skiTime();
    speed();
    gameStart();
    gameOver();
    turnMusicUpText();
    checkTrees();
    gameOverLose();
    //text("Frame Rate: " + currentTime, 0, 20, 300, 300);

    currentSnowboarder();
    for (i = 0; i < trees.length; i++) {
      noFill();
      rect(trees[i].x - 10, trees[i].y - 50, trees[i].whiteBoxX, trees[i].whiteBoxY)
      fill(trees[i].treeColor);
      rect(trees[i].x, trees[i].y, trees[i].length, trees[i].tallness);
      fill(trees[i].leavesColor);
      triangle(trees[i].x - 15, trees[i].y, trees[i].x + 10, trees[i].y - 70, trees[i].x + 40, trees[i].y)
      fill(0);
      rect(trees[i].x, trees[i].y, 20, 1)
      trees[i].x += xDir;
      trees[i].y += yDir - objectSpeed;
    }

    scoreNotLost();

    if (currentTime > 1900) {
      jumpValue = jumpValue - jumpDir;
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
}

function intro() {
  noStroke();
  fill(255);
  triangle(0, 15, 385, 500, 0, 500);
  introTree(25, 200);
  introTree(50, 350);
  introTree(150, 450);
  introTree(225, 450);
  fill(125);
  rect(liftX, liftY + 20, 80, 20);
  stroke(110);
  strokeWeight(6);
  fill(94, 190, 242);
  line(0, -150, 520, 500);
  rect(liftX, liftY, 80, 50);
  line(liftX + 40, liftY - 50, liftX + 40, liftY);
  fill(125);
  rect(liftX, liftY + 20, 80, 20);
  liftX = max(liftX - 1, 15);
  liftY = max(liftY - 1.25, 0);
  fill(100, 30, 100);
  textFont(myFont)
  noStroke();
  textSize(50);
  text("Shred the Gnar!", 200, 50, 500, 500);
  textSize(20);
  text("Created by: Anna & Julie", 250, 100, 300, 300)
  if (liftY == 0) {
    noStroke();
    fill(100, 30, 100);
    rect(200, 200, 100, 50, 5);
    fill(255);
    textSize(21);
    text("START", 230, 233);
  }
  if (mouseIsPressed) {
    page = 1;
    liftX = 1;
    startTime = frameCount
  }
}

function introTree(x, y) {
  fill(102, 59, 26);
  rect(x, y, 20, 40);
  fill(22, 158, 33);
  triangle(x - 15, y, x + 10, y - 70, x + 40, y);
}

function currentSnowboarder() {
  image(snowboard.img, snowboard.x, snowboard.y, 60, 60);
  fill(150, 0, 0);
}



function checkTrees() {
  for (i = 0; i < trees.length; i++) {
    if (snowboard.x + 30 > trees[i].x && snowboard.y + 30 > trees[i].y && snowboard.x + 30 < trees[i].x + trees[i].length && snowboard.y + 30 < trees[i].y + trees[i].tallness) {
      score = score - 1;
      background(200, 0, 0);
      fill(255);
      textSize(100);
      text("Ouch!", 180, 200, 300, 300)
      if (!crash.isPlaying()) {
        crash.setVolume(0.1);
        crash.play();
      }
    }
  }
}

function skiTime() {
  if (page == 1) {
    return frameCount - startTime;
  }
}

function turnMusicUpText() {
  if (currentTime > 0 && currentTime < 200) {
    fill(100, 20, 80);
    textSize(30);
    textFont(myFont);
    text("Turn your volume up!", 100, 150, 300, 300)
  }
}

function gameStart() { // when mouse is pressed
  if (page == 1 && currentTime > 0 && currentTime < 50) {
    background(255);
    fill(100, 20, 80);
    textSize(30);
    text("3", 220, 200, 300, 300)
  } else if (page == 1 && currentTime > 50 && currentTime < 100) {
    background(255);
    fill(100, 20, 80);
    textSize(30);
    text("2", 220, 200, 300, 300)
  } else if (page == 1 && currentTime > 100 && currentTime < 150) {
    background(255);
    fill(100, 20, 80);
    textSize(30);
    text("1", 220, 200, 300, 300)
  } else if (page == 1 && currentTime > 150 && currentTime < 200) {
    background(255);
    fill(100, 20, 80);
    textSize(30);
    text("GO!!!", 200, 200, 300, 300)
  }
}

function gameOver() { // when mouse is pressed
  if (currentTime > 2100 && score > 0) {
    //page = 1 + page; // make page one minus page
    background(100, 30, 100);
    fill(255);
    textSize(50);
    text("Nice job!", 180, 200, 300, 300)
    text("Score: " + score, 180, 375, 300)
  }
}

function gameOverLose() { // when mouse is pressed
  if (score < 0) {
    //page = 1 + page; // make page one minus page
    background(100, 30, 100);
    fill(255);
    textSize(50);
    text("GAME OVER", 150, 200, 300, 300)
    text("Score: " + 0, 180, 375, 300)
  }
}

function speed() { // when mouse is pressed
  if (currentTime > 600) {
    objectSpeed = currentTime / 300
  }
  if (currentTime > 1900 && currentTime < 2000) {
    snowboard.y = snowboard.y + 1
  }

}

function scoreNotLost() { // when mouse is pressed
  if (score > 0 && currentTime < 2200) {
    fill(0);
    textSize(50);
    fill(0, 200, 250);
    text("Score: " + score, 0, 5, 300, 300);
  }
}

function redLine(x, y) {
  fill(200, 0, 0);
  rect(x, y, 500, 20);
}