/* This script displays an offer expires function
   It is an example from JavaScript & jQuery book */

(function() {

var expiryMsg;	// Message displayed to users
var today;		// Today's date
var elEnds;		// The element that shows the message about the offer ending

function offerExpires(today) {
	// Declare variables within the function for local scope
	var weekFromToday, day, date, month, year, dayNames, monthNames;
	// Add 7 days time (added in milliseconds)
	weekFromToday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
	// Create arrays to hold the names of the days / months
	dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	// Collect the parts of the date to show on the page
	day = dayNames[weekFromToday.getDay()];
	date = weekFromToday.getDate();
	month = monthNames[weekFromToday.getMonth()];
	year = weekFromToday.getFullYear();
	// Create the message
	expiryMsg = 'Offer expires next ';
	expiryMsg += day + ' <br />(' + date + ' ' + month + ' ' + year + ')';
	return expiryMsg;
}

today = new Date();								// Put todays date in variable
elEnds = document.getElementById('offerEnds');	// Get the offerEnds element
elEnds.innerHTML = offerExpires(today);			// Add the expiry message

// Finish the immediatley invoked function expression
}());