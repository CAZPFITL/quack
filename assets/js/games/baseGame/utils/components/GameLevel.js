import {GAME_OVER, PLAY, COLORS} from "../../env.js";
import Map from '../entities/Map.js'
import Particle from '../entities/Particle.js'
import Rule from '../entities/Rule.js'

const x = 2;

export default class GameLevel {
    rules = [];
    particles = [];
    mapSize = {
        width: 400,
        height: 250
    };
    particleList = [
        {name: 'GREEN', color: 0, qty: x},
        {name: 'GREEN', color: 1, qty: x},
        {name: 'GREEN', color: 2, qty: x},
        {name: 'GREEN', color: 3, qty: x},
        {name: 'GREEN', color: 4, qty: x},
        {name: 'GREEN', color: 5, qty: x},
        {name: 'GREEN', color: 6, qty: x},
        {name: 'GREEN', color: 7, qty: x},
        {name: 'GREEN', color: 8, qty: x},
        {name: 'GREEN', color: 9, qty: x},
        {name: 'PURPLE', color: 0, qty: x},
        {name: 'PURPLE', color: 1, qty: x},
        {name: 'PURPLE', color: 2, qty: x},
        {name: 'PURPLE', color: 3, qty: x},
        {name: 'PURPLE', color: 4, qty: x},
        {name: 'PURPLE', color: 5, qty: x},
        {name: 'PURPLE', color: 6, qty: x},
        {name: 'PURPLE', color: 7, qty: x},
        {name: 'PURPLE', color: 8, qty: x},
        {name: 'PURPLE', color: 9, qty: x},
        {name: 'BLUE', color: 0, qty: x},
        {name: 'BLUE', color: 1, qty: x},
        {name: 'BLUE', color: 2, qty: x},
        {name: 'BLUE', color: 3, qty: x},
        {name: 'BLUE', color: 4, qty: x},
        {name: 'BLUE', color: 5, qty: x},
        {name: 'BLUE', color: 6, qty: x},
        {name: 'BLUE', color: 7, qty: x},
        {name: 'BLUE', color: 8, qty: x},
        {name: 'BLUE', color: 9, qty: x},
        {name: 'YELLOW', color: 0, qty: x},
        {name: 'YELLOW', color: 1, qty: x},
        {name: 'YELLOW', color: 2, qty: x},
        {name: 'YELLOW', color: 3, qty: x},
        {name: 'YELLOW', color: 4, qty: x},
        {name: 'YELLOW', color: 5, qty: x},
        {name: 'YELLOW', color: 6, qty: x},
        {name: 'YELLOW', color: 7, qty: x},
        {name: 'YELLOW', color: 8, qty: x},
        {name: 'YELLOW', color: 9, qty: x},
        {name: 'PINK', color: 0, qty: x},
        {name: 'PINK', color: 1, qty: x},
        {name: 'PINK', color: 2, qty: x},
        {name: 'PINK', color: 3, qty: x},
        {name: 'PINK', color: 4, qty: x},
        {name: 'PINK', color: 5, qty: x},
        {name: 'PINK', color: 6, qty: x},
        {name: 'PINK', color: 7, qty: x},
        {name: 'PINK', color: 8, qty: x},
        {name: 'PINK', color: 9, qty: x}
    ];

    constructor({app, addedRules = []}) {
        this.frame = 0;
        this.app = app;
        this.game = app.game;
        this.addedRules = addedRules;
        this.classes = {
            Map,
            Particle,
        }
        this.gravityRange = app.tools.random(40, 90)
        this.randomFactor = app.tools.random(-0.5, 0.5)
        this.wallRepelStrength = app.tools.random(-0.5, 0.5)
        this.wallRepel = app.tools.random(-0.5, 0.5)
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

    createParticlesMap() {
        const output = [];
        const particles = Rule.createParticleList(this.particleList);
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
            const particlePairs = Rule.getCombinations(this.particleList);

            for (let i = 0; i < particlePairs.length; i++) {
                const p1 = particlePairs[i][0];
                const p2 = particlePairs[i][1];

                this.rules.push(this.app.factory.create(Rule, {
                    app: this.app,
                    world: this.mapSize,
                    p1: this.particles[p1],
                    p2: this.particles[p2],
                    g: this.app.tools.random(-this.randomFactor, this.randomFactor)
                }));
            }
        }

        if (type === 'particles') {
            const particlesMap = this.createParticlesMap()

            for (let particle of particlesMap) {
                const create = () => {
                    return this.app.factory.create(
                        this.classes[particle.name],
                        particle.props
                    );
                };

                if (!this.particles[particle.props.id]) {
                    this.particles[particle.props.id] = [];
                    this.particles[particle.props.id].push(create());
                } else {
                    this.particles[particle.props.id].push(create());
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

        if (this.frame < 100) {
            this.frame++
        } else {
            this.gravityRange = random(40, 90);
            this.randomFactor = random(-0.5, 0.5);
            this.wallRepelStrength = random(-0.5, 0.5);
            this.wallRepel = random(-0.5, 0.5);
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