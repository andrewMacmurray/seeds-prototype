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
