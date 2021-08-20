var canvas = document.getElementById("myCanvas");
var ctx;
var w = 1000;
var h = 600;
var allStars = [];
var o1 = {
  "x": 200,
  "y": h/2,
  "d": 0,
  "angle": 0,
  "changle": 15
}

var o2 = {
  "dx": randn(2),
  "dy": 0.5+rand(2),
  "c": 200+rand(60),
  "a": 0.5,
  "spikes": 5,
  "outerRadius": 25,
  "innerRadius": 12
}

document.onkeydown = movePlayer;

setUpCanvas();
createData(4); // make __ stars
animationLoop();


// LEVEL 1: SPACE
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
  starsDrawUpdate(allStars);
  requestAnimationFrame(animationLoop);
}

function starsDrawUpdate(a){
  for(var i=0; i<a.length; i++){
    star(a[i]);
    updateData(a[i]);
  }
}

function createData(num) {
  for(var i=0; i<num; i++) {
    allStars.push({
      "x": w/num*i,
      "y": 0,
      "dx": randn(2),
      "dy": 0.5+rand(2),
      "c": 200+rand(60),
      "a": 0.5,
      "spikes": 5,
      "outerRadius": 25,
      "innerRadius": 12
    })
  }
}

function updateData(o) {
  var i;
  o.x += o.dx; // change in x
  o.y += o.dy; // change in y
  tyroidal(o);
}

function star(o) {
  var rot = Math.PI / 2 * 3;
  var x = o.dx;
  var y = o.dy;
  var step = Math.PI / o.spikes;

  ctx.strokeSyle = "#000";
  ctx.beginPath();
  ctx.moveTo(o.dx, o.dy - o.outerRadius)
  for (i = 0; i < o.spikes; i++) {
      x = o.dx + Math.cos(rot) * o.outerRadius;
      y = o.dy + Math.sin(rot) * o.outerRadius;
      ctx.lineTo(x, y)
      rot += step

      x = o.dx + Math.cos(rot) * o.innerRadius;
      y = o.dy + Math.sin(rot) * o.innerRadius;
      ctx.lineTo(x, y)
      rot += step
  }
  ctx.lineTo(o.dx, o.dy - o.outerRadius)
  ctx.closePath();
  ctx.fillStyle='black';
  ctx.fill();

//DRAWS CIRCLES
  // ctx.beginPath();
  // ctx.arc(o.x,o.y,o.r,0, 2*Math.PI);
  // ctx.fillStyle = "hsla("+o.c+",100%, 50%, "+o.a+")";
  // ctx.fill();
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
    o.angle += o.changle;
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
  var a = o.angle;
  var d = o.d;

  // turn(o, 180); // makes it so that we rotate from the center
  // forward(o, o.x);
  // turn(o, 90);
  // forward(o, o.y);
  // turn(o, 90);

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
  o.d = d;
  o.angle = a;
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
