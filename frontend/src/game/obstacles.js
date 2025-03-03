import * as THREE from 'three';

export function generateObstacles(scene, count) {
    const obstacles = [];
    const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
    const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    for (let i = 0; i < count; i++) {
        const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
        obstacle.position.set(
            (Math.random() - 0.5) * 50, // Random x position
            0.5, // Height above ground
            (Math.random() - 0.5) * 50  // Random z position
        );
        scene.add(obstacle);
        obstacles.push(obstacle);
    }

    return obstacles;
}

export function destroyObstacle(obstacle) {
    obstacle.parent.remove(obstacle);
}