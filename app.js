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

var columns = document.querySelectorAll('.item');

for (var i = 0; i < columns.length; i++) {
   var random = Math.random();
   if (random < 0.1) {
      columns[i].classList.add('seed');
   } else if (random >= 0.25 && random < 0.5) {
      columns[i].classList.add('water');
   } else if (random >= 0.5 && random < 0.99) {
      columns[i].classList.add('seedling');
   } else {
      columns[i].classList.add('sunshine');
   }
}

var seedling = document.querySelectorAll('.seedling');
var scaleSeed = function(e) {
   this.classList.add('large');
};
console.log(seedling);
for (var i = 0; i < seedling.length; i++) {
   seedling[i].addEventListener('mousedown', scaleSeed);
   // seedling[i].addEventListener('mouseenter', scaleSeed);
}
