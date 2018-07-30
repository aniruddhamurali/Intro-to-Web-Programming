var num1 = ""; var num2 = "";
var operator;
var check = false; // when the equal button is pressed, switch from num1 to num2: false = num1, true = num2
var savedComputations = [];

// if the mouse is clicked over a numButton
$('.numButton').mousedown(function() {
  $(this).css({
    'background-color': 'black',
    'color': 'white'
  });

  // if there is no value in num1, assign a value
  if (!check && num1 === "") {
    num1 += $(this).text();
    $('.display').text(num1);
    console.log(num1);
  }
  // else, assign a value to num2
  else {
    num2 += $(this).text();
    $('.display').text(num2);
    console.log(num2);
  }

});


$('.number').mousedown(function() {
  $(this).css({
    'background-color': 'black',
    'color': 'white'
  });

  if ($(this).text() === "π") {
    if (!check) num1 = Math.PI;
    else num2 = Math.PI;
  }
  $('.display').text($(this).text());
  console.log($(this).text());
});

$('.number').mouseup(function() {
  $(this).css({
    'background-color': 'white',
    'color': 'black'
  });
});



// styling for mouse events
$('.numButton').mouseup(function() {
  $(this).css({
    'background-color': 'orange',
    'color': 'black'
  });
});

$('.mainOperator').mousedown(function() {
  $(this).css({
    'background-color': 'black',
    'color': 'white'
  });
});

$('.operator').mousedown(function() {
  $(this).css({
    'background-color': 'black',
    'color': 'white'
  });
});

$('.equal').mousedown(function() {
  $(this).css({
    'background-color': 'black',
    'color': 'white'
  });
});

$('.mainOperator').mouseup(function() {
  $(this).css({
    'background-color': 'red',
    'color': 'black'
  });
});

$('.operator').mouseup(function() {
  $(this).css({
    'background-color': 'lightgray',
    'color': 'black'
  });
});

$('.equal').mouseup(function() {
  $(this).css({
    'background-color': 'yellow',
    'color': 'black'
  });
});

$('.reset').mouseup(function() {
  $(this).css({
    'background-color': 'lightblue',
    'color': 'black'
  });
});



// if an operator button is pressed
$('.mainOperator').mousedown(function() {
  check = !check;
  operator = $(this).text();
  console.log(operator);
});

$('.operator').mousedown(function() {
  check = !check;
  operator = $(this).text();
  console.log(operator);
});

// signal to compute the expression
$('.equal').mousedown(function() {
  if (error() === true) $('.display').text("Error");
  //console.log(compute());
  $('.display').text(compute());
  saveComputations();
  num1 = compute();
  num2 = "";
});



$('.reset').mousedown(function() {
  $(this).css({
    'background-color': 'black',
    'color': 'white'
  });

  num1 = "";
  num2 = "";
  $('.display').text(0);
});



// compute the expression
function compute() {
  if (operator === "+") return parseFloat(num1) + parseFloat(num2);
  else if (operator === "-") return parseFloat(num1) - parseFloat(num2);
  else if (operator === "x") return parseFloat(num1) * parseFloat(num2);
  else if (operator === "÷") return parseFloat(num1) / parseFloat(num2);
  else if (operator === "^") return Math.pow(parseFloat(num1), parseFloat(num2));
  else if (operator === "!") return factorial(num1);
}


// calcuates n!
function factorial(n) {
  if (n === 0 || n === 1) return 1;

  var factorial = 1;
  for (var i = n; i > 1; i -= 1) {
    factorial *= i;
  }
  return factorial;
}


function error() {
  if (compute() === null) return true;
}

function saveComputations() {
  savedComputations.push(compute());
  localStorage.saved_computations = JSON.stringify(savedComputations);
}
