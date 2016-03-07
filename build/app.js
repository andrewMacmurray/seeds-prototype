(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

// populateBoard();

module.exports = {
	populateBoard: populateBoard
};

},{}],2:[function(require,module,exports){
function buildMap() {
	var rows = document.getElementsByClassName('row');
	rows = [].slice.call(rows);
	var map = [];

	rows.forEach(function(row, i) {
		var items = row.childNodes;
		items = [].slice.call(items);
		var itemMap = items.map(function(item, j) {
			var data = {};
			if (item.firstChild.className === 'item seed') data.type = 'seed';
			if (item.firstChild.className === 'item water') data.type = 'water';
			if (item.firstChild.className === 'item sunshine') data.type = 'sunshine';
			if (item.firstChild.className === 'item seedling') data.type = 'seedling';
			data.coordinates = [i, j];
			return data;
		});
		map.push(itemMap);
		items.forEach(function(item, j) {
			item.classList.add('id=' + i + '.' + (j + 1));
		});
	});
	return map;
}

var waterTotal = 0;
var waterDragging = false;
function setDragging() {
    this.className += ' small';
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
        document.body.style.backgroundColor = '#92CAE3';
        setTimeout(function() {
            document.body.style.backgroundColor = '#FFFCD5';
        }, 3500);
    }
}


var waterTiles = document.getElementsByClassName('water');
for (var i = 0; i < waterTiles.length; i++) {
    var waterNode = waterTiles[i].parentNode;
    waterNode.addEventListener('mousedown', setDragging);
    waterNode.addEventListener('mouseup', stopDragging);
    waterNode.addEventListener('mouseenter', addWater);
}

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

// populateBoard();

module.exports = {
	populateBoard: populateBoard
};

const Board = require('./board.js');

Board.populateBoard();

var myEvents = ['load', 'resize'];
var grid = document.getElementById('grid-container');

var responsiveHeight = function() {
   var height = window.innerHeight;
   var margin = (height - grid.clientHeight) / 2;
   grid.style.margin = margin + 'px auto';
};

myEvents.forEach(function(event) {
   window.addEventListener(event, responsiveHeight, false);
});

},{"./board.js":1}]},{},[2])