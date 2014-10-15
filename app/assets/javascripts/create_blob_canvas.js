// Defining variables and functions

var canvas_width;
var canvas_height;
var globalMouseCoords = [0, 0];
var circleColour = 'yellow';
var eyes_closed = false;
var context;
var canvas;
var currentURL = $(location).attr('pathname');
var blob = null;
var circleCenterX;
var circleCenterY;
var strawberry_status = false;
var hand_status = false;



var offsetHeightandWidth = function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  canvas_width = canvas.width;
  canvas_height = canvas.height;

  circleCenterX = canvas_width/2;
  circleCenterY = canvas_height/2;

}

var colours = ['blank', 'yellow', 'red', 'blue', 'purple', 'pink', 'green', 'gray', 'black', 'white'];
var colouredSquares = [];
var initial_start;

var generateSquares = function() {
  var length = colours.length;
  initial_start = canvas.width/4 - length * 5;
  for(var i = 1; i < length; i++){
    var square = new Object();
    square.X = initial_start + (i * 70);
    square.Y = canvas_height - 100;
    square.widtth = 50;
    square.heightt = 50;
    square.colour = colours[i];

    colouredSquares.push(square);
  }

}


var drawSquare = function(square) {
  context.beginPath();
  context.rect(square.X, square.Y, square.widtth, square.heightt);
  context.fillStyle = square.colour;
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  context.stroke();

}

var drawSquares = function() {
  var length = colouredSquares.length;
  for(var i = 0; i < length; i++){
    var square = colouredSquares[i];
    drawSquare(square);
  }
}

// Calling stuff

var setCanvas = function(page){
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  offsetHeightandWidth();
  blob = null;

  if(page == "new_blob"){
    generateSquares();
    draw_new();
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    var submit = document.getElementById("submit");
    submit.addEventListener('mousedown', submitBlob);
   }

  if(page == "view_blob"){
    $.get(currentURL, function(_blob) {
      blob = _blob; 
      draw_view();

      canvas.addEventListener('mousemove', onMouseMove);

      // Hand
      var hand = document.getElementById("hand");
      hand.addEventListener('mousedown', clickedHand);
      
      // Strawberry
      var strawberry = document.getElementById("strawberry");
      strawberry.addEventListener('mousedown', clickedFood);

      // Other EventListeners
      canvas.addEventListener('mousedown', unClickedAction);
    });
  }

  window.addEventListener('load', onLoadFunction);

}


//draw pages:

var draw_new = function() {

  offsetHeightandWidth();
  drawBlob();
  drawSquares();
  requestAnimationFrame(draw_new);
}

var draw_view = function() {
  offsetHeightandWidth();

  drawBlob();
  if(strawberry_status) drawStrawberry();
  if(hand_status) drawHand();
  requestAnimationFrame(draw_view);
}

// blob stuff


var drawExpression = function() {
  var current_time = new Date().getTime() / 1000;
  var last_ate = blob.last_ate;
  var last_pet = blob.last_pet;
  if(last_ate < current_time - 14400){
    drawFrown();
    drawTears();
  } else if(last_ate < current_time - 1000){
    drawFrown();
  } else if((last_pet < current_time - 100) && (last_ate < current_time)) {
    drawSmile();
  } else {
    drawSuperSmile();
  }

}

var drawSmile = function(){
  context.beginPath();
  context.arc(canvas_width/2, canvas_height/2,50,0*Math.PI,1*Math.PI);
  context.stroke();

}

var drawFrown = function(){
  context.beginPath();
  context.arc(canvas_width/2, canvas_height/2 + 50,50,1.1*Math.PI,-0.2*Math.PI);
  context.stroke();

}

var drawTears = function() {

}

var drawSuperSmile = function() {
  context.beginPath();
  context.arc(canvas_width/2, canvas_height/2 + 10,80,0*Math.PI,1*Math.PI);
  context.closePath();
  context.fillStyle = 'red';
  context.fill();
  context.stroke();

}


var drawBlob = function() {
  drawCircleBody();
  drawEyes();
  if(blob){
    drawExpression();
  } else {
    drawSmile();
  }
}

var drawCircleBody = function() {

  context.beginPath();
  context.arc(circleCenterX, circleCenterY, 100, 0, 2 * Math.PI, false);
  context.fillStyle =  circleColour;
  if(blob != null) {
    context.fillStyle = blob.colour;
  }
  context.fill();
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  context.stroke();

}

var drawEyes = function() {
  var firstEyeXPosition = canvas_width/2 - 20;
  var secondEyeXPosition = canvas_width/2 + 20;
  var firstEyeYPosition = circleCenterY - 40;
  var secondEyeYPosition = circleCenterY - 35;

  context.beginPath();
  context.lineWidth = 2;
  context.moveTo(firstEyeXPosition, firstEyeYPosition - 21);
  context.bezierCurveTo(firstEyeXPosition + (0.5522847498307936 * 12.5), firstEyeYPosition - 21,  firstEyeXPosition + 12.5, firstEyeYPosition - (0.5522847498307936 * 21), firstEyeXPosition + 12.5, firstEyeYPosition);
  context.bezierCurveTo(firstEyeXPosition + 12.5, firstEyeYPosition + (0.5522847498307936 * 21), firstEyeXPosition + (0.5522847498307936 * 12.5), firstEyeYPosition + 21, firstEyeXPosition, firstEyeYPosition + 21);
  context.bezierCurveTo(firstEyeXPosition - (0.5522847498307936 * 12.5), firstEyeYPosition + 21, firstEyeXPosition - 12.5, firstEyeYPosition + (0.5522847498307936 * 21), firstEyeXPosition - 12.5, firstEyeYPosition);
  context.bezierCurveTo(firstEyeXPosition - 12.5, firstEyeYPosition - (0.5522847498307936 * 21), firstEyeXPosition - (0.5522847498307936 * 12.5), firstEyeYPosition - 21, firstEyeXPosition, firstEyeYPosition - 21);
  context.stroke();
  context.fillStyle = 'white';
  if(eyes_closed) {
    context.fillStyle = circleColour;
    if(blob) {
      context.fillStyle = blob.colour;
    }
  }
  context.fill();
  context.closePath();
  context.beginPath();
  context.moveTo(secondEyeXPosition, secondEyeYPosition - 24.5);
  context.bezierCurveTo(secondEyeXPosition + (0.5522847498307936 * 8.5), secondEyeYPosition - 24.5,  secondEyeXPosition + 8.5, secondEyeYPosition - (0.5522847498307936 * 24.5), secondEyeXPosition + 8.5, secondEyeYPosition);
  context.bezierCurveTo(secondEyeXPosition + 8.5, secondEyeYPosition + (0.5522847498307936 * 24.5), secondEyeXPosition + (0.5522847498307936 * 8.5), secondEyeYPosition + 24.5, secondEyeXPosition, secondEyeYPosition + 24.5);
  context.bezierCurveTo(secondEyeXPosition - (0.5522847498307936 * 8.5), secondEyeYPosition + 24.5, secondEyeXPosition - 8.5, secondEyeYPosition + (0.5522847498307936 * 24.5), secondEyeXPosition - 8.5, secondEyeYPosition);
  context.bezierCurveTo(secondEyeXPosition - 8.5, secondEyeYPosition - (0.5522847498307936 * 24.5), secondEyeXPosition - (0.5522847498307936 * 8.5), secondEyeYPosition - 24.5, secondEyeXPosition, secondEyeYPosition - 24.5);
  context.stroke();
  context.closePath();
  context.fill();

  if(!eyes_closed){
    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(circleCenterX - 20,circleCenterY - 40,5,5);
    context.stroke();

    context.beginPath();
    context.fillStyle = 'black';
    context.fillRect(circleCenterX + 15,circleCenterY - 30,5,5);
    context.stroke();
  }

}

// draw other stuff

var drawStrawberry = function() {
  var image = new Image();
  image.src = "http://img3.wikia.nocookie.net/__cb20120409185349/mlp/images/6/62/HappyStudio_Strawberry.png";
  context.drawImage(image, globalMouseCoords[0] - 10, globalMouseCoords[1] - 20, 50, 50);

}

var drawHand = function() {
  var image = new Image();
  image.src = "http://pngimg.com/upload/hands_PNG879.png";
  context.drawImage(image, globalMouseCoords[0] - 10, globalMouseCoords[1] - 20, 50, 50);

}

