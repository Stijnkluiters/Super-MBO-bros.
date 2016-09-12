var socket = io.connect('http://' + document.location.hostname + ':8000');

$('#name_form').on('submit', function (form) {
    form.preventDefault();

    socket.emit('client_name', $('#name_input').val());

    $('#name_input').val('');
});

socket.on('toclient', function(message){
    var text = message['user'] + ": " + message['message'];
    console.log(text);
    pushmessage(text);
});

socket.on('newclient', function(message) {
    pushmessage(message);
});

socket.on('connect_error', function(data){
    console.log(data);
});

function pushmessage(message) {
    $(".receivedmessages").html($(".receivedmessages").html() + message + "<br>");
}