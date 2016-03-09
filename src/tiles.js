"use strict";
const setTiles = (type, color) => {
	let counter = 0;
	let isDragging = false;
	let tilesArray = [];

	const setDragging = (e) => {
		tilesArray.push(e.target);
		e.target.className += ' small';
		counter++;
		isDragging = true;
	};

	const stopDragging = () => {
		tilesArray.forEach((tile) => {
			tile.classList.remove('small');
		});
		tilesArray = [];
		// console.log(tilesArray);
		isDragging = false;
		counter = 0;
	};

	const addWater = (e) => {
		if (isDragging === true) {
			tilesArray.push(e.target);
			// console.log(tilesArray);
			e.target.firstChild.className += ' small';
			counter++;
		}
		if (counter === 5) {
			tilesArray.forEach((tile) => {
				tile.style.opacity = 0;
				setTimeout(() => {
					tile.style.display = 'none';
					if (tile.parentNode && tile.parentNode.className.indexOf('col-2') > -1) {
						// console.log(tile.parentNode.className);
						console.log('fired');
						tile.parentNode.style.display = 'none';
					}
				}, 300)
			});
			tilesArray = [];
			counter = 0;
			isDragging = false;
			document.body.style.backgroundColor = color;
			setTimeout(function () {
				document.body.style.backgroundColor = '#FFFCD5';
			}, 3500);
		}
	};

	var waterTiles = document.getElementsByClassName(type);
	console.log(waterTiles);
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
