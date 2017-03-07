jumpValueR = -200
jumpValueS = 0 //Y value of George's jump
jumpDir = 0 //speed and direction
r = 0;
s = 5;

function preload() {
  table = loadTable("tree_arrays.csv", "csv", "header");
}

function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {
  background(255);
  currentTime = time();
  jumpValueR = jumpValueR - jumpDir;
  jumpValueS = jumpValueS - jumpDir;
  fill(0); //make text black
  text("X: " + mouseX, 0, 5, 300, 300); // print x coordinate in upper left corner
  text("Y: " + mouseY, 0, 20, 300, 300); // print y coordinate in upper left corner, under x coordinate 
  text(currentTime, 0, 40, 300, 300);
  var rows = table.getRows();
  //for (var r = 3; r < 5; r++) {
  var levelOne = rows[r].getNum("Level-1");
  var levelTwo = rows[r].getNum("Level-2");
  var levelThree = rows[r].getNum("Level-3");
  var levelFour = rows[s].getNum("Level-4");
  var levelFive = rows[s].getNum("Level-5");
  var levelSix = rows[s].getNum("Level-6");

  if (1 < currentTime || currentTime < 450) {
    tree(levelOne, 700 + jumpValueR);
    tree(levelTwo, 750 + jumpValueR);
    tree(levelThree, 800 + jumpValueR);
    tree(levelFour, 1000 + jumpValueR);
    tree(levelFive, 1050 + jumpValueR);
    tree(levelSix, 1100 + jumpValueR);
    
  }

  if (300 < currentTime || currentTime < 490 ) {
    tree(levelOne, 700 + jumpValueS);
    tree(levelTwo, 750 + jumpValueS);
    tree(levelThree, 750 + jumpValueS);
    tree(levelFour, 800 + jumpValueS);
    tree(levelFive, 900 + jumpValueS);
    tree(levelSix, 1000 + jumpValueS);
  }




  // tree(100, 600 + jumpValue)
  if (currentTime > 1) { //if frame rate is greater than 10, begin tree movement 
    //causes trees to scroll up the screen
    jumpDir = 2; //tree movement
  }
  if (r < rows.length) {
    if (currentTime == 495) {
      r++;
    }
  }

  if (s < rows.length) {
    if (currentTime == 50) {
      s++;
    }
  }


  if (currentTime > 498) {
    jumpValueR = -200;
    jumpValueR = jumpValueR - jumpDir;
    /*    tree(100, 600 + jumpValue)*/
  }

  if (currentTime > 498) {
    jumpValueS = 0;
    jumpValueS = jumpValueS - jumpDir;
  }

}

function time() {
  return frameCount % 500; // modulo loops frameCount at 1800 by returning remainder after dividing by 1800
}

function tree(treeX, treeY) {
  noStroke();
  fill(140, 82, 25);
  rect(treeX, treeY, 20, 40);
  fill(33, 104, 27);
  triangle(treeX - 15, treeY, treeX + 10, treeY - 70, treeX + 35, treeY)
}