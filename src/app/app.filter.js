
angular.module('Lemon3D.filter',[])

.filter('map', function(){
    var filter = function(input){
      return input + '...';
    };
    return filter;
  });








