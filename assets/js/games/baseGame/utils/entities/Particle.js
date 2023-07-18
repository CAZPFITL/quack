import {PLAY} from "../../env.js";

export default class Particle {
    constructor({id, app, coords, color = '#000', speed}) {
        this.id = id;
        this.app = app;
        this.game = app.game;
        // Booleans
        this.no_update = false;
        this.no_draw = false;
        // Measurements
        this.color = color;
        this.coords = coords ?? {x: 0, y: 0};
        this.speed = {vx: 0, vy: 0};
        this.radius = 1;
    }

    draw(ctx) {
        if (!this.no_draw && this.app.game.state.state === PLAY) {
            // this.app.gui.get.drawPolygon(ctx, this);
            this.app.gui.get.drawCircle(ctx, this, true)
        }
    }
}