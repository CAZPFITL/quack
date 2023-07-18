import {GAME_OVER, PLAY, COLORS} from "../../env.js";
import Map from '../entities/Map.js'
import Particle from '../entities/Particle.js'
import Rule from '../entities/Rule.js'

export default class GameLevel {
    rules = [];
    particles = [];
    gravityRange = 40;
    randomFactor = 0.5;
    wallRepelStrength = 0.5;
    wallRepel = 0.5;
    mapSize = {
        width: 800,
        height: 600
    };

    constructor({app, addedRules = []}) {
        this.frame = 0;
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
                    ...this.mapSize
                }
            }
        ];
        this.load('entities');
        this.load('particles');
        this.load('rules');
        this.load('particles_rules');
    }

    getParticles() {
        const output = [];

        const particles = [
            {id: 'GREEN', color: COLORS['GREEN'][5], count: 700},
            {id: 'PURPLE', color: COLORS['PURPLE'][5], count: 700},
            {id: 'BLUE', color: COLORS['BLUE'][5], count: 700},
            {id: 'YELLOW', color: COLORS['YELLOW'][3], count: 700},
        ];

        particles.forEach((particle, index) => {
            for (let i = 0; i < particle.count; i++) {
                const {id, color} = particle;

                output.push({
                    name: 'Particle',
                    props: {
                        id,
                        app: this.app,
                        color,
                        coords: {
                            x: this.app.tools.random(-this.mapSize.width / 2, this.mapSize.width / 2),
                            y: this.app.tools.random(-this.mapSize.height / 2, this.mapSize.height / 2)
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
        if (type === 'particles_rules') {
            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['YELLOW'],
                p2: this.particles['BLUE'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['YELLOW'],
                p2: this.particles['PURPLE'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['YELLOW'],
                p2: this.particles['GREEN'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['YELLOW'],
                p2: this.particles['YELLOW'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            //-------------------------------------------------------

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['BLUE'],
                p2: this.particles['YELLOW'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['BLUE'],
                p2: this.particles['PURPLE'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['BLUE'],
                p2: this.particles['GREEN'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['BLUE'],
                p2: this.particles['BLUE'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            //-------------------------------------------------------

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['PURPLE'],
                p2: this.particles['BLUE'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['PURPLE'],
                p2: this.particles['YELLOW'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['PURPLE'],
                p2: this.particles['GREEN'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['PURPLE'],
                p2: this.particles['PURPLE'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            //-------------------------------------------------------

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['GREEN'],
                p2: this.particles['YELLOW'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['GREEN'],
                p2: this.particles['BLUE'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['GREEN'],
                p2: this.particles['PURPLE'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))

            this.rules.push(this.app.factory.create(Rule, {
                app: this.app,
                world: this.mapSize,
                p1: this.particles['GREEN'],
                p2: this.particles['GREEN'],
                g: this.app.tools.random(-this.randomFactor, this.randomFactor)
            }))
        }

        if (type === 'particles') {
            const particlesMap = this.getParticles()
            for (let particle of particlesMap) {
                const create = () => {
                    return this.app.factory.create(
                        this.classes[particle.name],
                        particle.props
                    );
                }
                if (!this.particles[particle.props.id]) {
                    this.particles[particle.props.id] = []
                    this.particles[particle.props.id].push(create())
                } else {
                    this.particles[particle.props.id].push(create())
                }
            }
        }

        if (type === 'entities') {
            for (let entity of this?.loadEntitiesList) {
                entity?.name && this.app.factory.create(
                    this.classes[entity.name],
                    entity.props
                );
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
        const random = this.app.tools.random;

        if (this.frame < 300) {
            this.frame++
        } else {
            this.gravityRange = random(40, 80);
            this.randomFactor = random(0.1, 0.8);
            this.wallRepelStrength = random(0.1, 0.8);
            this.wallRepel = random(0.1, 0.8);
            for (let i = 0; i < this.rules.length; i++) {
                this.rules[i].g = random(-this.randomFactor, this.randomFactor)
                this.frame = 0
            }
            this.frame = 0
        }
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