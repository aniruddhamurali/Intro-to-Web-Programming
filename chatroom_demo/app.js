var ref = new Firebase("https://chatroom-demo-4602.firebaseio.com");

// Sign in
var username;
ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    username = authData.google.displayName;

    // Send Chat
    $('.chat-message').keypress(function(event) {
      if (event.which === 13) $('.chat-button').click();
    });
    $('.chat-button').click(function() {
      var message = $('.chat-message').val();

      if (username && username !== '' && message !== '') {
        ref.child('chats').push().set({
          username: username,
          message: message,
          timestamp: Firebase.ServerValue.TIMESTAMP
        });

        $('.chat-message').val('');
      }
    });

    // Load Chats
    ref.child('chats').orderByChild('timestamp').startAt(getServerTime()).on('child_added', function(snapshot) {
      var blank_chat = '<div class="chat">' +
                         '<div class="username"></div>' +
                         '<div class="message"></div>' +
                       '</div>';

      var lockedToBottom = false;
      if (Math.abs($('.chats').scrollTop() - ($('.chats')[0].scrollHeight - $('.chats').innerHeight())) < 5) {
        lockedToBottom = true;
      }

      var new_chat = $(blank_chat);
      new_chat.find('.username').text(snapshot.val().username);
      new_chat.find('.message').text(snapshot.val().message);
      $('.chats').append(new_chat);

      if (lockedToBottom) {
        $('.chats').scrollTop($('.chats')[0].scrollHeight - $('.chats').innerHeight());
      }
    });
  }
});

// Server Time
var offset = 0;
ref.child('.info/serverTimeOffset').on('value', function(snapshot) {
  offset = snapshot.val();
});
function getServerTime() {
  return(new Date().getTime() + offset);
}
