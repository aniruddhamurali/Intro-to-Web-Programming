var ref = new Firebase("https://blinding-torch-2253.firebaseio.com/");

function onClickCheck() {
  if ($(this).parent().hasClass('done')) {
    $(this).parent().removeClass('done');
  } else {
    $(this).parent().addClass('done');
  }
  saveTodos();
}

function saveTodos(todos) {
  if (todos !== " ") {
    ref.child('todos').push().set( {
      todos: todos,
      timestamp: Firebase.ServerValue.TIMESTAMP
    });
  }
}

// Load Todos
ref.child('todos').orderByChild('timestamp').on('child_added', function(snapshot) {
  var blank_todo = '<div class="todo">' +
                      '<div class="check"><i class="fa fa-square-o"</i><i class="fa fa check-square-o"></i></div>'+
                      '<div class="item"></div>' +
                   '</div>';

  var new_todo = $(blank_todo);
  new_todo.find('.item').text(snapshot.val().todos);
  $('.todos').append(new_todo);
});


// Add a todo
function addTodo(item, checked) {
  var blank_todo = '<div class="todo">' +
                      '<div class="check"><i class="fa fa-square-o"></i><i class="fa fa-check-square-o"></i></div>' +
                      '<div class="item"></div>' +
                   '</div>';

  var new_todo = $(blank_todo);
  new_todo.find('.item').text(item);
  if (checked !== undefined && checked) {
    new_todo.addClass('done');
    $('.todos').append(new_todo);
  } else {
    $('.todos').prepend(new_todo);
  }
  $(new_todo).find('.check').click(onClickCheck);
}

$('#new_todo_btn').click(function() {
    var new_todo_text = $('#new_todo_input').val();
    $('#new_todo_input').val('');

    if (new_todo_text !== "") {
      saveTodos(new_todo_text);
    }
});
$('#new_todo_input').keypress(function(event) {
  if (event.which === 13) { // Enter
    $('#new_todo_btn').click();
  }
});

$('.todo .check').click(onClickCheck());
