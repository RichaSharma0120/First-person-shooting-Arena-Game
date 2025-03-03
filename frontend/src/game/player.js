class Player {
    constructor(id, position) {
        this.id = id;
        this.position = position; // { x: number, y: number, z: number }
        this.health = 100; // Player starts with full health
        this.isAlive = true;
    }

    move(direction) {
        if (!this.isAlive) return;
        // Update position based on direction
        this.position.x += direction.x;
        this.position.y += direction.y;
        this.position.z += direction.z;
    }

    shoot() {
        if (!this.isAlive) return;
        // Implement shooting logic
        console.log(`${this.id} shoots!`);
    }

    takeDamage(amount) {
        if (!this.isAlive) return;
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
    }

    die() {
        this.isAlive = false;
        console.log(`${this.id} has died.`);
        // Trigger respawn logic
    }

    respawn(position) {
        this.position = position;
        this.health = 100;
        this.isAlive = true;
        console.log(`${this.id} has respawned.`);
    }
}

export default Player;