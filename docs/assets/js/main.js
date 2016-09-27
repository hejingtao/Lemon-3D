 require.config({
    paths: {
        jquery: '/assets/libs/jQuery/jquery-2.2.3',
        three: '/assets/libs/three/js/three',
        stats: '/assets/libs/three/js/stats.min',
        datGui: '/assets/libs/three/js/dat.gui',
        ShadowMaterial: '/assets/libs/three/js/materials/ShadowMaterial',
        OrbitControls: '/assets/libs/three/js/controls/OrbitControls',
        TransformControls: '/assets/libs/three/js/controls/TransformControls',
        Projector: '/assets/libs/three/js/Projector',
        loadScene: '/assets/js/three/loadScene',
        model: '/assets/js/three/model',
        class: '/assets/js/three/class',

        OBJLoader: '/assets/libs/three/js/loaders/OBJLoader',
        DDSLoader: '/assets/libs/three/js/loaders/DDSLoader',
        // OBJMTLLoader: 'libs/three/loaders/OBJMTLLoader',
        // MTLLoader: 'libs/three/loaders/MTLLoader',

    },
    shim: {
        three: {
            exports: 'THREE'
        },
        "model" : ['three','jquery'],
        "class": ['three','jquery','model'],
        "loadScene": ['three','jquery','model','class'],
        //框架文件
        "ShadowMaterial": ['three'],
        "OrbitControls": ['three'],
        "TransformControls": ['three'],
        "Projector": ['three'],

        "OBJLoader": ['three'],
        "DDSLoader": ['three'],
        // "OBJMTLLoader": ['three'],
        // "MTLLoader" : ['three'],


    }
});

requirejs([
    'jquery', 'three', 'stats','datGui','ShadowMaterial',
    'OrbitControls','TransformControls','Projector',
    'model','loadScene','OBJLoader', 'DDSLoader'
    ],
function($, THREE) {
   function init() {
        //渲染场景- loadScenes
        render();
        animate();

        // 监听文件上传 @@该段方法重复
        $('#upload').bind("click",function(){
                $('#upload-file').click();
        });
        $('#upload-file').on('change', function() {
          var reg = /[^\\\/]*[\\\/]+/g; //匹配文件的名称和后缀的正则表达式
          var name = $(this).val().replace(reg, '');
          var postfix = /\.[^\.]+/.exec(name);//获取文件的后缀 例如： .js
          var text =name.substr(0,postfix['index']);//获取没有后缀的名称

            var resultFile = document.getElementById("upload-file").files[0];
            console.log(resultFile);
            if (resultFile) {
                var reader = new FileReader();
                 
                // reader.readAsDataURL(resultFile);
                reader.readAsBinaryString(resultFile);
                // reader.readAsText(resultFile,'UTF-8');
                reader.onload = function (e) {
                    var urlData = this.result;
                    console.log('urlData: ' + urlData);
                    }; 
                
            }
          console.log("head: "+ text + " type: " + postfix );
          console.log($('#upload-file').val());
          // 检测上传文件


          // var loader = new THREE.OBJLoader();
          //   loader.load(resultFile,function (loadedMesh) {
          //       var material = new THREE.MeshLambertMaterial({color: 0x5C3A21});
          //       // loadedMesh is a group of meshes. For
          //       // each mesh set the material, and compute the information
          //       // three.js needs for rendering.
          //       loadedMesh.children.forEach(function (child) {
          //           child.material = material;
          //           child.userData.parent = loadedMesh;
          //           child.geometry.computeFaceNormals();
          //           child.geometry.computeVertexNormals();

          //       });

          //       mesh = loadedMesh;
          //       loadedMesh.scale.set(100, 100, 100);
          //       loadedMesh.rotation.x = -0.3;
          //       loadedMesh.position.y = 5;
          //       scene.add(loadedMesh);
          //       console.log('loadedMesh');
          //       console.log(loadedMesh);
          //       objects.push(loadedMesh);
          //   });


        });


        $('.ModelList').bind("mousedown",function(){
                // var tempMesh = new THREE.Mesh( Lemon.Geometry.cuboid , rollOverMaterial );
                
                control.object = undefined;
                control.visible = false;

                // var modelType = $(event.target).data("modelType");
                // var tempMesh = THREE.SceneUtils.createMultiMaterialObject( Lemon.Geometry[modelType], Lemon.Material.temp );
                // // scene.add( rollOverMesh );
                // scene.add( tempMesh );

                Lemon.setmodelType($(event.target).data("modelType"));
                Lemon.addTempModel();
                Lemon.EventListener.bind('default',2);
                Lemon.EventListener.bind('model');

                
                console.log("data-model-type "+$(event.target).data("modelType"));
        })


    }
//—————————————————— START 侧边栏手风琴效果    
    var Accordion = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find('.link');
    // Evento
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    }

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
            $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    }   
    var accordion = new Accordion($('#accordion'), false);
//—————————————————————— END


             
    //主程序，DOM加载完毕后操作
    $(function(){
        
        init();
        
    });

});
 