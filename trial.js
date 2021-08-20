var canvas = document.getElementById("myCanvas");
var ctx;
var w = 1000;
var h = 600;
var allStars = createData(4);
var allShips = createData(6);
var o1 = {// player1 & spaceship & star
  "x": 200,
  "y": h/2,
  "d": 0,
  "angle": 0,
  "changle": 15,


  "spikes": 5,
  "outerRadius": 30,
  "innerRadius": 12,
}

var o2 = {
  "x": 200,
  "y":h/3,
  "d": 2,
  "dx": 30,
  "dy": 30,
  "c": 200+rand(60),
  "a": 0.5,
  "angle": 0,
  "changle": 15,
  "spikes": 5,
  "outerRadius": 30,
  "innerRadius": 12,
}

document.onkeydown = movePlayer;

setUpCanvas();
animationLoop();


function animationLoop(){
  clear();
  circle(150, 110, 70);
  circle(320, 380, 100);
  circle(800, 200, 150);
  circle(740, 600, 120);
  planetRing();
  // satellite();
  player1(o1);
  forward(o1);
  bounce(o1);
  // starsDrawUpdate(allStars);
  starsDrawUpdate(allStars);
  // spaceshipDrawUpdate(allShips);
  requestAnimationFrame(animationLoop);
}

function starsDrawUpdate(a){
  for(var i=0; i<a.length; i++){
    star(a[i]);
    updateData(a[i]);
  }

}

// function spaceshipDrawUpdate(a){
//   for(var i=0; i<a.length; i++){
//     spaceship(a[i]);
//     updateData(a[i]);
//   }
// }

function createData(num) {
  var allMovingShapes = [];
  for(var i=0; i<num; i++) {
      allMovingShapes.push({
      "x": w/num*i,
      "y": 0,
      "dx": randn(2),
      "dy": 0.5+rand(2),
      "sx": 200,
      "sy":200,
      "c": 200+rand(60),
      "a": 0.5,
      "l": 15,
      "d": 2,
      // "r": 10,
      "spikes": 5,
      "outerRadius": 30,
      "innerRadius": 12
    })
  }
  return allMovingShapes;
}

function updateData(o) {
  var i;
  o.x += o.dx; // change in x
  o.y += o.dy; // change in y
  tyroidal(o);
}

function spaceship(o) {
  var x = o.x;
  var y = o.y;

  ctx.beginPath();
  ctx.moveTo(x, y);
  // (x,y) starts at tip of nose cone
  // first draw bottom half of ship
  ctx.lineTo(x-25, y+10);
  ctx.lineTo(x-90, y+25);
  ctx.lineTo(x-120, y+50);
  ctx.lineTo(x-150, y+55);
  ctx.lineTo(x-150, y+25);
  ctx.lineTo(x-160, y+25);
  ctx.lineTo(x-160, y);
  //top half of ship
  ctx.lineTo(x-160, y-25);
  ctx.lineTo(x-150, y-25);
  ctx.lineTo(x-150, y-55);
  ctx.lineTo(x-120, y-50);
  ctx.lineTo(x-90, y-25);
  ctx.lineTo(x-25, y-10);
  ctx.lineTo(x,y);
  ctx.fillStyle = "hsla("+o.c+",100%, 50%, "+o.a+")";
  ctx.fill();

  o.x = x;
  o.y = y;
}

function star(o) {
  console.log("stars are being drawn");

  ///////////DRAWS STARS ANOTHER WAY
  console.log("stars are being drawn");
  var rot = Math.PI / 2 * 3;
  var x = o.sx;
  var y = o.sy;
  var step = Math.PI / o.spikes;

  ctx.strokeSyle = "#000";
  ctx.beginPath();
  ctx.moveTo(o.sx, o.sy - o.outerRadius)
  for (i = 0; i < o.spikes; i++) {
      x = o.sx + Math.cos(rot) * o.outerRadius;
      y = o.sy + Math.sin(rot) * o.outerRadius;
      ctx.lineTo(x, y)
      rot += step

      x = o.sx + Math.cos(rot) * o.innerRadius;
      y = o.sy + Math.sin(rot) * o.innerRadius;
      ctx.lineTo(x, y)
      rot += step
  }
  ctx.lineTo(o.sx, o.sy - o.outerRadius)
  ctx.closePath();
  ctx.fillStyle='black';
  ctx.fill();

//DRAWS SPACESHIPS
  // var x = o.x;
  // var y = o.y;
  //
  // ctx.beginPath();
  // ctx.moveTo(x, y);
  // // (x,y) starts at tip of nose cone
  // // first draw bottom half of ship
  // ctx.lineTo(x-25, y+10);
  // ctx.lineTo(x-90, y+25);
  // ctx.lineTo(x-120, y+50);
  // ctx.lineTo(x-150, y+55);
  // ctx.lineTo(x-150, y+25);
  // ctx.lineTo(x-160, y+25);
  // ctx.lineTo(x-160, y);
  // //top half of ship
  // ctx.lineTo(x-160, y-25);
  // ctx.lineTo(x-150, y-25);
  // ctx.lineTo(x-150, y-55);
  // ctx.lineTo(x-120, y-50);
  // ctx.lineTo(x-90, y-25);
  // ctx.lineTo(x-25, y-10);
  // ctx.lineTo(x,y);
  // ctx.fillStyle = "hsla("+o.c+",100%, 50%, "+o.a+")";
  // ctx.fill();
  //
  // o.x = x;
  // o.y = y;

////////DRAWS STARS MY WAY
// var x = o.dx;
// var y = o.dy;
//
//
// ctx.beginPath();
// //ctx.fillStyle = "black";
// ctx.moveTo(x,y);
// forward(o2, 15); // updates x,y coordinates, acting as our updateData function from previous modules
// ctx.lineTo(x,y);
// turn(o2, 36);
// forward(o2, 15);
// ctx.lineTo(x, y);
// turn(o2, 252);
// forward(o2, 15);
// ctx.lineTo(x, y);
// turn(o2, 36);
// forward(o2, 15);
// ctx.lineTo(x, y);
// turn(o2, 252);
// forward(o2, 15);
// ctx.lineTo(x, y);
// turn(o2, 36);
// forward(o2, 15);
// ctx.lineTo(x, y);
// turn(o2, 252);
// forward(o2, 15);
// ctx.lineTo(x, y);
// turn(o2, 36);
// forward(o2, 15);
// ctx.lineTo(x, y);
// turn(o2, 252);
// forward(o2, 15);
// ctx.lineTo(x, y);
// turn(o2, 36);
// forward(o2, 15);
// ctx.lineTo(x, y);
// ctx.fillStyle = "hsla("+o.c+",100%, 50%, "+o.a+")";
// ctx.fill();
//
// o.dx = x;
// o.dy = y;

}

function movePlayer(event){

  if(o1 != 0){
    // up = 38
    if(event.keyCode == 38){
      o1.angle = -90;
      forward(o1, 3);
    }
    // // down = 40
    if(event.keyCode == 40){
      o1.angle = 90;
      forward(o1, 3);
    }
    // left 37
    if(event.keyCode == 37){
      o1.angle = 180;
      forward(o1, 3);
      // turn(o1, -15);
    }
    // right 39
    if(event.keyCode == 39){
      o1.angle = 0;
      forward(o1, 3);
      // turn(o1, 15);
    }
  }
  console.log("moveshape", event.keyCode);
}

function turn(o,angle) { // pass object, angle
  if(angle != undefined){ //if angle is undefined
    o.angle += angle;
  }else {
    o.angle += o.changle; // else if angle is defined, it will equal a in angle(o1,a)
  }
}

function tyroidal(o) {
  if(o.x > w) {
    o.x = 0;
  };
  if(o.x < 0) {
    o.x = w;
  };
  if(o.y > h) {
    o.y = 0;
  };
}

function forward(o,d) { //pass object, distance
  var changeX;
  var changeY;
  var oneDegree = Math.PI/180; // same as 2*Math.PI/360
  if(d != undefined) { //if d is not undefined
    o.d = d;
  };
    changeX = o.d*Math.cos(o.angle*oneDegree);
    changeY = o.d*Math.sin(o.angle*oneDegree);
    o.x += changeX;
    o.y += changeY;
}

function bounce(o) {
  if (o.x < 0){
    turn(o, 180);
  };
  if (o.y > h || o.y <0){
    turn(o, 180);
  };
}

function player1(o) {
  var x = o.x;
  var y = o.y;

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.moveTo(x, y);
  // (x,y) starts at tip of nose cone
  // first draw bottom half of ship
  ctx.lineTo(x-25, y+10);
  ctx.lineTo(x-90, y+25);
  ctx.lineTo(x-120, y+50);
  ctx.lineTo(x-150, y+55);
  ctx.lineTo(x-150, y+25);
  ctx.lineTo(x-160, y+25);
  ctx.lineTo(x-160, y);
  //top half of ship
  ctx.lineTo(x-160, y-25);
  ctx.lineTo(x-150, y-25);
  ctx.lineTo(x-150, y-55);
  ctx.lineTo(x-120, y-50);
  ctx.lineTo(x-90, y-25);
  ctx.lineTo(x-25, y-10);
  ctx.lineTo(x,y);
  ctx.fill();

  o.x = x;
  o.y = y;
}

function circle(x,y,r){ //planets
  ctx.beginPath();
  ctx.arc(x,y,r,0, 2*Math.PI);
  // ctx.fillStyle = "hsla("+c+",100%, 50%, "+a+")";
  ctx.fill();
}

function planetRing() {
  ctx.beginPath();
  //x, y, sizeX, sizeY, rotation, start angle, end angle
  ctx.ellipse(800, 200, 60, 220, Math.PI/2.5, 0, 2 * Math.PI);
  ctx.fill();
}

function satellite() {
  var x = 200;
  var y = 350;
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x+40, y); //right
  ctx.lineTo(x+40, y+20); //down
  ctx.lineTo(x+120, y+20); //right
  ctx.lineTo(x+120, y+60); //down
  ctx.lineTo(x+40, y+60); //left
  ctx.lineTo(x+40, y+140); //down
  ctx.lineTo(x, y+140); //left
  ctx.lineTo(x, y+60); //up
  ctx.lineTo(x-80, y+60); //left
  ctx.lineTo(x-80, y+20); //up
  ctx.lineTo(x, y+20); //left
  ctx.lineTo(x, y); //up
  ctx.fill();
}

function clear(){
  ctx.clearRect(0,0,w,h);
}

function randn(r) { // returns a range where 0 is in the middle. e.g. r=10, the range would be 5 to -5
  var result = Math.random()*r - r/2;
  return result
}

function randi(r){ // returns integer within range
  var result = Math.floor(Math.random()*r);
  return result
}

function rand(r){ // returns float number within a range
  var result = Math.random()*r;
  return result
}

function setUpCanvas() {
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = w;
  canvas.height = h;
  canvas.style.border = "1px solid black";
}
