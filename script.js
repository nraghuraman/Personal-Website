/*
 * Performs the animation of shrinking and expanding the navigation bar
 */
var performNavbarAnimation = function(previousWasBigger) {
	var id = setInterval(animation, 5);
	var newFont, newTop, newBottom;
	[ newFont, newTop, newBottom ] = previousWasBigger ? [ 45, 5, 12 ] : [ 30, 0, 4.5 ];

	function animation() {
		if ((previousWasBigger && newFont === 30) || (!previousWasBigger && newFont === 45)) {
			clearInterval(id);
		} else {
			[ newFont, newTop, newBottom ] = previousWasBigger ? [ newFont - 1, newTop - 0.3333, newBottom - 0.5 ] :
										 					 	 [ newFont + 1, newTop + 0.3333, newBottom + 0.5 ];
			document.getElementById("name").style.fontSize = newFont + "px";
			document.getElementById("navbar").style.paddingTop = newTop + "px";
			document.getElementById("navbar").style.paddingBottom = newBottom + "px";
		}
	}
}

/*
 * Sets the top button margins to the designated size
 */
var setButtonMargins = function(marginSize) {
	var elements = document.getElementsByClassName("btn");
	for (elem of elements) {
		elem.style.marginTop = marginSize;
	}
}

/*
 * A closure which returns a function to be called whenever the window is scrolled
 */
window.onscroll = (function () {
	var previousWasBigger = true;

	return function() {
		if (window.scrollY || window.pageYOffset > 120) {
			document.getElementById("navbar").style.paddingTop = "0px"; // Sets back exactly to 0, considering float arithmetic issues
			setButtonMargins("0px");
			if (previousWasBigger) {
				performNavbarAnimation(true);
				previousWasBigger = false;
			}
		} else {
			document.getElementById("navbar").style.paddingTop = "5px";
			setButtonMargins("23px");
			if (!previousWasBigger) {
				performNavbarAnimation(false);
				previousWasBigger = true;
			}
		}
	};
}());