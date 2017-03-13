// Julie Stuart and Anna Casey
// last edited 3/12/2017
//Final project is a skiing game where users ski down hill and avoid trees
var trees = []; // tree array
var numTrees = 300; // number of trees
var snowboardRight; // snowboard image right
var snowboardLeft; //snowboard image left
var snowboard = []; // snowboard array
page = 0; // page equals 0 
backgroundColor = 255;
score = 50; // starting score
xDir = 0; // x direction of snowboarder
yDir = -1; // y direction of snowboarder
objectSpeed = 2; //speed of our objects
jumpValue = 0 //Y value of red line's jump
jumpDir = 5 //speed and direction
var crash // crash sound variable
liftX = 395; // starting position of the lift x
liftY = 450; // starting position of lift for y
var startTime // time after user hits start

function preload() {
  mySound = loadSound('Eye.mp3'); //eye of the tiger music
  crash = loadSound('jab_fixed.m4a') // crash sound
  myFont = loadFont('VT323-Regular.ttf'); // digital font
  snowboardRight = loadImage("Snowboard_Right.png"); //right image
  snowboardLeft = loadImage("Snowboard_Left.png"); // left image
}

function setup() {
  // create my canvas
  createCanvas(500, 500);

  mySound.setVolume(0.1); //music volume
  mySound.play(); //play music

  snowboard = { //snowboard object
    x: 250, // starting x
    y: 0, // starting y
    xDir: 5, // speed moving left and right
    img: snowboardRight //sets up intial image of snowboarder
  };

  
  noStroke(); //no stroke around trees
  
  for (i = 0; i < numTrees; i++) { // adds trees to object in random location

    append(trees, { //tree object
      length: 20, 
      tallness: 40,
      whiteBoxX: 40, //invisible box around tree 
      whiteBoxY: 80, //invisible box around tree
      x: random(1, 500), //random x values
      y: random(1000, 9000), //random y values
      treeColor: color(102, 59, 26), // brown trunk
      leavesColor: color(22, 158, 33), //gree leaves
    });
  }
}

function draw() {
  // clear the background
  if (page == 0) { // page equals zero
    background(94, 190, 242); // blue
    intro(); // call intro start page

  }
  if (page == 1) {
    background(backgroundColor); //background variable
    noStroke(); // no lines
    redLine(0, 600 + jumpValue) // finish line begins at 600
    currentTime = skiTime(); // currentTime is variable
    speed(); // calls object speed
    gameStart(); //game start intro countdown
    gameOver(); //when the game is completed
    turnMusicUpText(); //turn music up text
    checkTrees(); //calls tree array for loop
    gameOverLose(); //when the player loses
    //text("Frame Rate: " + currentTime, 0, 20, 300, 300);
    currentSnowboarder(); // calls snowboarder
    
    for (i = 0; i < trees.length; i++) { // draws trees
      noFill(); // no fill on invisible box
      rect(trees[i].x - 10, trees[i].y - 50, trees[i].whiteBoxX, trees[i].whiteBoxY)
      fill(trees[i].treeColor); // brown trunk
      rect(trees[i].x, trees[i].y, trees[i].length, trees[i].tallness); //trunk dimensions
      fill(trees[i].leavesColor); // green leaves
      triangle(trees[i].x - 15, trees[i].y, trees[i].x + 10, trees[i].y - 70, trees[i].x + 40, trees[i].y) // leaf dimensions
      trees[i].y += yDir - objectSpeed; // tree y dir
    }

    scoreNotLost(); //show score in center if user doesn't lose

    if (currentTime > 1900) { // finish line moves after 1900
      jumpValue = jumpValue - jumpDir; // makes line move
    }

    if (keyIsPressed) { // Sets up the actions for when a key is pressed
      if (keyCode == RIGHT_ARROW) { // Sets up the action for pressing the RIGHT arrow
        snowboard.x = min(snowboard.x + objectSpeed, 450); // Moves the snowboard right
        snowboard.img = snowboardRight // right facing
      } else if (keyCode == LEFT_ARROW) { // Sets up the action for pressing the LEFT arrow
        snowboard.x = max(0, snowboard.x - objectSpeed); // Moves the snowboard left 
        snowboard.img = snowboardLeft // left facing image
      }
    }
  }
}

function intro() { //starts intro functions
  noStroke();
  fill(255); // white
  triangle(0, 15, 385, 500, 0, 500); // mountain
  introTree(25, 200); //calls trees
  introTree(50, 350);
  introTree(150, 450);
  introTree(225, 450);
  fill(125); // gray
  rect(liftX, liftY + 20, 80, 20); //tram
  stroke(110); // gray tram line
  strokeWeight(6); // thick
  fill(94, 190, 242); // blue
  line(0, -150, 520, 500); // tram stripe
  rect(liftX, liftY, 80, 50); // tram box
  line(liftX + 40, liftY - 50, liftX + 40, liftY); //tram stripe
  fill(125); // gray
  rect(liftX, liftY + 20, 80, 20); //inside tram
  liftX = max(liftX - 1, 15); //makes lift move left
  liftY = max(liftY - 1.25, 0); // makes lift move right
  fill(100, 30, 100); // purple
  textFont(myFont) // digital font
  noStroke(); // no stroke
  textSize(50); // big text
  text("Shred the Gnar!", 200, 50, 500, 500);
  textSize(20);
  text("Created by: Anna & Julie", 250, 100, 300, 300)
  if (liftY == 0) { //show start button after lift goes up
    noStroke();
    fill(100, 30, 100); //purple
    rect(200, 200, 100, 50, 5); // start button
    fill(255); // white
    textSize(21);
    text("START", 230, 233);
  }
  if (mouseIsPressed) { //change page when mouse is pressed
    page = 1;
    liftX = 1;
    startTime = frameCount // start time equals frame count
  }
}

function introTree(x, y) { // draws itnro trees
  fill(102, 59, 26);
  rect(x, y, 20, 40);
  fill(22, 158, 33);
  triangle(x - 15, y, x + 10, y - 70, x + 40, y);
}

function currentSnowboarder() { // draws snowboarders
  image(snowboard.img, snowboard.x, snowboard.y, 60, 60); //location
}

function checkTrees() { //checks if snowboard hits the trees and shows Ouch or play sounds if true
  for (i = 0; i < trees.length; i++) {
    if (snowboard.x + 30 > trees[i].x //if snowboard x overlaps with x on the left side
    && snowboard.y + 30 > trees[i].y //if snowboard y overlaps with y on the top side
    && snowboard.x + 30 < trees[i].x + trees[i].length //if snowboard x overlaps with x on the right side
    && snowboard.y + 30 < trees[i].y + trees[i].tallness) {//if snowboard y overlaps with y on the bottom side
      score = score - 1; // subtract a point
      background(200, 0, 0); // make background red
      fill(255); // text white
      textSize(100); // big text
      text("Ouch!", 180, 200, 300, 300) //show ouch
      if (!crash.isPlaying()) { // if crash is not already playing
        crash.setVolume(0.1); // volume lower
        crash.play(); // play crash
      }
    }
  }
}

function skiTime() { //variable for time beginning on page 1
  if (page == 1) { //if page equals 1 
    return frameCount - startTime; // subtract the time equal to when the program opens to when the user hits send from the frame count 
  }
}


  function currentSnowboarder() { //snowboard dude
    image(snowboard.img, snowboard.x, snowboard.y, 60, 60); //location and size of image
  }

function turnMusicUpText() { //shows music text 
  if (currentTime > 0 && currentTime < 200) { //page 1 time is between 0 and 200
    fill(100, 20, 80); // purple
    textSize(30); //big text
    textFont(myFont); //new digital font
    text("Turn your volume up!", 100, 150, 300, 300) //text
  }
}

function gameStart() { // countdown at beginning of game
  if (page == 1 && currentTime > 0 && currentTime < 50) { //if page equals 1 and current time is greater than zero
    background(255); //white
    fill(100, 20, 80); // purple
    textSize(30); // text size
    text("3", 220, 200, 300, 300) // text for 3 
  } else if (page == 1 && currentTime > 50 && currentTime < 100) { // greater than 50
    background(255); //white
    fill(100, 20, 80); // purple
    textSize(30);
    text("2", 220, 200, 300, 300) // 2 
  } else if (page == 1 && currentTime > 100 && currentTime < 150) { //greater than 100
    background(255);
    fill(100, 20, 80);
    textSize(30);
    text("1", 220, 200, 300, 300)
  } else if (page == 1 && currentTime > 150 && currentTime < 200) { //greater than 150
    background(255);
    fill(100, 20, 80);
    textSize(30);
    text("GO!!!", 200, 200, 300, 300)
  }
}

function gameOver() { // when game is over
  if (currentTime > 2100 && score > 0) { //if the game has run and the user still has a score
    background(100, 30, 100); // purple
    fill(255); //white
    textSize(50); // big
    text("Nice job!", 180, 200, 300, 300)
    text("Score: " + score, 180, 375, 300)
  }
}

function gameOverLose() { // when user loses the game, show game over
  if (score < 0) {
    background(100, 30, 100);
    fill(255);
    textSize(50);
    text("GAME OVER", 150, 200, 300, 300)
    text("Score: " + 0, 180, 375, 300)
  }
}

function speed() { // speed of trees increases after time passes 600
  if (currentTime > 600) {
    objectSpeed = currentTime / 300
  }
  if (currentTime > 1900 && currentTime < 2000) { // make the snowboarder move after 1900
    snowboard.y = snowboard.y + 1
  }

}

function scoreNotLost() { // if user completes the game, show the score in the middle of the page
  if (score > 0 && currentTime < 2200) {
    fill(0);
    textSize(50);
    fill(0, 200, 250);
    text("Score: " + score, 0, 5, 300, 300);
  }
}

function redLine(x, y) { //finish line at the end
  fill(200, 0, 0);
  rect(x, y, 500, 20);
}
