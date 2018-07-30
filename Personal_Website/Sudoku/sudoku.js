/* Sudoku
 * @author Aniruddha Murali
 * @submitted 6/13/16
 */


var debug = false; // change to true if you want to run an automated test
var start;         // time when puzzle is started
var end;           // time when the puzzle is completed correctly

/* $('td').each()
 * Styles the sudoku table
 * @parameter none
 * @return none
 *
 */
$('td').each(function(element, index) {

  if (parseInt(this.id) % 3 === 0) {
    $(this).css({
      'border-right':'5px solid black'
    });
  }
  else if (parseInt(this.id) % 3 === 1) {
    if ((parseInt(this.id) > 18 && parseInt(this.id) <= 27) || (parseInt(this.id) > 45 && parseInt(this.id) <= 54)) {
      $(this).css({
        'border-bottom':'5px solid black',
        'border-left':'5px solid black'
      });
    }
    else if ((parseInt(this.id) > 27 && parseInt(this.id) <= 36) || (parseInt(this.id) > 54 && parseInt(this.id) <= 63)) {
      $(this).css({
        'border-top':'5px solid black',
        'border-left':'5px solid black'
      });
    }
    else {
      $(this).css({
        'border-left':'5px solid black'
      });
    }
  }
  if ((parseInt(this.id) > 18 && parseInt(this.id) <= 27) || (parseInt(this.id) > 45 && parseInt(this.id) <= 54)) {
    $(this).css({
      'border-bottom':'5px solid black',
    });
  }
  else if ((parseInt(this.id) > 27 && parseInt(this.id) <= 36) || (parseInt(this.id) > 54 && parseInt(this.id) <= 63)) {
    $(this).css({
      'border-top':'5px solid black',
    });
  }

});



/* $('.checkButton').mousedown()
 * Changes style of checkButton to black background and white text when mouse is down
 * @parameter none
 * @return none
 *
 */
$('.checkButton').mousedown(function() {
  $(this).css({
    'background-color' : 'black',
    'color': 'white'
  });
});

/* $('.checkButton').mouseup()
 * Changes style of checkButton to lightblue background and black text when mouse is up
 * @parameter none
 * @return none
 *
 */
$('.checkButton').mouseup(function() {
  $(this).css({
    'background-color' : 'lightblue',
    'color': 'black'
  });
});



/* $('.reset').mousedown()
 * Changes style of checkButton to black background and white text when mouse is down
 * @parameter none
 * @return none
 *
 */
$('.reset').mousedown(function() {
  $(this).css({
    'background-color' : 'black',
    'color': 'white'
  });
});

/* $('.reset').mouseup()
 * Changes style of checkButton to lightblue background and black text when mouse is up
 * @parameter none
 * @return none
 *
 */
$('.reset').mouseup(function() {
  $(this).css({
    'background-color' : 'lightblue',
    'color': 'black'
  });
});


$('.reset').click(function() {
  location.reload();
});



/* $('.checkButton').mousedown()
 * Checks the inputs in the sudoku table when the checkButton is clicked on
 * @parameter none
 * @return none
 *
 */
$('.checkButton').click(function() {
  isSolution();
});



/* isSolution()
 * Checks if the inputs on the sudoku table work
 * @parameter none
 * @return boolean(true of false)
 *
 */
function isSolution() {
  var matrix = [];
  for (var i = 0; i < 9; i++) {
    matrix[i] = [];
  }

  // create 9X9 matrix with input values
  var table_id = 1;
  for (var row = 0; row <= 8; row++) {
    for (var index = 0; index <= 8; index++) {
      matrix[row][index] = $('#inp_' + table_id).val();
      table_id += 1;
    }
  }


  // checking rows
  var x;
  var tempR;
  var sorted = ["1","2","3","4","5","6","7","8","9"];
  var solution;
  for (var r = 0; r <= 8; r++) {
    x = matrix[r];
  }


  //checking columns
  var tempC;
  var a = [];

  for (var j = 0; j <= 8; j++) {
    for (var k = 0; k <= 8; k++) {
      a[k] = matrix[k][j];
    }
  }


  //checking boxes
  var box1 = [$('#inp_1').val(),$('#inp_2').val(),$('#inp_3').val(),
              $('#inp_10').val(),$('#inp_11').val(),$('#inp_12').val(),
              $('#inp_19').val(),$('#inp_20').val(),$('#inp_21').val()];


  var box2 = [$('#inp_4').val(),$('#inp_5').val(),$('#inp_6').val(),
              $('#inp_13').val(),$('#inp_14').val(),$('#inp_15').val(),
              $('#inp_22').val(),$('#inp_23').val(),$('#inp_24').val()];

  var box3 = [$('#inp_7').val(),$('#inp_8').val(),$('#inp_9').val(),
              $('#inp_16').val(),$('#inp_17').val(),$('#inp_18').val(),
              $('#inp_25').val(),$('#inp_26').val(),$('#inp_27').val()];

  var box4 = [$('#inp_28').val(),$('#inp_29').val(),$('#inp_30').val(),
              $('#inp_37').val(),$('#inp_38').val(),$('#inp_39').val(),
              $('#inp_46').val(),$('#inp_47').val(),$('#inp_48').val()];

  var box5 = [$('#inp_31').val(),$('#inp_32').val(),$('#inp_33').val(),
              $('#inp_40').val(),$('#inp_41').val(),$('#inp_42').val(),
              $('#inp_49').val(),$('#inp_50').val(),$('#inp_51').val()];

  var box6 = [$('#inp_34').val(),$('#inp_35').val(),$('#inp_36').val(),
              $('#inp_43').val(),$('#inp_44').val(),$('#inp_45').val(),
              $('#inp_52').val(),$('#inp_53').val(),$('#inp_54').val()];

  var box7 = [$('#inp_55').val(),$('#inp_56').val(),$('#inp_57').val(),
              $('#inp_64').val(),$('#inp_65').val(),$('#inp_66').val(),
              $('#inp_73').val(),$('#inp_74').val(),$('#inp_75').val()];

  var box8 = [$('#inp_58').val(),$('#inp_59').val(),$('#inp_60').val(),
              $('#inp_67').val(),$('#inp_68').val(),$('#inp_69').val(),
              $('#inp_76').val(),$('#inp_77').val(),$('#inp_78').val()];

  var box9 = [$('#inp_61').val(),$('#inp_62').val(),$('#inp_63').val(),
              $('#inp_70').val(),$('#inp_71').val(),$('#inp_72').val(),
              $('#inp_79').val(),$('#inp_80').val(),$('#inp_81').val()];

  box1Check = compareArrays(box1,sorted);
  if (box1Check) console.log("box 1: " + box1Check);
  box2Check = compareArrays(box2,sorted);
  box3Check = compareArrays(box3,sorted);
  box4Check = compareArrays(box4,sorted);
  box5Check = compareArrays(box5,sorted);
  box6Check = compareArrays(box6,sorted);
  box7Check = compareArrays(box7,sorted);
  box8Check = compareArrays(box8,sorted);
  box9Check = compareArrays(box9,sorted);


  // if the solution entered works
  if (box1Check && box2Check && box3Check && box4Check && box5Check && box6Check && box7Check && box8Check && box9Check &&
      compareArrays(a,sorted) && compareArrays(x,sorted)) {
    end = new Date().getTime();
    var elapse = parseInt((end-start)/1000); // converted milliseconds to seconds
    var fastest_time = localStorage.getItem("fastest_time"); // retreive fastest_time from localStorage
    if (fastest_time === null) localStorage.fastest_time = elapse;
    else if (elapse < fastest_time) localStorage.fastest_time = elapse;

    $('.timeTracker').text("Puzzle completed in: " + elapse + " seconds");
    $('.result').text("You got it!");
    $('.result').css({
      'background-color': 'green'
    });
    console.log(true);
    return true;
  }
  else {
    $('.result').text("Sorry, but this does not work.");
    $('.result').css({
      'background-color': 'red'
    });
    console.log(false);
    return false;
  }

}



/* puzzle1()
 * Creates puzzle using a given solution choosing 50 random ids
 * @parameter none
 * @return none
 *
 */
function puzzle1() {
  start = new Date().getTime();
  var values = [8,1,2,9,7,4,3,6,5,
                9,3,4,6,5,1,7,8,2,
                7,6,5,8,2,3,9,4,1,
                5,7,1,4,8,2,6,9,3,
                2,8,9,3,6,5,4,1,7,
                6,4,3,7,1,9,2,5,8,
                1,9,6,5,3,7,8,2,4,
                3,2,8,1,4,6,5,7,9,
                4,5,7,2,9,8,1,3,6];
  var value;
  var id;
  for (var count = 0; count <= 50; count++) {
    id = Math.round(Math.random()*81);
    value = values[id-1];
    $('#inp_' + id).attr('readonly', true);
    $('#inp_' + id).css({
      'background-color': 'lightgray'
    });
    $('#inp_' + id).val(value);
  }
}



/* compareArrays()
 * Checks if two arrays are equal or not
 * @parameter array(a1)
 * @parameter array(a2)
 * @return boolean(true or false)
 *
 */
function compareArrays(a1,a2) {
  tempArray = a1.slice().sort().join(",");
  staticArray = a2.slice().sort().join(",");

  if (tempArray === staticArray) {
    return true;
  }
  else {
    return false;
  }

}



/* $('td').each()
 * If the td doesn't already have an input, append one to the html
 * @parameter none
 * @return none
 *
 */
$('td').each(function(element, index) {

  if ($(this).find('.realcontainer').length === 0) {
    $(this).append('<div class="realcontainer">' +
                     '<div class="filler"> </div>' +
                     '<input id="inp_' + $(this).attr('id') + '" type="text" placeholder="">' +
                     '<div class="filler"> </div>' +
                   '</div>');
  }

});



/* test1()
 * Tests the puzzle 1 solution
 * @parameter none
 * @return none
 *
 */
function test1() {
  var values = [8,1,2,9,7,4,3,6,5,
                9,3,4,6,5,1,7,8,2,
                7,6,5,8,2,3,9,4,1,
                5,7,1,4,8,2,6,9,3,
                2,8,9,3,6,5,4,1,7,
                6,4,3,7,1,9,2,5,8,
                1,9,6,5,3,7,8,2,4,
                3,2,8,1,4,6,5,7,9,
                4,5,7,2,9,8,1,3,6];
  var value;
  for (var id = 1; id <= 81; id++) {
    value = values[id-1];
    $('#inp_' + id).val(value);
  }
}

/* test2()
 * Tests the puzzle 2 solution
 * @parameter none
 * @return none
 *
 */
function test2() {
  var values = [1,2,5,3,7,8,9,4,6,
                3,7,8,9,6,4,2,1,5,
                4,9,6,1,2,5,8,3,7,
                2,6,9,4,5,3,1,7,8,
                8,4,1,7,9,2,6,5,3,
                5,3,7,8,1,6,4,9,2,
                9,1,2,5,8,7,3,6,4,
                6,5,3,2,4,9,7,8,1,
                7,8,4,6,3,1,5,2,9];
  var value;
  for (var id = 1; id <= 81; id++) {
    value = values[id-1];
    $('#inp_' + id).val(value);
  }
}

/* testProject()
 * Tests several puzzle solutions
 * @parameter none
 * @return none
 *
 */
function testProject() {
  test1();
  var test1Check = isSolution();
  test2();
  var test2Check = isSolution();

  console.log("Test Report: \n");
  console.log("\t Test1 Passed: " + test1Check);
  console.log("\t Test2 Passed: " + test2Check);
}



puzzle1();
if (debug) testProject();
