

/* Classes */
function Ball(x, y, vx, vy) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.r = 10;

  this.draw = function(brush) {
    brush.beginPath();
    brush.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
    brush.fill();
    brush.closePath();
  }

  this.move = function(delta_t) {
    this.x = this.x + this.vx*delta_t;
    this.y = this.y + this.vy*delta_t;
  }

  this.checkCollisions = function() {
    if (this.x < 0 + this.r || this.x > canvas.width - this.r) { // left edge or right edge
      restart();
    }

    if (this.y < 0 + this.r) { // top edge
      this.y = this.r; // rectify collision
      this.vy = -this.vy; // bounce
    }

    if (this.y > canvas.height - this.r) { // bottom edge
      this.y = canvas.height - this.r; // rectify collision
      this.vy = -this.vy; // bounce
    }

    this.collidePaddle(p1);
    this.collidePaddle(p2);
  }

  this.collidePaddle = function(p) {
    var projx = collide(this.x - this.r, this.x + this.r, p.x - p.w/2, p.x + p.w/2);
    if (projx == 0) return;

    var projy = collide(this.y - this.r, this.y + this.r, p.y - p.h/2, p.y + p.h/2);
    if (projy == 0) return;

    if (Math.abs(projx) < Math.abs(projy)) { // hit paddle
      this.x = this.x + projx; // rectify collision
      this.vx = -this.vx;
    } else {
      this.y = this.y + projy; // rectify collision
      this.vy = -this.vy;
    }
  }
}


function Paddle(x, y, s) {
  this.x = x;
  this.y = y;
  this.s = s;
  this.w = 10;
  this.h = 100;
  this.up = false;
  this.down = false;

  this.draw = function(brush) {
    brush.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
  }

  this.move = function(delta_t) {
    if (this.up) {
      this.y = this.y - this.s*delta_t;

      if (this.y < this.h/2) {
        this.y = this.h/2;
      }
    } else if (this.down) {
      this.y = this.y + this.s*delta_t;

      if (this.y > canvas.height - this.h/2) {
        this.y = canvas.height - this.h/2;
      }
    }
  }
}



/* Helper Functions */

// Find how much the line segment r overlaps the line segment s in 1 dimension
function collide(r1, r2, s1, s2) {
  if (r1 > s1 && r1 < s2) {
    return(s2 - r1);
  } else if (r2 > s1 && r2 < s2) {
    return(s1 - r2);
  }
  return(0);
}


// Find a random number in a set of ranges
function rand(ranges) { // [{min: -10, max: -5}, {min: 5, max: 10}]
  var new_range = 0; // 0 -> new_range
  for (var i=0; i < ranges.length; i++) {
    var range = ranges[i].max - ranges[i].min;
    new_range = new_range + range;
  }

  var random_in_new_range = Math.random()*new_range;

  var range_in_new_range_low_end = 0;
  for (var i=0; i < ranges.length; i++) {
    var range = ranges[i].max - ranges[i].min;
    var range_in_new_range_high_end = range_in_new_range_low_end + range;

    if (random_in_new_range < range_in_new_range_high_end && random_in_new_range > range_in_new_range_low_end) {
      return((random_in_new_range - range_in_new_range_low_end) + ranges[i].min);
    }

    range_in_new_range_low_end = range_in_new_range_high_end;
  }
}



/* Global Variables */
var canvas = document.getElementsByTagName('canvas')[0];
var b, p1, p2;
var last_t = new Date().getTime();
var paused = false;

function restart() {
  b = new Ball(canvas.width/2, canvas.height/2, rand([{min: -500, max: -400}, {min: 400, max: 500}]), rand([{min: -500, max: -200}, {min: 200, max: 500}]));
  p1 = new Paddle(0 + 15, canvas.height/2, 500);
  p2 = new Paddle(canvas.width - 15, canvas.height/2, 500);

  paused = true;
}
restart();



/* Events */
window.addEventListener('keypress', function(event) {
  console.log(event.which);
  if (event.which === 32) {
    paused = !paused;
  }
});

window.addEventListener('keydown', function(event) {
  if (event.which === 38) {
    p1.up = true;
    p2.up = true;
  } else if (event.which === 40) {
    p1.down = true;
    p2.down = true;
  }
});

window.addEventListener('keyup', function(event) {
  if (event.which === 38) {
    p1.up = false;
    p2.up = false;
  } else if (event.which === 40) {
    p1.down = false;
    p2.down = false;
  }
});



/* Main Loop */
function draw() {
  var brush = canvas.getContext('2d');

  brush.clearRect(0, 0, canvas.width, canvas.height);

  // draw here
  b.draw(brush);
  p1.draw(brush);
  p2.draw(brush);

  if (paused) {
    brush.font = "60px sans-serif";
    brush.textAlign = "center";
    brush.fillText("PAUSED", canvas.width/2, 100);
  }

  move();

  window.requestAnimationFrame(draw);
}


function move() {
  var current_t = new Date().getTime();
  var delta_t = (current_t - last_t) / 1000;
  last_t = current_t;

  if (!paused) {
    b.move(delta_t);
    p1.move(delta_t);
    p2.move(delta_t);

    b.checkCollisions();
  }
}

draw();
