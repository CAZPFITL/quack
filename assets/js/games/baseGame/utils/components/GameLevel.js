import {GAME_OVER, PLAY, COLORS} from "../../env.js";
import Map from '../entities/Map.js'
import Particle from '../entities/Particle.js'

const mapSize = {
    width: 200,
    height: 200
}
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
                    ...mapSize
                }
            },
            ...this.getParticles()
        ];
        this.load('entities');
    }

    getParticles() {
        const output = [];
        const particles = [
            {id: 'GREEN', color: COLORS['GREEN'][5], weight: 0.2, count: 100},
            {id: 'PURPLE', color: COLORS['PURPLE'][5], weight: 0.5, count: 50},
            {id: 'BLUE', color: COLORS['BLUE'][5], weight: 0.6, count: 20},
            {id: 'YELLOW', color: COLORS['YELLOW'][3], weight: 0.8, count: 10},
        ];

        particles.forEach((particle, index) => {
            for (let i = 0; i < particle.count; i++) {
                const {id, color, weight, speed} = particle;

                output.push({
                    name: 'Particle',
                    props: {
                        id,
                        app: this.app,
                        radius: 2,
                        color,
                        weight,
                        speed,
                        coords: {
                            x: this.app.tools.random(-mapSize.width / 2, mapSize.width / 2),
                            y: this.app.tools.random(-mapSize.height / 2, mapSize.height / 2)
                        }
                    }
                });
            }
        })

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