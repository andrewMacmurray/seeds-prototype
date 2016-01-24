var myEvents = ['load', 'resize'];
var grid = document.getElementById('grid-container');
var responsiveHeight = function() {
   var height = window.innerHeight;
   var margin = (height - grid.clientHeight) / 2;
   grid.style.margin = margin + 'px auto';
};

myEvents.forEach(function(event) {
   window.addEventListener(event, responsiveHeight, false);
})

var columns = document.querySelectorAll('.item');

for (var i = 0; i<columns.length; i++) {
   var random = Math.random();
   if (random < 0.33) {
      columns[i].classList.add('seed');
   } else if (random > 0.66) {
      columns[i].classList.add('water');
   } else {
      columns[i].classList.add('seedling');
   }
}
