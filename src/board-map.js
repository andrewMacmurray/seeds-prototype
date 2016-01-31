var items = document.getElementsByClassName('item');

function buildMap() {
    return [].slice.call(items).map(function(item) {
        if (item.className === 'item seed') return 'seed';
        if (item.className === 'item water') return 'water';
        if (item.className === 'item sunshine') return 'sunshine';
        if (item.className === 'item seedling') return 'seedling';
    });
}

console.log(buildMap());
