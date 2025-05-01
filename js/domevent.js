/* This script uses DOM manipulation and events 
to trigger interactive content */

let imageBox1 = document.getElementById("imageBox1");

function galleryFunction1(smallImg) {
	imageBox1.src = smallImg.src;
}

// Get the modal image tag
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var modalImage = document.getElementById("modal-image");

// When the user clicks the big picture, set the image and open the modal
imageBox1.onclick = function (e) {
	var src = e.srcElement.src;
	modal.style.display = "block";
	modalImage.src = src;
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};