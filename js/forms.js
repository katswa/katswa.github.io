// JavaScript validation of subscription form. 

// EDITED BY KATIE SWANSON FOR USE 6 / 4 / 2025

// A. Anonymous function triggered by submit event 
// B. Functions called to perform generic checks by anon function in section A
// C. Functions called to perform generic checks by anon function in section A
// D. Functions to get / set / show / remove error messages
// E. Object to check type of data using RegEx called by validateTypes in section B

(function () {
	document.forms.register.noValidate = true; // Disable HTML5 validation
	// -------------------------------------------------------------------------
	//  A) ANONYMOUS FUNCTION TRIGGERERD BY THE SUBMIT EVENT
	// -------------------------------------------------------------------------
	$('form').on('submit', function (e) {      // When form is submitted
		var elements = this.elements;            // Collection of form controls
		var valid = {};                          // Custom valid object
		var isValid;                             // isValid: checks form controls
		var isFormValid;                         // isFormValid: checks entire form

		// PERFORM GENERIC CHECKS (calls functions outside the event handler)
		var i;
		for (i = 0, l = elements.length; i < l; i++) {
			// Next line calls validateRequired() validateTypes()
			isValid = validateRequired(elements[i]) && validateTypes(elements[i]); 
			if (!isValid) {    // If it does not pass these two tests
				showErrorMessage(elements[i]);   // Show error messages
			} else {                           // Otherwise
				removeErrorMessage(elements[i]); // Remove error messages
			}                                  // End if statement
			valid[elements[i].id] = isValid;   // Add element to the valid object
		}                                    // End for loop

    // PERFORM CUSTOM VALIDATION
    // desc (you could cache desc input in variable here)
    if (!validateBio()) {        // Call validateBio(), and if not valid
		showErrorMessage(document.getElementById('desc')); // Show error message
		valid.desc = false;      // Update valid object - this element is not valid
    } else {                             // Otherwise remove error message
		removeErrorMessage(document.getElementById('desc'));
	}

	// DID IT PASS / CAN IT SUBMIT THE FORM?
    // Loop through valid object, if there are errors set isFormValid to false
    for (var field in valid) {          // Check properties of the valid object
		if (!valid[field]) {            // If it is not valid
			isFormValid = false;        // Set isFormValid variable to false
			break;                      // Stop the for loop, an error was found
		}                               // Otherwise
		isFormValid = true;            	// The form is valid and OK to submit
	}


    // If the form did not validate, prevent it being submitted
    if (!isFormValid) {                 // If isFormValid is not true
		e.preventDefault();             // Prevent the form being submitted
    }

	});                                 // End of event handler anon function
  //  END: anonymous function triggered by the submit button

  // -------------------------------------------------------------------------
  // B) FUNCTIONS FOR GENERIC CHECKS
  // -------------------------------------------------------------------------

  // CHECK IF THE FIELD IS REQUIRED AND IF SO DOES IT HAVE A VALUE
  // Relies on isRequired() and isEmpty() both shown below, and setErrorMessage - shown later.
  function validateRequired(el) {
	  if (isRequired(el)) {                  // Is this element required?
		  var valid = !isEmpty(el);          // Is value not empty (true / false)?
      if (!valid) {                          // If valid variable holds false
		  setErrorMessage(el,  'Field is required');  // Set the error message
	  }
	  return valid;                     // Return valid variable (true or false)?
	}
	return true;                        // If not required, all is ok
	}

	// CHECK IF THE ELEMENT IS REQUIRED
	// It is called by validateRequired()
	function isRequired(el) {
		return ((typeof el.required === 'boolean') && el.required) ||
		(typeof el.required === 'string');
	}

	// CHECK IF THE ELEMENT IS EMPTY (or its value is the same as the placeholder text)
	// HTML5 browsers do allow users to enter the same text as placeholder, but in this case users should not need to
	// It is called by validateRequired()
	function isEmpty(el) {
		return !el.value || el.value === el.placeholder;
	}

	// CHECK IF THE VALUE FITS WITH THE TYPE ATTRIBUTE
	// Relies on the validateType object (shown at end of IIFE)
	function validateTypes(el) {
		if (!el.value) return true;        // If element has no value, return true
                                           // Otherwise get the value from .data()
		var type = $(el).data('type') || el.getAttribute('type');  // OR get the type of input
		if (typeof validateType[type] === 'function') { // Is the type a method of validate object?
			return validateType[type](el);  // If yes, check if the value validates
		} else {                            // If not
			return true;                 // Return true because it cannot be tested
		}
	}

	// -------------------------------------------------------------------------
	// C) FUNCTIONS FOR CUSTOM VALIDATION
	// -------------------------------------------------------------------------

	// Check if the desc is less than or equal to 200 characters
	function validateBio() {
		var desc = document.getElementById('desc');
		var valid = desc.value.length <= 200;
		if (!valid) {
			setErrorMessage(desc, 'Please make sure your description does not exceed 200 characters');
		}
		return valid;
	}
  
	var desc = $('#desc');
	var descCounter = $('#desc-count');

	// show the counter when the field is focused and update the class
	// depending on amount of characters left
	desc.on('focus', updateCounter);
	desc.on('keyup', updateCounter);

	// when we leave the textarea, we hide the counter unless there are too
	// many characters
	desc.on('blur', function () {
		if (descCounter.text() >= 0) {
			descCounter.addClass('hide');
		}
	});


	function updateCounter(e) {
		var count = 200 - desc.val().length;
		var status = '';
		if (count < 0) {
			status = 'error';
		} else if (count <= 15) {
			status = 'warn';
		} else {
			status = 'good';
		}

		// remove previous classes
		descCounter.removeClass('error warn good hide');
		// add new class
		descCounter.addClass(status);
		descCounter.text(count);
	}

	// -------------------------------------------------------------------------
	// D) FUNCTIONS TO SET / GET / SHOW / REMOVE ERROR MESSAGES
	// -------------------------------------------------------------------------

	function setErrorMessage(el, message) {
		$(el).data('errorMessage', message);   // Store error message with element
	}

	function getErrorMessage(el) {
		return $(el).data('errorMessage') || el.title;       // Get error message or title of element
	}

	function showErrorMessage(el) {
		var $el = $(el);                   // The element with the error
		var errorContainer = $el.siblings('.error.message'); // Any siblings holding an error message

		if (!errorContainer.length) {       // If no errors exist with the element
			// Create a <span> element to hold the error and add it after the element with the error
			errorContainer = $('<span class="error message"></span>').insertAfter($el);
		}
		errorContainer.text(getErrorMessage(el));             // Add error message
	}

	function removeErrorMessage(el) {
		var errorContainer = $(el).siblings('.error.message'); // Get the sibling of this form control used to hold the error message
		errorContainer.remove();                               // Remove the element that contains the error message
	}

	// -------------------------------------------------------------------------
	// E) OBJECT FOR CHECKING TYPES
	// -------------------------------------------------------------------------

	// Checks whether data is valid, if not set error message
	// Returns true if valid, false if invalid
	var validateType = {
		email: function (el) {      // Create email() method
			// Rudimentary regular expression that checks for a single @ in the email
			var valid = /[^@]+@[^@]+/.test(el.value);   // Store result of test in valid
			if (!valid) {    // If the value of valid is not true
				setErrorMessage(el, 'Please enter a valid email'); 
				// Set error message
			}
			return valid;                                        // Return the valid variable
		},
		number: function (el) {                                // Create number() method
			var valid = /^\d+$/.test(el.value);                  // Store result of test in valid
			if (!valid) {
				setErrorMessage(el, 'Please enter a valid number');
			}
			return valid;
		},
		date: function (el) {          // Create date() method
                                       // Store result of test in valid
			var valid = /^(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(el.value);
			if (!valid) {                                        // If the value of valid is not true
				setErrorMessage(el, 'Please enter a valid date');  // Set error message
			}
			return valid;                                        // Return the valid variable
		}
	};

}());  // End of IIFE