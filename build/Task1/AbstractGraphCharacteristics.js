"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractGraphCharacteristics {
    constructor(graph) {
        this._matrix = [];
        this._distanceMatrix = [];
        this._graph = graph;
        this._matrix = graph.adjacency_matrix();
        this._distanceMatrix = this.algFloydWarshall();
    }
    get distanceMatrix() {
        let res = [];
        for (let i = 0; i < this._distanceMatrix.length; i++) {
            res[i] = [];
            for (let j = 0; j < this._distanceMatrix.length; j++)
                res[i][j] = this._distanceMatrix[i][j];
        }
        return res;
    }
    algFloydWarshall() {
        let matrix = this._graph.adjacency_matrix();
        for (let i = 0; i < matrix.length; i++)
            for (let j = 0; j < matrix.length; j++)
                if (!matrix[i][j] && i !== j)
                    matrix[i][j] = Infinity;
        for (let k = 0; k < matrix.length; k++)
            for (let i = 0; i < matrix.length; i++)
                for (let j = 0; j < matrix.length; j++)
                    if (matrix[i][k] + matrix[k][j] < matrix[i][j])
                        matrix[i][j] = matrix[i][k] + matrix[k][j];
        return matrix;
    }
    isConnected() {
        for (let i = 0; i < this._distanceMatrix.length; i++)
            for (let j = 0; j < this._distanceMatrix.length; j++)
                if (this._distanceMatrix[i][j] === Infinity)
                    return false;
        return true;
    }
    eccentricities() {
        if (!this.isConnected())
            return null;
        return this._distanceMatrix.map(e => Math.max(...e));
    }
}
exports.default = AbstractGraphCharacteristics;
