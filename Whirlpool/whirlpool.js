var radius = 0;
var theta = 90;

var r = 0;
var g = 0;
var b = 50;

function draw() {
	var canvas = document.getElementById('canvas');
  var brush = canvas.getContext('2d');

	// change the center of the circle's location (polar coordinates)
  var x = radius * Math.cos(theta);
  var y = radius * Math.sin(theta);

	// draw a circle
  brush.fillStyle = "rgb(" + r + "," + g + "," + b + ")"; // the values of r, g, and b change
  brush.beginPath();
  brush.arc(x+canvas.width/2, y+canvas.height/2, 25, 0, 2*Math.PI);
  brush.fill();

	// used to create the color gradient
  if (b < 150) {
  	r += 0.125;
  	g += 0.125;
   }
  b += 0.25;

  if (b > 180) {
  	g += 0.0625;
  }

	// increase radius and theta in order to create spiral
  radius += 0.15;
  theta += 0.01;
	console.log(radius);

  if (radius <= 265) window.requestAnimationFrame(draw);
}

draw();
