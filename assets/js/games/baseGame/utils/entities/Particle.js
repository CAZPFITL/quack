import {GAME_OVER, PLAY} from "../../env.js";

export default class Particle {
    constructor({id, app, coords = {x: 0, y: 0}, color = '#000', radius = 1, weight, speed}) {
        this.id = id;
        this.app = app;
        this.game = app.game;
        // Booleans
        this.no_update = false;
        this.no_draw = false;
        // Measurements
        this.color = color;
        this.coords = coords;
        this.speed = speed ?? {vx: this.app.tools.random(-2,2), vy: this.app.tools.random(-2,2)};
        this.radius = radius;
        this.weight = weight;
        this.thresholdDistance = 1.5 * weight;
    }

    distanceTo(particle) {
        const dx = this.coords.x - particle.coords.x;
        const dy = this.coords.y - particle.coords.y;
        return Math.sqrt(dx * dx + dy * dy);
    }


    update() {
        if (!this.no_update && this.app.game.state.state === PLAY || this.app.game.state.state === GAME_OVER) {
            const particlesInRange = this.app.factory.binnacle.Particle.filter(particle =>
                this.distanceTo(particle) <= this.thresholdDistance
            );

            const totalWeight = particlesInRange.reduce((sum, particle) => sum + particle.weight, 0);

            let sumWeightedSpeedX = 0;
            let sumWeightedSpeedY = 0;

            particlesInRange.forEach(particle => {
                const weightRatio = (particle.weight !== 0) ? particle.weight / totalWeight : 0;
                sumWeightedSpeedX += particle.speed.vx * weightRatio;
                sumWeightedSpeedY += particle.speed.vy * weightRatio;
            });

            const averageSpeedX = sumWeightedSpeedX;
            const averageSpeedY = sumWeightedSpeedY;

            this.speed.vx = averageSpeedX;
            this.speed.vy = averageSpeedY;

            const newCoordX = this.coords.x + this.speed.vx;
            const newCoordY = this.coords.y + this.speed.vy;

            const size = this.app.factory.binnacle.Map[0].size;

            if (newCoordX <= -size.width / 2 || newCoordX >= size.width / 2) {
                this.speed.vx *= -1;
            }
            if (newCoordY <= -size.height / 2 || newCoordY >= size.height / 2) {
                this.speed.vy *= -1;
            }

            this.coords.x = Math.max(-size.width, Math.min(size.width, newCoordX));
            this.coords.y = Math.max(-size.height, Math.min(size.height, newCoordY));
        }
    }

    draw(ctx) {
        if (!this.no_draw && this.app.game.state.state === PLAY) {
            // this.app.gui.get.drawPolygon(ctx, this);
            this.app.gui.get.drawCircle(ctx, this, true)
        }
    }
}