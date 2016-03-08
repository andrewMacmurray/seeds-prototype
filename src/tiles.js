"use strict";
const setTiles = (type, color) => {
	let waterTotal = 0;
	let waterDragging = false;

	const setDragging = (e) => {
		e.target.className += ' small';
		waterTotal++;
		waterDragging = true;
	};

	const stopDragging = () => {
		waterDragging = false;
		waterTotal = 0;
	};

	const addWater = (e) => {
		if (waterDragging === true) {
			e.target.className += ' small';
			waterTotal++;
		}
		if (waterTotal === 5) {
			waterTotal = 0;
			document.body.style.backgroundColor = color;
			setTimeout(function () {
				document.body.style.backgroundColor = '#FFFCD5';
			}, 3500);
		}
	};

	var waterTiles = document.getElementsByClassName(type);
	for (let i = 0; i < waterTiles.length; i++) {
		let waterNode = waterTiles[i].parentNode;
		waterNode.addEventListener('mousedown', setDragging);
		waterNode.addEventListener('mouseup', stopDragging);
		waterNode.addEventListener('mouseenter', addWater);
	}
};

module.exports = {
  setTiles: setTiles
};
