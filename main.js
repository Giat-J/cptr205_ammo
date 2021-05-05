import * as THREE from  './pkg/three.module.js';
import { AmmoPhysics } from './pkg/AmmoPhysics.js';

window.addEventListener('DOMContentLoaded', async DOMContentLoaded => {

    //INIT
    const physics = await AmmoPhysics(); 
    const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('canvas') });
    renderer.setSize(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
    renderer.SetPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x88AAFF);
    const camera = new THREE.PerspectiveCamera(75, renderer.domElement.clientWidth / renderer.domElement.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // LIGHTS
    const dir_Light = new THREE.DirectionalLight(0xFFFFFF, 1);
    dir_Light.position.x = 3;
    dir_Light.position.y = 4;
    dir_Light.position.z = 5;
    dir_Light.castShadow = true;
    scene.add(dir_Light);

    // GROUND
    const ground_geometry = new THREE.BoxGeometry(20, 1, 30);
    const ground_material = new THREE.MeshStandardMaterial({
        color: 0x44AA88,
        roughness: 0.8,
    });
    const ground = THREE.Mesh(ground_geometry, ground_material);
    ground.receiveShadow = true;
    ground.position.y = -2;
    scene.add(ground);
    physics.addMesh(ground);

    // CUBE
    const cube_geometry = new THREE.BoxGeometry();
    const cube_material = new THREE.MeshStandardMaterial({
        color: 0xAA88FF,
    });
    const cube = new THREE.Mesh(cube_geometry, cube_material);
    cube.position.y = 3;
    scene.add(cube);
    cube.castShadow = true;
    physics.addMesh(cube, 1);
    
    // INPUT
    document.addEventListener('keydown', keydown => {
        if(keydown.key === 'a') {
            physics.setVelocity(cube, {x: -4, y: 0, z: 0});
        }
        if(keydown.key === 'd') {
            physics.setVelocity(cube, {x: 4, y: 0, z: 0});
        }
        if(keydown.key === 'w') {
            physics.setVelocity(cube, {x: 0, y: 6, z: 0});
        }
    })

    // ANIMATE
    const animate = timestamp => {
        window.requestAnimationFrame(animate);

        // RENDER
        renderer.render(scene, camera);
    };
    window.requestAnimationFrame(animate);
});