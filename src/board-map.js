"use strict";
const buildMap = () => {
	let rows = document.getElementsByClassName('row');
	rows = [].slice.call(rows);
	let map = [];

	rows.forEach(function (row, i) {
		let items = row.childNodes;
		items = [].slice.call(items);
		let itemMap = items.map(function (item, j) {
			let data = {};
			if (item.firstChild.className === 'item seed') data.type = 'seed';
			if (item.firstChild.className === 'item water') data.type = 'water';
			if (item.firstChild.className === 'item sunshine') data.type = 'sunshine';
			if (item.firstChild.className === 'item seedling') data.type = 'seedling';
			data.coordinates = [i, j];
			return data;
		});
		map.push(itemMap);
		items.forEach(function (item, j) {
			item.classList.add('id=' + i + '.' + (j + 1));
		});
	});
	return map;
};

module.exports = {
	buildMap: buildMap,
};
