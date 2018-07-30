(function () {
  var canvas;
  canvas = document.getElementById("screen");
  var screen = canvas.getContext('2d');

  var Game = function (canvasId) {
    canvas = document.getElementById(canvasId);
    var screen = canvas.getContext('2d');
    var gameSize = {
      x: canvas.width,
      y: canvas.height
    };

    this.bodies = createInvaders(this).concat(new Player(this, gameSize));

    var self = this;
    var tick = function () {
      self.update(gameSize);
      self.draw(screen, gameSize);
      requestAnimationFrame(tick);
    };

    tick();
  };

  Game.prototype = {
    update: function (gameSize) {
      var bodies = this.bodies;
      var notCollidingWithAnything = function (b1) {
        return bodies.filter(function (b2) {
          if ((b1.size.x === b1.size.y || b2.size.x === b2.size.y) && colliding(b1,b2)) {
            //console.log("working");
            screen.font = "60px sans-serif";
            screen.textAlign = "center";
            screen.fillStyle = "rgb(255,255,255)";
            screen.fillText("GAME OVER", canvas.width/2, canvas.height/2);
          }
          //console.log("notworking");
          return colliding(b1, b2);
        }).length === 0;

      };
      var isOnScreen = function(body) {
        return !(Math.abs(body.center.y) > gameSize.y || Math.abs(body.center.x) > gameSize.x);
      };
      this.bodies = this.bodies.filter(notCollidingWithAnything).filter(isOnScreen);

      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].update();
      }
    },
    draw: function (screen, gameSize) {
      screen.clearRect(0, 0, gameSize.x, gameSize.y);
      for (var i = 0; i < this.bodies.length; i++) {
        drawRect(screen, this.bodies[i]);
      }
    },
    addBody: function (body) {
      this.bodies.push(body);
    },
    invadersBelow: function (invader) {
      return this.bodies.filter(function (b) {
        return b instanceof Invader && b.center.y > invader.center.y && b.center.x - invader.center.x < invader.size.x;
      }).length > 0;
    }
  };

  var Player = function (game, gameSize) {
    this.game = game;
    this.size = {
      x: 20,
      y: 20
    };
    this.center = {
      x: gameSize.x / 2,
      y: gameSize.y - this.size.x
    };
    this.keyboarder = new Keyboarder();
    this.canFire = true;

  };

  Player.prototype = {
    update: function () {
      if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
        this.center.x -= 5;
      } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {

        this.center.x += 5;
      }

      if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE) && this.canFire) {
        this.canFire = false;
        var bullet = new Bullet({
          x: this.center.x,
          y: this.center.y - this.size.x / 2
        }, {
          x: 0,
          y: -12
        });

        this.game.addBody(bullet);
        var self = this;
        setTimeout(function () {
          self.canFire = true;
        }, 450);
      }
    }
  };

  var Bullet = function (center, velocity) {
    this.size = {
      x: 3,
      y: 3
    };
    this.center = center;
    this.velocity = velocity;
  };

  Bullet.prototype = {
    update: function () {
      this.center.x += this.velocity.x;
      this.center.y += this.velocity.y;
    }
  };

  var Invader = function (game, center) {
    this.size = {
      x: 25,
      y: 15
    };
    this.center = center;
    this.game = game;
    this.patrolX = 0;
    this.speedX = 0.75;
  };

  Invader.prototype = {
    update: function () {
      if (this.patrolX < 0 || this.patrolX > 40) {
        this.speedX = -this.speedX;
      }

      this.center.x += this.speedX;
      this.patrolX += this.speedX;

      if (Math.random() > 0.985 && !this.game.invadersBelow(this)) {
        var bullet = new Bullet({
          x: this.center.x,
          y: this.center.y + this.size.x / 2
        }, {
          x: Math.random() - 0.2,
          y: 4
        });

        this.game.addBody(bullet);
      }
    }
  };

  var createInvaders = function (game) {
    var invaders = [];
    for (var i = 0; i < 24; i++) {
      var spacing = canvas.width / 8;
      var x = spacing + (i % 8) * spacing;
      var y = 30 + (i % 3) * 30;
      invaders.push(new Invader(game, {
        x: x,
        y: y
      }));
    }
    return invaders;
  };

  var drawRect = function (screen, body) {
    screen.fillStyle = "rgb(20, 254, 65)";
    screen.fillRect(body.center.x - body.size.x / 2,
      body.center.y - body.size.y / 2,
      body.size.x, body.size.y);
    };

    var Keyboarder = function () {
      var keyState = {};

      window.onkeydown = function (e) {
        keyState[e.keyCode] = true;
      };

      window.onkeyup = function (e) {
        keyState[e.keyCode] = false;
      };

      this.isDown = function (keyCode) {
        return keyState[keyCode] === true;
      };

      this.KEYS = {
        LEFT: 37,
        RIGHT: 39,
        SPACE: 32
      };
    };

    var restart_btn = document.getElementById('restart_btn');
    restart_btn.addEventListener('click',function() {


      // SET SCREEN BACK TO START
    });




    var colliding = function (b1, b2) {
      return !(b1 === b2 || b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x / 2 ||
        b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y / 2 || b1.center.x -
        b1.size.x / 2 > b2.center.x + b2.size.x / 2 || b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y / 2);
      };

      window.onload = function () {
        new Game("screen");

      };
    })();
