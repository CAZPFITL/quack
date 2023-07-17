import {GAME_OVER, PLAY} from "../../env.js";

export default class Particle {
    constructor({id, app, coords = {x: 0, y: 0}, color = '#000', radius = 1}) {
        this.id = id;
        this.app = app;
        this.game = app.game;
        // Booleans
        this.no_update = false;
        this.no_draw = false;
        // Measurements
        this.color = color;
        this.coords = coords;
        this.speed = {vx: 0, vy: 0};
        this.radius = radius;
    }

    #move() {
        // update referencable data

        // Make Move
        this?.app?.physics?.move(this)
    }

    #highlight() {
        this.color = (this.app.player.entity === this) ? 'rgb(25,203,159)' : 'rgba(0,0,0,0.35)';
    }

    shape() {

    }

    update() {
        if (!this.no_update && this.app.game.state.state === PLAY || this.app.game.state.state === GAME_OVER) {
            // this.app.gui.get.createPolygon(this);
            // this.#move();
            // this.#highlight();
        }
    }

    draw(ctx) {
        if (!this.no_draw && this.app.game.state.state === PLAY) {
            // this.app.gui.get.drawPolygon(ctx, this);
            this.app.gui.get.drawCircle(ctx, this,  true)
        }
    }
}