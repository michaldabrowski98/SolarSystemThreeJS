import * as THREE from './three.module.js';

export class CelestialBody {
    _radius;
    _segmentsTop;
    _segmentsBottom;
    _map = null;
    _bumpMap = null;
    _bumpScale = null;

    constructor (
        radius,
        segmentsTop,
        segmentsBottom,
        map,
        bumpMap,
        bumpScale
    ) {
        this._radius = radius;
        this._segmentsTop = segmentsTop;
        this._segmentsBottom = segmentsBottom;
        this._map = map;
        this._bumpMap = bumpMap;
        this._bumpScale = bumpScale;

    }

    create() {
        return new THREE.Mesh(
            this._getGeometry(),
            this._getMaterial()
        )
    }

    _getGeometry() {
        return new THREE.SphereGeometry(
            this._radius,
            this._segmentsTop,
            this._segmentsBottom
        );
    }

    _getMaterial() {
        this._map.wrapS =THREE.ReapeatWrapping ;
        this._map.wrapT =THREE.ReapeatWrapping ;
        return new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: this._map
        });
    }
}