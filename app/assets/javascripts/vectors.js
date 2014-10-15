scale = function(vector, scale)  {
  return [vector[0] * scale, vector[1] * scale]
}
magnitude = function(vector) {
  return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2))
}
subtract = function(v1, v2) {
  return [v1[0] - v2[0], v1[1] - v2[1]]
}
add = function(v1, v2) {
  return [v1[0] + v2[0], v1[1] + v2[1]]
}
normalize = function(vector) {
  return scale(vector, 1/magnitude(vector))
}

isCircleFedOrPet = function() {
  var vector = subtract([circleCenterX, circleCenterY], globalMouseCoords);
  var distance = magnitude(vector);
  if(distance <= 100) {
    return true;

  }
}
