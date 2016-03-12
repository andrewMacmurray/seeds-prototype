var columns = [].slice.call(document.getElementsByClassName('col-2'));
function setMouseIcons() {
	columns.forEach(column => {
		column.addEventListener('mousedown', cursorDown);
		column.addEventListener('mouseup', cursorUp);
	})
}

function cursorUp() {
	columns.forEach(column => {
		column.classList.remove('mouseDown');
	})
}

function cursorDown() {
	columns.forEach(column => {
		column.classList.add('mouseDown');
	})
}

var waterTotal = 0;
var waterDragging = false;
function setDragging() {
    this.style.transform = 'translate(95px, -105px)';
    waterTotal ++;
    waterDragging = true;
}

function stopDragging() {
    waterDragging = false;
    waterTotal = 0;

}

function addWater() {
    if (waterDragging === true) {
        this.className += ' small';
        waterTotal ++;
    }
    if (waterTotal === 5) {
        waterTotal = 0;
        document.body.style.backgroundColor = '#92C9E3';
        setTimeout(function() {
            document.body.style.backgroundColor = '#FFFCB0';
        }, 1500);
    }
}

function setWaterEvents() {
	var waterTiles = document.getElementsByClassName('water');
	for (var i = 0; i < waterTiles.length; i++) {
	    var waterNode = waterTiles[i].parentNode;
	    waterNode.addEventListener('mousedown', setDragging);
	    waterNode.addEventListener('mouseup', stopDragging);
	    waterNode.addEventListener('mouseenter', addWater);
	}
}


module.exports = {
	setWaterEvents: setWaterEvents,
	setMouseIcons: setMouseIcons
}
