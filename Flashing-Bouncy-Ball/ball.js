var width = 600;
var height = 480;

function Ball(xi, yi, vxi, vyi, ri) {
	var self = this;

  self.x = xi; self.y = yi; // x,y: pixels
  self.vx = vxi; self.vy = vyi; // vx,vy: pixels/second
  self.r = ri; // radius

  self.drawBall = function(brush) {
  	brush.beginPath();
    brush.arc(self.x, self.y, self.r, 0, Math.PI*2);
    brush.fill();
  }

  self.moveBall = function(delta) { // delta: seconds
  	self.x += self.vx*delta;
    self.y += self.vy*delta;

    if (self.x + self.r > width) self.vx *= -1;
    if (self.x - self.r < 0) self.vx *= -1;

    if (self.y + self.r > height) self.vy *= -1;
    if (self.y - self.r < 0) self.vy *= -1;
  }

  self.declareRadius = function() {
  	self.r = Math.random()*40;
  }
}


var b = new Ball(50, 50, 5, 5, 20);

function draw() {
	var my_canvas = document.getElementById('my_canvas');
	var brush = my_canvas.getContext('2d');

	brush.clearRect(0, 0, my_canvas.width, my_canvas.height);
  brush.fillStyle = "lightblue";
  b.drawBall(brush);
  b.declareRadius();
	
  move();

  window.requestAnimationFrame(draw);
}

function move() {
	b.moveBall(1.0);
}

draw();
