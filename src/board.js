// the seed board should

// make a board of 8 x 8
// each seed should have a unique id (potentially mapped to an array)
// make a random color
// append its contents to the DOM



function randomColor() {
	var random = Math.random();
	if (random < 0.1) return 'seed';
	else if (random >= 0.25 && random < 0.5) return 'water';
	else if (random >= 0.5 && random < 0.99) return 'seedling';
	else return 'sunshine';
}

function makeTile() {
	return '<div class="col-2"><div class="item ' + randomColor() + '"></div></div>';
}

function makeRow() {
	var tiles = '';
	for (var i = 0; i < 8; i++) {
		tiles += makeTile();
	}
	return '<div class="row">' + tiles + '</div>';
}


function populateBoard() {
    var container = document.getElementById('grid-container');
    var rows = '';
	for (var i = 0; i < 8; i++) {
		rows += makeRow();
	}
    container.innerHTML = rows;
}

populateBoard();
