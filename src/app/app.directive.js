
angular.module('Lemon3D.directive',[])

.directive("pdf", function() {
    return {
        restrict : "EA",
        replace: true,
        scope: {
          url: "@"
        },
        templateUrl :  'user/template/pdf-viewer.html',
        link: function (scope, element, attrs) {
       		DEFAULT_URL =	attrs.url;
       		
         console.log('test in');
			   webViewerLoad('test');
        },
        controller: function(){
            
        }
    };
});






