var img = new Image(100, 200);
var chicken_x = 0;
var chicken_y = myCanvas.height/4;
var chicken_vx = 1;  // chicken's x velocity
var chicken_vy = 2;  // chicken's y velocity

var pathX = []; 		 // stores the x values of the yellow path
var pathY = []; 		 // stores the y values of the yellow path
var pathLength = 0;  // the number of circles in the path
//img.src = "chicken.png";
img.src = "flappy.gif";

function draw() {
	var canvas = document.getElementById('myCanvas');
	var brush = myCanvas.getContext('2d');

	brush.clearRect(0, 0, myCanvas.width, myCanvas.height);

	// as the chicken moves, add on to the yellow path
	pathX.push(chicken_x + 147.6/2);
	pathY.push(chicken_y + 110.8/2);
	pathLength += 1;

	for (var i = 0; i < pathLength; i++) {
		// the yellow path created is really just a bunch of circles connected to each other
		brush.fillStyle = "yellow";
		brush.beginPath();
	  brush.arc(pathX[i], pathY[i], 25, 0, 2*Math.PI);
	  brush.fill();
	}

	brush.drawImage(img, chicken_x, chicken_y, 147.6, 110.8); //100,100

	move();

	window.requestAnimationFrame(draw);
}
draw();



function move() {

	chicken_x += chicken_vx; // add on to the chicken's x coordinate when going right, else subtract it when going left
	chicken_y += chicken_vy; // add on to the chicken's y coordinate when going down, else subtract it when going down

	// if the chicken is at the boundaries of 1/4 or 3/4 the canvas height, make the chicken go the opposite direction
	if (chicken_y >= myCanvas.height*3/4 - 110.8 || chicken_y <= myCanvas.height/4) {
		chicken_vy *= -1;
	}

	// if the chicken is at the boundaries of x=0 or the canvas width, make the chicken go the opposite direction
	if (chicken_x >= myCanvas.width - 147.6 || chicken_x <= 0) {
		chicken_vx *= -1;

		// draw a new path
		pathX = [];
		pathY = [];
	}
}
