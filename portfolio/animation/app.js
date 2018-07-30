var my_canvas;
//var cloud = document.getElementById("cloud.png");
var cloud = new Image(); cloud.src = "cloud.png";
var cloud2 = new Image(); cloud2.src = "cloud.png";
var cloud3 = new Image(); cloud3.src = "cloud.png";
var x1 = 75; var v1 = 1; var y1 = 35;
var x2 = 250; var v2 = 2; var y2 = 125;
var x3 = 462; var v3 = 3; var y3 = 210;

function draw(){
  my_canvas = document.getElementById('my_canvas');
  var brush = my_canvas.getContext('2d');

  brush.clearRect(0, 0, my_canvas.width, my_canvas.height);
  brush.drawImage(cloud,x1,y1,200,150);
  brush.drawImage(cloud2,x2,y2,200,150);
  brush.drawImage(cloud3,x3,y3,200,150);
  brush.beginPath();
  brush.moveTo(0,540);
  brush.lineTo(40,450);
  brush.lineTo(50,480);
  brush.lineTo(100,400);
  brush.lineTo(150,500);
  brush.lineTo(180,440);
  brush.lineTo(230,480);
  brush.lineTo(270,540);
  brush.lineTo(350,370);
  brush.lineTo(390,480);
  brush.lineTo(410,500);
  brush.lineTo(450,480);
  brush.lineTo(500,380);
  brush.lineTo(590,540);
  brush.lineTo(630,470);
  brush.lineTo(700,400);
  brush.lineTo(780,450);
  brush.lineTo(830,500);
  brush.lineTo(900,460);
  brush.lineTo(950,470);
  brush.lineTo(1000,540);
  brush.lineTo(0,540);
  brush.fillStyle = "black";
  brush.fill();
  brush.closePath();
  brush.beginPath();
  brush.rect(0,540,1000,600);
  brush.fillStyle = "darkgreen";
  brush.fill();
  move();
  window.requestAnimationFrame(draw);
}

draw();
function move(){
  x1=x1+v1;x2=x2+v2;x3=x3+v3;
  if(x1>my_canvas.width){
    x1 = -210;
    y1 = Math.random()*200;
    v1 = Math.random()*5;
  }
  if(x2>my_canvas.width){
    x2 = -210;
    y2 = Math.random()*200;
    v2 = Math.random()*5;
  }
  if(x3>my_canvas.width){
    x3 = -210;
    y3 = Math.random()*200;
    v3 = Math.random()*5;
  }
}
