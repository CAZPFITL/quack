import {GAME_OVER, PLAY} from "../../env.js";

export default class Map {
    constructor({app, id = 0, width, height, addedRules}) {
        this.app = app;
        this.game = app.game;
        this.name = 'GameLevel #' + id;
        this.coords = {x: -width / 2, y: -height / 2};
        this.size = {width, height}
        this.color = '#05070D';
    }

    update() {}

    draw() {
        if (this.app.game.state.state === PLAY ||
            this.app.game.state.state === GAME_OVER) {
            // TODO change this to get the level
            this.app.gui.ctx.fillStyle = this.color;
            this.app.gui.ctx.fillRect(this.coords.x, this.coords.y, this.size.width, this.size.height);
        }
    }
}