function resetPosition(stepX, stepY) {
	var items = document.getElementsByClassName('item');
	var seedCounter = 0;
	for (var i = 0; i < 8; i++) {
	    for (var j = 0; j < 8; j++) {
			var translate = 'translate(' + j*stepX + 'px, ' + i*stepY + 'px)'
			items[seedCounter].style.transform = translate;
			seedCounter++
	    }
	}
}

module.exports = {
	init: resetPosition
}
