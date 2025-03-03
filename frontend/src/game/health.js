class Health {
    constructor(initialHealth) {
        this.maxHealth = initialHealth;
        this.currentHealth = initialHealth;
        this.healthBarElement = this.createHealthBar();
    }

    createHealthBar() {
        const healthBar = document.createElement('div');
        healthBar.style.width = '100%';
        healthBar.style.height = '20px';
        healthBar.style.backgroundColor = 'red';
        document.body.appendChild(healthBar);
        return healthBar;
    }

    updateHealth(amount) {
        this.currentHealth = Math.max(0, Math.min(this.maxHealth, this.currentHealth + amount));
        this.renderHealthBar();
    }

    renderHealthBar() {
        const healthPercentage = (this.currentHealth / this.maxHealth) * 100;
        this.healthBarElement.style.width = healthPercentage + '%';
        this.healthBarElement.style.backgroundColor = healthPercentage > 30 ? 'green' : 'orange';
    }

    isAlive() {
        return this.currentHealth > 0;
    }
}

export default Health;