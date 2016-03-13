"use strict";
const setTiles = (type, color) => {
	let counter = 0;
	let isDragging = false;
	let allTiles = [].slice.call(document.getElementsByClassName(type));
	let tilesArray = [];

	const setDragging = (e) => {
		e.preventDefault();
		tilesArray.push(e.target);
		e.target.className += ' small';
		counter++;
		isDragging = true;
	};

	const stopDragging = () => {
		isDragging = false;
		allTiles.forEach((tile) => {
			tile.classList.remove('small');
		});
		tilesArray = [];
		counter = 0;
	};

	const addWater = (e) => {
		if (isDragging === true && e.target.firstChild.className.indexOf('small') < 0) {
			tilesArray.push(e.target);
			e.target.firstChild.className += ' small';
			counter++;
		}
		if (counter === 5) {
			tilesArray.forEach((tile) => {
				tile.style.opacity = 0;
				setTimeout(() => {
					tile.style.display = 'none';
					if (tile.parentNode && tile.parentNode.className.indexOf('col-2') > -1) {
						tile.parentNode.style.display = 'none';
					}
				}, 500)
			});
			tilesArray = [];
			counter = 0;
			isDragging = false;
			document.body.classList.add(color);
			setTimeout(function () {
				document.body.classList.remove(color);
			}, 3500);
		}
	};

	// console.log(allTiles);
	for (let i = 0; i < allTiles.length; i++) {
		let tileNode = allTiles[i].parentNode;
		tileNode.addEventListener('mousedown', setDragging);
		document.addEventListener('mouseup', stopDragging);
		tileNode.addEventListener('mouseenter', addWater);
	}
};

module.exports = {
  setTiles: setTiles
};
