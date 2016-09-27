require.config({
    paths: {
        jquery: '/assets/libs/jQuery/jquery-2.2.3',
        three: '/assets/libs/three/js/three',
        Layer: '/assets/libs/jQuery/layer/layer',
        stats: '/assets/libs/three/js/stats.min',
        datGui: '/assets/libs/three/js/dat.gui',
        ShadowMaterial: '/assets/libs/three/js/materials/ShadowMaterial',
        OrbitControls: '/assets/libs/three/js/controls/OrbitControls',
        TransformControls: '/assets/libs/three/js/controls/TransformControls',
        Projector: '/assets/libs/three/js/Projector',


        OBJLoader: '/assets/libs/three/js/loaders/OBJLoader',
        DDSLoader: '/assets/libs/three/js/loaders/DDSLoader',
        TGALoader: '/assets/libs/three/js/loaders/TGALoader',
        ColladaLoader: '/assets/libs/three/js/loaders/ColladaLoader',
        STLLoader: '/assets/libs/three/js/loaders/STLLoader',
        VTKLoader: '/assets/libs/three/js/loaders/VTKLoader',
        PDBLoader: '/assets/libs/three/js/loaders/PDBLoader',
        XHRLoader: '/assets/libs/three/js/loaders/XHRLoader',
        PLYLoader: '/assets/libs/three/js/loaders/PLYLoader',
        AWDLoader: '/assets/libs/three/js/loaders/AWDLoader',
        AssimpJSONLoader: '/assets/libs/three/js/loaders/AssimpJSONLoader',
        VRMLLoader: '/assets/libs/three/js/loaders/VRMLLoader',
        BabylonLoader: '/assets/libs/three/js/loaders/BabylonLoader',


        GeometryExporter: '/assets/libs/three/js/GeometryExporter',
        SceneExporter: '/assets/libs/three/js/SceneExporter',
        SceneLoader:  '/assets/libs/three/js/SceneLoader',
        MaterialExporter: '/assets/libs/three/js/MaterialExporter',


        loadScene: '/assets/js/three/loadScene.vr',
        model: '/assets/js/three/model',
        class: '/assets/js/three/class',



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
        "TransformControls": ['three'],
        "Projector": ['three'],

        "GeometryExporter": ['three'],
        "SceneExporter": ['three'],
        "SceneLoader": ['three'],
        "MaterialExporter": ['three'],
        // file loader
        "OBJLoader": ['three'],
        "DDSLoader": ['three'],
        "TGALoader": ['three'],
        "ColladaLoader": ['three'],
        "STLLoader": ['three'],
        "VTKLoader": ['three'],
        "PDBLoader": ['three','XHRLoader'],
        "XHRLoader": ['three'],
        "PLYLoader": ['three'],
        "AWDLoader": ['three'],
        "AssimpJSONLoader": ['three'],
        "VRMLLoader": ['three'],
        "BabylonLoader": ['three','XHRLoader'],

        "VRControls": ['three','webvrPolyfill'],
        "VREffect": ['three','webvrPolyfill'],
        'webvrPolyfill': {
　　　　　　deps: ['three']
　　　　  }
        
    }
});

require([
    'jquery','three','stats','datGui',
    'ShadowMaterial','OrbitControls','TransformControls','Projector',
    'loadScene',
    'OBJLoader','DDSLoader','TGALoader','ColladaLoader','STLLoader',
    'VTKLoader','PDBLoader','PLYLoader','AWDLoader','AssimpJSONLoader',
    'VRMLLoader','BabylonLoader',
    'GeometryExporter','SceneExporter','SceneLoader','MaterialExporter',
    'VRControls','VREffect','webvrPolyfill'
    ],
function($, THREE) {


        render();
        animate();

});