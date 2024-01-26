import { CelestialBody } from './CelestialBody.js';
import * as THREE from './three.module.js';

export class Moon extends CelestialBody{
    _getMaterial() {
        return new THREE.MeshStandardMaterial(
            {
                map: this._map,
                bumpMap: this._bumpMap,
                bumpScale: this._bumpScale,
            }
        );
    }
}
