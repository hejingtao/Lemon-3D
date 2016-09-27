        // 右上角控制栏
        // var controlsData = new function () {
        //     this.numberOfObjects = scene.children.length;
        //     this.positionX = 0;
        //     this.positionY = 0;
        //     this.positionZ = 0;
        //     this.removeCube = function () {
        //         var allChildren = scene.children;
        //         var lastObject = allChildren[allChildren.length - 1];
        //         if (lastObject instanceof THREE.Mesh) {
        //             scene.remove(lastObject);
        //             this.numberOfObjects = scene.children.length;
        //         }
        //     };
        //     this.addCube = function () {
        //         var cubeSize = Math.ceil((Math.random() * 3));
        //         var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        //         var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
        //         var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        //         cube.castShadow = true;
        //         cube.name = "cube-" + scene.children.length;
        //         cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
        //         cube.position.y = Math.round((Math.random() * 5));
        //         cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
        //         // add the cube to the scene
        //         scene.add(cube);
        //         objects.push( cube );
        //         this.numberOfObjects = scene.children.length;
        //     };
        //     this.outputObjects = function () {
        //         console.log(scene.children);
        //     },
        //     this.getPosition = function () {
        //         this.positionX = camera.position.x;
        //         this.positionY = camera.position.y;
        //         this.positionZ = camera.position.z;
        //     },
        //     this.lookAtCenter = function(){
        //         camera.position.x = -70;
        //         camera.position.y = 60;
        //         camera.position.z = 50;
        //         camera.lookAt(scene.position);
        //     }
        // };
        // 渲染右上角状态栏
        // var gui = new dat.GUI();
        // gui.add(controlsData, 'addCube');
        // gui.add(controlsData, 'removeCube');
        // gui.add(controlsData, 'outputObjects');
        // gui.add(controlsData, 'getPosition');
        // gui.add(controlsData, 'lookAtCenter');
        // gui.add(controlsData, 'numberOfObjects').listen();
        // gui.add(controlsData, 'positionX').listen();
        // gui.add(controlsData, 'positionY').listen();
        // gui.add(controlsData, 'positionZ').listen();
        // gui.add(controlsData, 'positionY').listen();
        // gui.add(controlsData, 'positionZ').listen();

        // // 基座   ————————————————————————————————————————————————
        // var helper = new THREE.GridHelper( 40, 2 );
        // helper.rotation.x = Math.PI / 1;
        // helper.setColors(0x000000,0x15c5ff);
        // helper.material.opacity = 0.25;
        // scene.add( helper );
        // 创建基座工作平面 ——————————————————————————————————
        // var planeGeometry = new THREE.PlaneGeometry(200, 200, 1, 1);
        // var planeMaterial = new THREE.ShadowMaterial();
        // var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // plane.receiveShadow = true;
        // plane.rotation.x = -0.5 * Math.PI;
        // plane.position.x = 0;
        // plane.position.y = 0;
        // plane.position.z = 0;
        // scene.add(plane);













        