
function Missile(x,y){
  var self = this;
  var fire;
  var c;
  var pathSlope;
  var pathInt;
  var mouseX;
  var mouseY;
  var yv;
  var xv;
  self.draw = function(brush){
    if(self.fire===true){
    brush.rect(self.x,self.y,4,4);
    brush.beginPath();
    brush.moveTo(300,500);
    brush.lineTo(self.x,self.y);
    brush.lineWidth = 2;
    brush.strokeStyle = "red";
    brush.stroke();
    brush.closePath();
  }
  }
  self.Move = function(){
    self.x = self.x + self.xv;
    self.y = self.y - self.yv;
  }
  self.collisions = function(brush){
    if(self.x>=600 || self.x<=0 || self.y<=0){self.fire=false;}//collision with the end point
    if(self.x+8>enemyX-8 && self.x-8<enemyX+8 && self.y+8>enemyY-8 && self.y-8<enemyY+8){
      saveEnemyY=enemyY;
      saveEnemyX=enemyX;
      explosion_=true;
      explosionTimer=0;
      enemyY=-1;
      self.fire = false;
    }
  }

}
function explosion(brush){
  brush.beginPath();
  brush.arc(saveEnemyX,saveEnemyY,16, 0, 2*Math.PI, false);
  brush.fillStyle = "red";
  brush.fill();
  brush.closePath();
  explosionTimer++;
  if(explosionTimer===60){
    explosion_=false;

  }
}
function city(x,brush){
  brush.beginPath();
  brush.rect(x,540,40,20);
  brush.fillStyle = "grey";
  brush.fill();
  brush.moveTo(x,540);
  brush.lineTo(x+20,520);
  brush.lineTo(x+40,540);
  brush.fill();
  brush.closePath();
}
function launcher(brush){
  brush.beginPath();
  brush.rect(270,520,60,40);
  brush.fillStyle = "grey";
  brush.fill();
  brush.closePath();
  brush.beginPath();
  brush.rect(295,500,10,20); //300,500 is the center, where missiles start from
  brush.fillStyle = "red";
  brush.fill();
  brush.closePath();
}
function enemy(brush){
  console.log("hello")
  var origin;
  brush.beginPath();
  if(enemyY===-1){
    origin = Math.floor(Math.random()*6);
    if(origin===1){enemyX=50;enemyY=-1;}if(origin===2){enemyX=120;enemyY=-1;}
    if(origin===3){enemyX=190;enemyY=-1;}if(origin===4){enemyX=410;enemyY=-1;}
    if(origin===5){enemyX=480;enemyY=-1;}if(origin===6){enemyX=550;enemyY=-1;}
  }
  brush.moveTo(enemyX,-1);
  brush.lineTo(enemyX,enemyY);
  brush.lineWidth = 2;
  brush.strokeStyle = "yellow";
  brush.stroke();
  brush.closePath();
  enemyY = enemyY+2;
  if(enemyY>510){
    enemyY=-1;
    lives= lives-1;
    if(lives<=0){
      end_=true;
    }
  }
}
function slope(startX,startY,endX,endY,m){
  var s = (endY-startY)/100;
  var b = (endX-startX)/100;
  if(s<0 && b<0){s=s*-1;b=b*-1;}
  else if(s<0 && b>0){s=s*-1;b=b*-1;}
  if(m===1){
    m1.yv = s;
    m1.xv = b;
  }
  else{
    m2.yv = s;
    m2.xv = b;
  }
}
function end(brush){
  brush.beginPath();
  brush.rect(0,0,600,600);
  brush.fillStyle = "yellow";
  brush.fill();
  brush.closePath();

}
window.addEventListener('mousedown', function(event) {
  if(lives === 0){
    console.log("reset");
    lives = 6;
    enemyY=-1;
    m1.fire = false;
    m2.fire = false;
    enemyFired=false;
    end_=false;
  }
  if(event.clientY<501){
  if(m1.fire === false){

    m1.fire = true;
    m1.x=300;
    m1.y=500;
    m1.mouseX = event.clientX;
    m1.mouseY = event.clientY;
    /* m1.x = event.clientX;
     m1.y = event.clientY;*/
    slope(300,-500,event.clientX,event.clientY*-1,1);
  }
  else if(m2.fire === false){
    m2.fire = true;
    m2.x=300;
    m2.y=500;
    /* m2.mouseX = event.clientX;
     m2.mouseY = event.clientY;*/
    slope(300,-500,event.clientX,event.clientY*-1,2);
  }
}
console.log("hi")
});

var cityPos = [30,100,170,390,460,530];
var my_canvas;
var m1 = new Missile(-10,-10);
var m2 = new Missile(-10,-10);
var enemyFired;
var enemyY=0;
var enemyX=0;
var lives = 6;
var saveEnemyY;
var saveEnemyX;
var explosion_;
var explosionTimer;
var end_;
function draw(){
  my_canvas = document.getElementById('my_canvas');
  var brush = my_canvas.getContext('2d');

  brush.clearRect(0,0,600,600);
  brush.closePath();
  brush.rect(0,550,600,50);
  brush.fillStyle = "lightgrey";
  brush.fill();
  brush.closePath();
  for(var i=0;i<6;i++){
    var a = cityPos[i];
    city(a,brush);
  }
  m1.Move();
  m2.Move();
  m1.draw(brush);
  m2.draw(brush);
  m1.collisions(brush);
  m2.collisions(brush);
  brush.font = "30px sans-serif";
  brush.fillStyle = "dark-gray"
  brush.fillText(lives,5,595);
  brush.fillText("lives",25,595);
  ///console.log(m1.c, m2.c);
  launcher(brush);
  if(enemyFired===false){
    enemy(brush);
  }
  if(explosion_===true){
    explosion(brush);
  }
  if(lives<=0){
    end(brush);
    brush.beginPath();
    brush.font = "70px sans-serif";
    brush.fillStyle = "dark-gray"
    brush.fillText("Y0U L0ST",100,100);
    brush.fillText("CLick to try again",100,180);
    brush.fill();
  }
  window.requestAnimationFrame(draw);
  //console.log(m1.x,m1.y,m1.pathSlope); //soemthing wrong with slope, it is equal to the mouseY y variable
}
draw();
m1.fire = false;
m2.fire = false;
enemyFired=false
