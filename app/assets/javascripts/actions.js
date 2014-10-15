
var onMouseDown = function(e) {
  if(e.button != 0){
    return;
  }
  checkAllSquares();

}

var onMouseMove = function(e) {
  globalMouseCoords = [e.pageX, e.pageY];
}

var submitBlob = function(e) {
  if(e.button != 0){
    return;
  }

  name = document.getElementById("name").value
  $.post("/blobs", {colour: circleColour, name: name}, goToViewPage);

}

var clickedFood = function(e) {
  if(e.button != 0){
    return;
  } else {
    strawberry_status = true;
  }
}

var clickedHand = function(e) {
  if(e.button != 0){
    return;
  } else {
    hand_status = true;
  }

}

var unClickedAction = function() {
  if(strawberry_status){
    strawberry_status = false;
    if(isCircleFedOrPet()) {
      var ateTime = new Date();
      $.put("/blobs/" + blob.id, {last_ate: ateTime}, changeFedStatus);
    }
  }

  if(hand_status){
    hand_status = false;
    if(isCircleFedOrPet()) {
      var petTime = new Date();
      $.put("/blobs/" + blob.id, {last_pet: petTime}, changePetStatus);
    }
  }

}

var changeFedStatus = function() {
  var time = new Date().getTime() / 1000;
  blob.last_ate = time;
}

var changePetStatus = function() {
  var time = new Date().getTime() / 1000;
  blob.last_pet = time;
}


$.put = function(url, data, callback, type){
 
  if ( $.isFunction(data) ){
    type = type || callback,
    callback = data,
    data = {}
  }
 
  return $.ajax({
    url: url,
    type: 'PUT',
    success: callback,
    data: data,
    contentType: type
  });
}

var goToViewPage = function(createdBlob) {
  window.location.replace("/blobs/" + createdBlob.id);
}

var blinkInterval;

var onLoadFunction = function() {
  blinkInterval = setInterval(blink, 2000);
}

var blink = function() {
  eyes_closed = true;
  setTimeout(function(){eyes_closed = false}, 200);
}

var checkAllSquares = function(){
  length = colouredSquares.length;
  for(var i = 0; i < length; i++){
    checkSquare(colouredSquares[i]);
  }
}

var checkSquare = function(square) {
  var pageX = globalMouseCoords[0];
  var pageY = globalMouseCoords[1];
  if(((pageX > square.X) && (pageX < square.X + square.widtth)) &&
    ((pageY > square.Y) && (pageY < square.Y + square.heightt))) {
    circleColour = square.colour;
  }

}
