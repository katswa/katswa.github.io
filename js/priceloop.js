/* This script uses a loop function to calculate commission prices
   It is an example from JavaScript & jQuery book */

(function() {

	var i = 4;		// First dimension
	var b = 6;		// Second dimension
	var msg = '';	// Message
	
	while (i <= 10) {
		msg += i + ' x ' + b + ' = ' + (i * b * 2) + '$ <br />';
		i++;
		b++;
	}

document.getElementById('priceLoop').innerHTML = msg	// Embeds message in HTML

// Finish the immediatley invoked function expression
}());