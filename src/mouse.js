"use strict";

const cursorUp = (columns) => {
	columns.forEach(column => {
		column.classList.remove('mouseDown');
	})
}

const cursorDown = (columns) => {
	columns.forEach(column => {
		column.classList.add('mouseDown');
	})
}
const setMouseIcons = () => {
	const columns = [].slice.call(document.getElementsByClassName('col-2'));
	columns.forEach(column => {
		column.addEventListener('mousedown', () => {cursorDown(columns)});
		column.addEventListener('mouseup', () => {cursorUp(columns)});
	})
}

module.exports = setMouseIcons;
