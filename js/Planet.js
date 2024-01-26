import * as THREE from './three.module.js';
import { CelestialBody } from './CelestialBody.js'


export class Planet extends CelestialBody{

    #tilt = 0;
    #specularMap;
    #shininess;

    constructor(
        radius,
        segmentsTop,
        segmentsBottom,
        map,
        bumpMap,
        bumpScale,
        specularMap,
        shininess,
        tilt
    ) {
        super(
            radius,
            segmentsTop,
            segmentsBottom,
            map,
            bumpMap,
            bumpScale,
        );

        this.#specularMap = specularMap;
        this.#shininess = shininess;
        this.#tilt = tilt;
    }
    
    create() {
        let planet = new THREE.Mesh(
            this._getGeometry(),
            this._getMaterial()
        )

        if (this.#tilt > 0) {
            planet.rotation.z = this.#tilt;
        }

        return planet;
    }

    _getGeometry() {
        return new THREE.SphereGeometry(
            this._radius,
            this._segmentsTop,
            this._segmentsBottom
        );
    }

    _getMaterial() {
        return new THREE.MeshPhongMaterial(
            {
                map: this._map,
                bumpMap: this._bumpMap,
                bumpScale: this._bumpScale,
                specularMap: this.#specularMap,
                shininess: this.#shininess
            }
        );
    }
}
