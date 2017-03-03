jumpValue = -200 //Y value of George's jump
jumpDir = 0 //speed and direction
r = 0;

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
  jumpValue = jumpValue - jumpDir;
  fill(0); //make text white
  text("X: " + mouseX, 0, 5, 300, 300); // print x coordinate in upper left corner
  text("Y: " + mouseY, 0, 20, 300, 300); // print y coordinate in upper left corner, under x coordinate 
  text(currentTime, 0, 40, 300, 300);
  var rows = table.getRows();
  //for (var r = 3; r < 5; r++) {
  var levelOne = rows[r].getNum("Level-1");
  var levelTwo = rows[r].getNum("Level-2");
  var levelThree = rows[r].getNum("Level-3");

  tree(levelOne, 700 + jumpValue);
  tree(levelTwo, 700 + jumpValue);
  tree(levelThree, 700 + jumpValue);

  // tree(100, 600 + jumpValue)
  if (currentTime > 10) { //if frame rate is greater than 800, make the balloons stop moving 
    //balloonX moves off the screen
    jumpDir = 2; //balloonY movement
  }
  if (r < rows.length) {
    if (currentTime == 300) {
      r++;
    }
  }
  
  if (currentTime > 300) {
    jumpValue = -200;
    jumpValue = jumpValue - jumpDir;
/*    tree(100, 600 + jumpValue)*/
  }
}

function time() {
  return frameCount % 310; // modulo loops frameCount at 1800 by returning remainder after dividing by 1800
}

function tree(treeX, treeY) {
  noStroke();
  fill(140, 82, 25);
  rect(treeX, treeY, 20, 40);
  fill(33, 104, 27);
  triangle(treeX - 15, treeY, treeX + 10, treeY - 70, treeX + 35, treeY)
}