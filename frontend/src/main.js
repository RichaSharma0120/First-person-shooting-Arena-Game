import * as THREE from 'three';
import { Renderer } from './game/renderer';
import { Player } from './game/player';
import { generateObstacles } from './game/obstacles';
import { Health } from './game/health';
import { handleRespawn } from './game/respawn';

let scene, camera, renderer, player, healthBar, obstacles = [];
const players = {};

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new Renderer(scene, camera);
    
    player = new Player();
    healthBar = new Health(player);
    
    obstacles = generateObstacles();
    
    camera.position.z = 5;
    
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', handleKeyDown, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function handleKeyDown(event) {
    switch (event.code) {
        case 'ArrowUp':
            player.moveForward();
            break;
        case 'ArrowDown':
            player.moveBackward();
            break;
        case 'ArrowLeft':
            player.moveLeft();
            break;
        case 'ArrowRight':
            player.moveRight();
            break;
        case 'Space':
            player.shoot();
            break;
    }
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    
    player.update();
    healthBar.update();
    
    renderer.render();
}

init();
gameLoop();