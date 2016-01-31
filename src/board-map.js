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
            data.id = '' + i + j;
            return data;
        });
        map.push(itemMap);
        items.forEach(function(item, j) {
            item.classList.add('id=' + i + '.' + (j+1));
        });
    });
    return map;
}

console.log(JSON.stringify(buildMap()));
