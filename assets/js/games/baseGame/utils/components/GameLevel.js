import {GAME_OVER, PLAY, COLORS} from "../../env.js";
import Map from '../entities/Map.js'
import Particle from '../entities/Particle.js'

export default class GameLevel {
    constructor({app, addedRules = []}) {
        this.app = app;
        this.game = app.game;
        this.addedRules = addedRules;
        this.classes = {
            Map,
            Particle,
        }
        this.loadEntitiesList = [
            {
                name: 'Map',
                props: {
                    app: app,
                    level: this,
                    width: 500,
                    height: 500
                }
            },
            ...this.getParticles()
        ];
        this.load('entities');
    }

    getParticles() {
        const output = [];
        const colors = [
            {id: 'GREEN', color: COLORS['GREEN'][5], weight: 1},
            {id: 'PURPLE', color: COLORS['PURPLE'][5], weight: 2},
            {id: 'BLUE', color: COLORS['BLUE'][5], weight: 3},
            {id: 'YELLOW', color: COLORS['YELLOW'][3], weight: 4},
        ];

        const total = 3000;
        const divisions = 4;
        const numbersPerDivision = Math.floor(total / divisions);

        for (let i = 0; i < divisions; i++) {
            const index = i % colors.length;
            const {id, color} = colors[index];

            for (let j = 0; j < numbersPerDivision; j++) {
                output.push({
                    name: 'Particle',
                    props: {
                        id,
                        app: this.app,
                        radius: 2,
                        color,
                        coords: {
                            x: this.app.tools.random(-200, 200),
                            y: this.app.tools.random(-200, 200)
                        }
                    }
                });
            }
        }

        return output;
    }

    /**
     * Load methods
     */
    load(type) {
        if (type === 'entities') {
            for (let entity of this?.loadEntitiesList) {
                entity?.name && this.app.factory.create(this.classes[entity.name], entity.props);
            }
        }
        if (type === 'rules') {
            for (let rule of this.addedRules) {
                if (this.app.factory.binnacle[rule.name]) {
                    this.app.factory.binnacle[rule.name].forEach(entity => {
                        if (entity instanceof Array) return;
                        rule?.rule(entity);
                    })
                }
            }
        }
    }

    update() {
        this.load('rules');
    }

    /**
     * Draw and Update methods
     */
    draw() {
        if (this.app.game.state.state === PLAY ||
            this.app.game.state.state === GAME_OVER) {
        }
    }
}