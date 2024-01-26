import * as THREE from './three.module.js';

export class Orbit {

    #center;
    #radiusX;
    #radiusY;
    #starts;

    constructor(
        center,
        radiusX,
        radiusY,
        starts
    ) {
        this.#center = center;
        this.#radiusX = radiusX;
        this.#radiusY = radiusY;
        this.#starts = starts;
    }

    create() {
        const orbit = new THREE.Line( 
            this.#getGeometryCurve(),
            this.#getMaterial()
        );

        orbit.rotateX(-Math.PI/2);

        return orbit;
    }

    getOrbitPoint(t) {
        return this.#getEllipseCurve().getPoint(t);
    }

    #getEllipseCurve() {
        return new THREE.EllipseCurve(
            this.#center[0],
            this.#center[1],
            this.#radiusX,
            this.#radiusY,
            this.#starts
        );
    }

    #getGeometryCurve() {
        const points = this.#getEllipseCurve().getSpacedPoints(200);

        return new THREE.BufferGeometry().setFromPoints(points);
    }

    #getMaterial() {
        return new THREE.LineBasicMaterial({
            color:0x333333,
            transparent:true,
            opacity:0.5
        });
    }
}