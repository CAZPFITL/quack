export default class Rule {
    constructor({app, p1, p2, g}) {
        this.app = app;
        this.particles1 = p1;
        this.particles2 = p2;
        this.g = g;
    }

    distanceBetween(particle1, particle2) {
        const dx = particle1.coords.x - particle2.coords.x;
        const dy = particle1.coords.y - particle2.coords.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        return {dx, dy, d}
    }

    rule() {
        const level = this.app.game.level;
        const canvas = level.mapSize;

        for (let i = 0; i < this.particles1.length; i++) {
            let a = this.particles1[i]
            let b
            let fx = 0
            let fy = 0
            for (let j = 0; j < this.particles2.length; j++) {
                b = this.particles2[j]
                let {dx, dy, d} = this.distanceBetween(a, b)

                if (d > 0 && d < level.gravityRange) {
                    let F = this.g / Math.sqrt(d);
                    fx += F * dx;
                    fy += F * dy;
                }
            }

            const d = level.wallRepel
            const strength = level.wallRepelStrength

            // Left
            if (a.coords.x <= -((canvas.width / 2) - d)) {
                fx += (canvas.width / 2 - d - a.coords.x) * strength
            }
            // Right
            if (a.coords.x >= (canvas.width / 2) - d) {
                fx += (-canvas.width / 2 - d - a.coords.x) * strength
            }
            // Top
            if (a.coords.y <= -((canvas.height / 2) - d)) {
                fy += (canvas.height / 2 - d - a.coords.y) * strength
            }
            // Bottom
            if (a.coords.y >= (canvas.height / 2) - d) {
                fy += (-canvas.height / 2 - d - a.coords.y) * strength
            }

            a.speed.vx = (a.speed.vx + fx) * 0.1
            a.speed.vy = (a.speed.vy + fy) * 0.1
            a.coords.x += a.speed.vx
            a.coords.y += a.speed.vy


        }
    }

    update() {
        if (this.app.game.state.state === 'PLAY') {
            this.rule()
        }
    }
}