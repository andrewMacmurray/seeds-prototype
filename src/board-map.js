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
