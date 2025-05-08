/* This script uses jQuery to animate process gallery items
   It is inspired from JavaScript & jQuery book examples */

$(function() {

	$('#one').hide().slideDown(500);
	$('#two').hide().delay(400).slideDown(500);
	$('#three').hide().delay(800).slideDown(500);

});

$(function() {
	var $one = $('#one img');
	$('#one p').hide();
	$('#one h2').append('<a class="show"> (click for more)</a>');

	$('#one a').on('click', function() {
		$one.next('#one p')
		.fadeIn(500)
	$('#one h2').find('a').fadeOut();
	});

});

$(function() {
	var $two = $('#two img');
	$('#two p').hide();
	$('#two h2').append('<a class="show"> (click for more)</a>');

	$('#two a').on('click', function() {
		$two.next('#two p')
		.fadeIn(500)
	$('#two h2').find('a').fadeOut();
	});

});

$(function() {
	var $three = $('#three img');
	$('#three p').hide();
	$('#three h2').append('<a class="show"> (click for more)</a>');

	$('#three a').on('click', function() {
		$three.next('#three p')
		.fadeIn(500)
	$('#three h2').find('a').fadeOut();
	});

});