require.config({
    paths: {
        jquery: '/assets/libs/jQuery/jquery-2.2.3',
        three: '/assets/libs/three/js/three',
        Layer: '/assets/libs/jQuery/layer/layer',
        stats: '/assets/libs/three/js/stats.min',
        datGui: '/assets/libs/three/js/dat.gui',

        ShadowMaterial: '/assets/libs/three/js/materials/ShadowMaterial',
        OrbitControls: '/assets/libs/three/js/controls/OrbitControls',
        Projector: '/assets/libs/three/js/Projector',

        loadScene: '/assets/js/three/loadScene.vr',
        model: '/assets/js/three/model',
        class: '/assets/js/three/class',

        TGALoader: '/assets/libs/three/js/loaders/TGALoader',

        VRControls: '/assets/libs/three/js/vr/VRControls',
        VREffect: '/assets/libs/three/js/vr/VREffect',
        webvrPolyfill: '/assets/libs/three/js/vr/webvr-polyfill'

    },
    shim: {
        three: {
            exports: 'THREE'
        },

        // thrreJs user code
        // 依赖关系：operate << loadScene << class << model
        "model" : ['three','jquery','Layer'],
        "class": ['model'],
        "loadScene": ['class'],
        // jQuery libs
        "Layer" : ['jquery'],

        //threejs libs
        "ShadowMaterial": ['three'],
        "OrbitControls": ['three'],
        "Projector": ['three'],

        "TGALoader": ['three'],

        "VRControls": ['three','webvrPolyfill'],
        "VREffect": ['three','webvrPolyfill'],
        'webvrPolyfill': {
　　　　　　deps: ['three']
　　　　  }
        
    }
});

require([
    'jquery','three','stats','datGui','loadScene',
    'ShadowMaterial','OrbitControls','Projector',
    'VRControls','VREffect','webvrPolyfill',
    'TGALoader'
    ],
function($, THREE) {


        render();
        animate();

});