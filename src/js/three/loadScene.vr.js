        var container, stats;
        var camera, controls, scene, renderer;
        var objects = [], plane;
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2(),
        offset = new THREE.Vector3(),
        INTERSECTED, SELECTED;

        var vrEffect;
        var vrControls;
        // 初始化FPS状态栏
        var stats = initStats();
        function initStats() {

            var stats = new Stats();
                stats.setMode(0); // 0: fps, 1: ms
                // Align top-left
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.left = '0px';
                stats.domElement.style.top = '0px';
                document.getElementById("Stats-output").appendChild(stats.domElement);
                return stats;
        }
        

        // 创建场景             
        var scene = new THREE.Scene();

        // 新建相机，并且添加至场景 
        $('#VR').css("width",($(window).width())+"px");
        $('#VR').css("height",($(window).height())+"px");
        var camera = new THREE.PerspectiveCamera(70, $('#VR').width() / $('#VR').height(), 1, 20000);
        scene.add(camera);


        // vr
        crosshair = new THREE.Mesh(
            new THREE.RingGeometry( 0.5, 1, 32 ),
            new THREE.MeshBasicMaterial( {
                color: 0x00bb00,
                transparent: true,
                opacity: 0.5
            } )
        );
        scene.add( crosshair );


        // 渲染并且设置场景大小 
        var renderer = new THREE.WebGLRenderer({
            antialias:true,
            preserveDrawingBuffer: true});
        renderer.setClearColor(new THREE.Color(0xfafafa, 1.0));
        // renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize($('#VR').width(), $('#VR').height());
        
        // 视图控制 
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.zoomSpeed = 2;
        controls.addEventListener( 'change', render );
        
        // vr
        var fullScreenButton = document.querySelector( '.full-screen' );

        if ( navigator.getVRDevices === undefined ) {

            fullScreenButton.innerHTML = 'Your browser doesn\'t support WebVR';
            fullScreenButton.classList.add('error');

        }

        vrControls = new THREE.VRControls( camera );
        vrEffect = new THREE.VREffect( renderer, function ( error ) {

            fullScreenButton.innerHTML = error;
            fullScreenButton.classList.add('error');

        } );

        fullScreenButton.onclick = function() {

            vrEffect.setFullScreen( true );

        };

        //创建线条基面
        var size = 100, step = 1 , step2 = 10,step3 = 100;
        var geometry1 = new THREE.Geometry();
        for ( var i = - size; i <= size; i += step ) {
            geometry1.vertices.push( new THREE.Vector3( - size, 0, i ) );
            geometry1.vertices.push( new THREE.Vector3(   size, 0, i ) );
            geometry1.vertices.push( new THREE.Vector3( i, 0, - size ) );
            geometry1.vertices.push( new THREE.Vector3( i, 0,   size ) );

        }
        var material = new THREE.LineBasicMaterial( { color: 0x007fff, opacity: 0.1, transparent: true } );
        var line = new THREE.LineSegments( geometry1, material );
        scene.add( line );

        var geometry2 = new THREE.Geometry();
        for ( var i = - size; i <= size; i += step2 ) {
            geometry2.vertices.push( new THREE.Vector3( - size, 0, i ) );
            geometry2.vertices.push( new THREE.Vector3(   size, 0, i ) );
            geometry2.vertices.push( new THREE.Vector3( i, 0, - size ) );
            geometry2.vertices.push( new THREE.Vector3( i, 0,   size ) );

        }
        var material = new THREE.LineBasicMaterial( { color: 0x4d4dff, opacity: 0.6, transparent: true } );
        var line2 = new THREE.LineSegments( geometry2, material );
        scene.add( line2 );
        
        var geometry3 = new THREE.Geometry();
        for ( var i = - size; i <= size; i += step3 ) {
            geometry3.vertices.push( new THREE.Vector3( - size, 0, i ) );
            geometry3.vertices.push( new THREE.Vector3(   size, 0, i ) );
            geometry3.vertices.push( new THREE.Vector3( i, 0, - size ) );
            geometry3.vertices.push( new THREE.Vector3( i, 0,   size ) );

        }
        var material = new THREE.LineBasicMaterial( { color: 0x4d4d4d, opacity: 1, transparent: true } );
        var line3 = new THREE.LineSegments( geometry3, material );
        scene.add( line3 );
        // 创建隐藏平面用于定位
        var geometry = new THREE.PlaneBufferGeometry( 600, 600 );
        geometry.rotateX( - Math.PI / 2 );
        plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
        plane.able = 'false';
        scene.add( plane );
        objects.push( plane );
        

        

        // 设置相机位置，并且定义方向 
        camera.position.x = 95;
        camera.position.y = 166;
        camera.position.z = 376;
        camera.lookAt(scene.position);
        

        // 添加灯光       
        var light = new Array();
        var lightDistance = 400;
        lightX =[0,   0,    lightDistance, -lightDistance, 0,     0];
        lightY =[lightDistance,-lightDistance,0,    0,     0,     0];
        lightZ =[0,   0,    0,    0,     lightDistance,  -lightDistance]
        lightIntensity = [1, 0.85, 0.7, 0.75 , 0.8, 0.75];
        for(var i =0; i<6;i++){
            light[i] = new THREE.DirectionalLight(0xffffff);
            light[i].position.set(lightX[i], lightY[i], lightZ[i]);
            light[i].castShadow = false;
            light[i].shadow.camera.near = 2;
            light[i].shadow.camera.far = 2000;
            light[i].shadow.camera.left = -1000;
            light[i].shadow.camera.right = 1000;
            light[i].shadow.camera.top = 1000;
            light[i].shadow.camera.bottom = -1000;
            light[i].distance = 0;
            light[i].intensity = lightIntensity[i];
            light[i].shadow.mapSize.width = 1024;
            light[i].shadow.mapSize.height = 1024;
            scene.add(light[i]);
            // var test = new THREE.DirectionalLightHelper( light[i],100);
            // scene.add(test) ;
        }
        
        // var geometry = new THREE.BoxGeometry( 50, 50, 50 );

        // for ( var i = 0; i < 100; i ++ ) {

        //     var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

        //     object.position.x = Math.random() * 800 - 400;
        //     object.position.y = Math.random() * 800 - 400;
        //     object.position.z = Math.random() * 800 - 400;

        //     object.rotation.x = Math.random() * 2 * Math.PI;
        //     object.rotation.y = Math.random() * 2 * Math.PI;
        //     object.rotation.z = Math.random() * 2 * Math.PI;

        //     object.scale.x = Math.random() + 0.5;
        //     object.scale.y = Math.random() + 0.5;
        //     object.scale.z = Math.random() + 0.5;

        //     scene.add( object );
        //     objects.push( object );

        // }

$.get("/assets/js/three/demo0.lem3d", [], function(data){

    Lemon.recoverSystemModel(JSON.parse(data));
});
        var pathList= [{"position":{"x":95,"y":166,"z":376},"speed":"0.3","num":1,"length":68.24221567329127,"step":227,"move":{"x":-0.13215859030837004,"y":0.02643171806167401,"z":-0.2687224669603524}},{"position":{"x":65,"y":172,"z":315},"speed":"0.2","num":2,"length":96.78842906050289,"step":484,"move":{"x":0.012396694214876033,"y":0.09090909090909091,"z":-0.17768595041322313}},{"position":{"x":71,"y":216,"z":229},"speed":"0.4","num":3,"length":409.0305612053945,"step":1023,"move":{"x":-0.004887585532746823,"y":0,"z":-0.3998044965786901}},{"position":{"x":66,"y":216,"z":-180},"speed":"0.3","num":4,"length":93.4826187052973,"step":312,"move":{"x":0.003205128205128205,"y":-0.13782051282051283,"z":-0.266025641025641}},{"position":{"x":67,"y":173,"z":-263},"speed":"0.2","num":5,"length":207.5475849052453,"step":1038,"move":{"x":-0.023121387283236993,"y":0.007707129094412331,"z":-0.19845857418111754}},{"position":{"x":43,"y":181,"z":-469},"speed":"0.3","num":6,"length":221.77916944564473,"step":739,"move":{"x":0.2598105548037889,"y":-0.0013531799729364006,"z":-0.15020297699594046}},{"position":{"x":235,"y":180,"z":-580},"speed":"0.2","num":7,"length":277.34815665513264,"step":1387,"move":{"x":-0.005046863734679163,"y":0.008651766402307137,"z":-0.19971160778658975}},{"position":{"x":228,"y":192,"z":-857},"speed":"0.3","num":8,"length":384.2134823246056,"step":1281,"move":{"x":-0.2997658079625293,"y":-0.00624512099921936,"z":-0.0078064012490242}},{"position":{"x":-156,"y":184,"z":-867},"speed":"0.3","num":9,"length":263.0247136677464,"step":877,"move":{"x":-0.026225769669327253,"y":-0.0034207525655644243,"z":0.29874572405929306}},{"position":{"x":-179,"y":181,"z":-605},"speed":"0.3","num":10,"length":250.24987512484398,"step":834,"move":{"x":0.2637889688249401,"y":0.009592326139088728,"z":0.14268585131894485}},{"position":{"x":41,"y":189,"z":-486},"speed":"0.4","num":11,"length":211.00236965494014,"step":528,"move":{"x":0.03787878787878788,"y":-0.03977272727272727,"z":0.3958333333333333}},{"position":{"x":61,"y":168,"z":-277},"speed":"0.3","num":12,"length":99.443451267542,"step":331,"move":{"x":-0.015105740181268883,"y":0.1268882175226586,"z":0.2719033232628399}},{"position":{"x":56,"y":210,"z":-187},"speed":"0.2","num":13,"length":419.2636402074475,"step":2096,"move":{"x":0.006679389312977099,"y":0.002385496183206107,"z":0.19990458015267176}},{"position":{"x":70,"y":215,"z":232},"speed":"0.4","num":14,"length":91.11531155629113,"step":228,"move":{"x":-0.06578947368421052,"y":-0.2236842105263158,"z":0.32456140350877194}},{"position":{"x":55,"y":164,"z":306},"speed":"0.3","num":15,"length":80.64738061462381,"step":269,"move":{"x":0.14869888475836432,"y":0.007434944237918215,"z":0.26022304832713755}}];


        // 添加渲染DOM节点
        container = document.getElementById("VR").appendChild(renderer.domElement);

        window.addEventListener( 'resize', onWindowResize, false );
        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            vrEffect.setSize( window.innerWidth, window.innerHeight );

        }

        Lemon.zIndex = 1;
        Lemon.zIndexAdd = true;
        // 场景渲染定义
        function animate() {

             requestAnimationFrame( animate );
             stats.update();
             render();

             // transformControl.update();
        }
        function render() {

            Lemon.vrPath(camera, pathList);

            renderer.render(scene, camera);

            vrControls.update();

            crosshair.quaternion.copy( camera.quaternion );
            crosshair.position.set( 0, 0, 0 );

            vrEffect.render( scene, camera );
        }