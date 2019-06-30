var performAnimation = function(previousWasBigger) {
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

var setButtonMargins = function(marginSize) {
	var elements = document.getElementsByClassName("btn");
	for (elem of elements) {
		elem.style.marginTop = marginSize;
	}
}

window.onscroll = (function () {
	var previousWasBigger = true;

	return function() {
		if (document.documentElement.scrollTop > 120) {
			document.getElementById("navbar").style.paddingTop = "0px"; // Sets back exactly to 0, considering float arithmetic issues
			setButtonMargins("0px");
			if (previousWasBigger) {
				performAnimation(true);
				previousWasBigger = false;
			}
		} else {
			document.getElementById("navbar").style.paddingTop = "5px";
			setButtonMargins("23px");
			if (!previousWasBigger) {
				performAnimation(false);
				previousWasBigger = true;
			}
		}
	};
}());