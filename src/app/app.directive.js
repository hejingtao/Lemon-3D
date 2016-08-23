
angular.module('Lemon3D.directive',[])

// pdf显示 弹出层
.directive("pdf", function() {
    return {
        restrict : "EA",
        replace: true,
        scope: {
          url: "@",
          close: "&"
        },
        templateUrl :  'product/pdf-viewer.html',
        link: function (scope, element, attrs) {
          DEFAULT_URL = attrs.url;
        }
    };
});




