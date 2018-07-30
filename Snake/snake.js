// Snake class
function Snake(x, y) {
  var self = this;
  self.r = 0; self.g = 0; self.b = 255;

  self.snakeX = x; self.snakeY = y;
  self.dx = 0; self.dy = 0;
  self.snakeSize = 1;

  self.up = false; self.down = false;
  self.Left = false; self.Right = false;

  self.snakeXList = [];
  self.snakeYList = [];


  self.draw = function(brush) {
    self.b = 255;

    for (var i = 0; i < self.snakeSize; i++) {
      brush.fillStyle = "rgb(0,0," + self.b + ")";
      self.b -= 1;

      var tempX = self.snakeXList[i];
      var tempY = self.snakeYList[i];
      brush.fillRect(tempX, tempY, 20, 20);
    }

    for (var j = self.snakeSize; j > 0; j--) {
      self.snakeXList[j] = self.snakeXList[j-1];
      self.snakeYList[j] = self.snakeYList[j-1];
    }

  };


  self.move = function() {
    self.snakeX += self.dx;
    self.snakeY += self.dy;

    self.snakeXList[0] = self.snakeX;
    self.snakeYList[0] = self.snakeY;
    console.log(self.snakeXList);
    console.log(self.snakeYList);

    if (self.snakeX < 0 || self.snakeX > canvas.width || self.snakeY < 0 || self.snakeY > canvas.height) gameOver = true;

    if (self.up) {
      self.dy = -5;
      self.dx = 0;
    }

    else if (self.down) {
      self.dy = 5;
      self.dx = 0;
    }

    else if (self.Left) {
      self.dx = -5;
      self.dy = 0;
    }

    else if (self.Right) {
      self.dx = 5;
      self.dy = 0;
    }

  };


  self.checkOwnCollision = function() {
    var bool = false;
    if (self.snakeSize > 1) {
      for (var i = 1; i < self.snakeSize; i++) {
        if (Math.abs(self.snakeX - self.snakeXList[i]) < 5 && Math.abs(self.snakeY - self.snakeYList[i]) < 5) {
          bool = true;
          break;
        }
        //else bool = false;
      }
    }

    return bool;
  };

}


// Food class
function Food(x, y) {
  var self = this;

  self.foodX = x; self.foodY = y;
  self.check = false;

  self.draw = function(brush) {
    brush.fillStyle = "rgb(0,255,0)";
    brush.fillRect(self.foodX, self.foodY, 20, 20);
  };

  self.ateFood = function(snake) {
    if (Math.abs(distance(self.foodX, self.foodY, snake.snakeX, snake.snakeY)) <= 15) {
      self.check = true;
      snake.snakeSize += 3;
      score += 10000;
    }
  };

  self.snakeFoodCollision = function(snake) {
    while (self.check) {
      var tempX = Math.random();
      var tempY = Math.random();

      self.foodX = tempX*560;
      self.foodY = tempY*560;

      for (var i = 0; i < snake.snakeSize; i++){
         if (tempX === snake.snakeXList[i] && tempY === snake.snakeYList[i]) {
           self.check = true;
         }
         else self.check = false;
      }

    }
  };

}


// Distance function
var distance = function(x1, y1, x2, y2) {
  var xDist = Math.abs(x2 - x1);
  var yDist = Math.abs(y2 - y1);
  var dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

  return dist;
};


// Key events
window.addEventListener('keydown', function(event) {
  //console.log(event.which);
  if (event.which === 38) {
    // up arrow
    gameSnake.up = true;
    gameSnake.down = false;
    gameSnake.Left = false;
    gameSnake.Right = false;
  }
  else if (event.which === 40) {
    // down arrow
    gameSnake.up = false;
    gameSnake.down = true;
    gameSnake.Left = false;
    gameSnake.Right = false;
  }
  else if (event.which === 37) {
    // left arrow
    gameSnake.up = false;
    gameSnake.down = false;
    gameSnake.Left = true;
    gameSnake.Right = false;
  }
  else if (event.which === 39) {
    // right arrow
    gameSnake.up = false;
    gameSnake.down = false;
    gameSnake.Left = false;
    gameSnake.Right = true;
  }
  else if (event.which === 32) {
    // spacebar
    paused = !paused;
  }
});


// Global Variables //
var canvas = document.getElementsByTagName('canvas')[0];
var brush = canvas.getContext('2d');
var paused = false;
var gameOver = false;
var score = 0;

// Instances //
var gameSnake = new Snake(canvas.width/2, canvas.height/2);
var food = new Food(canvas.width/4,canvas.height/4);


//  Main(draw) function //
function draw() {
  brush.fillStyle = "rgb(0,0,0)";
  brush.clearRect(0, 0, canvas.width, canvas.height); // reseting background

  if (gameOver === false) {
    food.draw(brush);
    gameSnake.draw(brush);
    food.snakeFoodCollision(gameSnake);
    food.ateFood(gameSnake);
    //if (gameSnake.checkOwnCollision() === true) gameOver = true;
    //console.log(gameOver);

    brush.font = "20px sans-serif";
    brush.textAlign = "center";
    brush.fillStyle = "rgb(255,255,255)";
    scoreString = String(score);
    brush.fillText("Score: " + scoreString, 550 - 3*scoreString.length, 30);

    if (!paused) {
      brush.fillStyle = "rgb(0,0,0)";
      gameSnake.move();
    }
    else if (paused) {
      brush.font = "60px sans-serif";
      brush.textAlign = "center";
      brush.fillStyle = "rgb(255,255,255)";
      brush.fillText("PAUSED", canvas.width/2, canvas.height/2);
    }
  }
  else if (gameOver === true) {
    brush.font = "60px sans-serif";
    brush.textAlign = "center";
    brush.fillStyle = "rgb(255,255,255)";
    brush.fillText("GAME OVER", canvas.width/2, canvas.height/2);
  }

  window.requestAnimationFrame(draw);
}

draw();




/*
function Food() {
  var self = this;

  self.x = Math.random()*560;
  self.y = Math.random()*560;


  self.display = function(brush) {
    brush.fillStyle = "rgb(0,255,0)";
    brush.fillRect(self.x, self.y, 20, 20);
  };


  self.reset = function() {
    self.x = Math.random()*560;
    self.y = Math.random()*560;
  };

}

function Snake() {
  var self = this;

  self.size = 1;
  self.sidelen = 20;
  self.dir = "right";
  self.xpos = []; self.ypos = [];

  self.xpos.push(Math.random()*560);
  self.ypos.push(Math.random()*560);


  self.display = function(brush) {
    for (var i = 0; i < self.size; i++){
      brush.fillStyle = "rgb(0,0,255)";
      brush.fillRect(self.xpos[i], self.ypos[i], self.sidelen, self.sidelen);
    }
  };


  self.move = function() {
    //console.log(self.xpos);
    //console.log(self.ypos);
    for (var i = self.size - 1; i > 0; i = i -1 ){
      self.xpos[i] -= self.xpos[i-1];
      self.ypos[i] -= self.ypos[i-1];
    }
    if (self.dir == "left") {
      self.xpos[0] -= self.sidelen/4;
    }
    if (self.dir == "right") {
      self.xpos[0] += self.sidelen/4;
    }
    if (self.dir == "up") {
      self.ypos[0] -= self.sidelen/4;
    }

    if (self.dir == "down"){
      self.ypos[0] += self.sidelen/4;
    }



    // check if hit itself and if so cut off the tail
    if (self.checkHit() === true){
      self.size = 1;
      var xTemp = self.xpos[0];
      var yTemp = self.ypos[0];
      self.xpos.clear();
      self.ypos.clear();
      self.xpos.push(xTemp);
      self.ypos.push(yTemp);
    }
  };


  self.addLink = function() {
    console.log(self.xpos[self.size-1]);
    self.xpos.push(self.xpos[self.size-1] + self.sidelen);
    self.ypos.push(self.ypos[self.size-1] + self.sidelen);
    self.size += 1;
  };

  self.checkHit = function() {
    for (var i = 1; i < self.size; i++){
      if (distance(self.xpos[0], self.ypos[0], self.xpos[i], self.ypos[i]) < self.sidelen){
        return true;
      }
    }
    return false;
  };
}



// Distance function
var distance = function(x1, y1, x2, y2) {
  var xDist = Math.abs(x2 - x1);
  var yDist = Math.abs(y2 - y1);
  var dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

  return dist;
};


// Global Variables
var canvas = document.getElementsByTagName('canvas')[0];
var brush = canvas.getContext('2d');

var highScore = 0;

var snake = new Snake();
var food1 = new Food();


// Main function
function draw() {
  brush.fillStyle = "rgb(0,0,0)";
  brush.clearRect(0, 0, canvas.width, canvas.height);

  snake.move();
  snake.display(brush);
  food1.display(brush);


  if (distance(food1.x, food1.y, snake.xpos[0], snake.ypos[0]) < snake.sidelen) {
    food1.reset();
    //console.log(snake.xpos[snake.size-1] + snake.sidelen);
    snake.addLink();
  }

  if (snake.size > highScore){
    highScore = snake.size;
  }

  window.requestAnimationFrame(draw);
}

draw();*/
