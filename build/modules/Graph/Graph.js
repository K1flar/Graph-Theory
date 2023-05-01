"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Graph {
    constructor(strategyReading) {
        this._matrix = [];
        this._matrix = strategyReading();
    }
    weight(vi, vj) {
        return (this.is_edge(vi, vj) ? this._matrix[vi][vj] : Infinity);
    }
    is_edge(vi, vj) {
        if (vi >= this._matrix.length || vi < 0 || vj >= this._matrix.length || vj < 0)
            return false;
        return Boolean(this._matrix[vi][vj]);
    }
    adjacency_matrix() {
        return JSON.parse(JSON.stringify(this._matrix));
    }
    adjacency_list(v, matrix = this._matrix) {
        let res = [];
        for (let i = 0; i < matrix.length; i++)
            if (matrix[v][i])
                res.push(i);
        return res;
    }
    list_of_edges(v = undefined) {
        let res = [];
        for (let i = v || 0; i <= (v || this._matrix.length - 1); i++)
            for (let j = 0; j < this._matrix.length; j++)
                if (this.is_edge(i, j))
                    res.push([i, j]);
        return res;
    }
    is_directed() {
        for (let i = 0; i < this._matrix.length; i++)
            for (let j = 0; j < this._matrix.length; j++)
                if (this._matrix[i][j] !== this._matrix[j][i])
                    return true;
        return false;
    }
    relatedGraphAdjacencyMatrix() {
        var _a;
        if (!this.is_directed())
            return this._matrix;
        let matrix = this.adjacency_matrix();
        for (let i = 0; i < matrix.length; i++)
            for (let j = 0; j < matrix.length; j++)
                (_a = matrix[i])[j] || (_a[j] = matrix[j][i]);
        return matrix;
    }
}
exports.default = Graph;
