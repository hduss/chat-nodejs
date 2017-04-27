
	var pseudo = prompt("Enter pseudo");



	$(function() {

    	var socket = io();

	    $('form').submit(function(){

	      socket.emit('chat', $('#new').val());

	      $('#new').val('');

	      return false;


	    });

	    socket.on('chat', function(msg){

	    	$('#messages').append($('<li>').text('new message from ' + pseudo + ' => ' + msg));

	    });

  });