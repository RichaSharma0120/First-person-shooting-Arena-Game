class Renderer {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.players = [];
        this.obstacles = [];
    }

    addPlayer(player) {
        this.players.push(player);
        this.scene.add(player.model);
    }

    addObstacle(obstacle) {
        this.obstacles.push(obstacle);
        this.scene.add(obstacle.model);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    update() {
        this.players.forEach(player => player.update());
        this.obstacles.forEach(obstacle => obstacle.update());
    }

    clear() {
        this.players.forEach(player => this.scene.remove(player.model));
        this.obstacles.forEach(obstacle => this.scene.remove(obstacle.model));
        this.players = [];
        this.obstacles = [];
    }
}

export default Renderer;