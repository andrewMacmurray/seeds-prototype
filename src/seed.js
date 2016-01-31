function makeTile() {
    return '<div class="col-2 ' + randomColor() + '"><div class="item"></div></div>';
}

function randomColor() {
    var random = Math.random();
    if (random < 0.1) return 'seed';
    else if (random >= 0.25 && random < 0.5) return 'water';
    else if (random >= 0.5 && random < 0.99) return 'seedling';
    else return 'sunshine';
}

function generateBoard() {

}
