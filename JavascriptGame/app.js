var my_canvas = document.getElementById('my_canvas');

var brush = my_canvas.getContext('2d');

brush.fillRect(10,10,50,50);

brush.beginPath();
brush.arc(30,30,10,0,2*Math.PI);
