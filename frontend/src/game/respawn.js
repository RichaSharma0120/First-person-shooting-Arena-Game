export function handleRespawn(player) {
    // Reset player position to a random spawn point in the arena
    const spawnPoints = [
        { x: -10, y: 0, z: -10 },
        { x: 10, y: 0, z: -10 },
        { x: -10, y: 0, z: 10 },
        { x: 10, y: 0, z: 10 },
        { x: 0, y: 0, z: 0 }
    ];
    
    const randomIndex = Math.floor(Math.random() * spawnPoints.length);
    const spawnPoint = spawnPoints[randomIndex];

    player.position.set(spawnPoint.x, spawnPoint.y, spawnPoint.z);
    player.health = 100; // Reset health
    player.isAlive = true; // Set player status to alive

    // Optionally, you can add a brief invincibility period
    setTimeout(() => {
        player.isInvincible = false; // Player can be hit again after respawn
    }, 3000); // 3 seconds of invincibility
}