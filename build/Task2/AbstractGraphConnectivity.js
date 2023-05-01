"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractGraphConnectivity {
    constructor(graph) {
        this._matrix = [];
        this._graph = graph;
        this._matrix = graph.adjacency_matrix();
    }
    BFS(begin, matrix = this._matrix) {
        let queue = [begin];
        let mark = [begin];
        while (queue.length !== 0) {
            let vertex = queue.shift();
            this._graph.adjacency_list(vertex, matrix).forEach(el => {
                if (mark.indexOf(el) === -1) {
                    queue.push(el);
                    mark.push(el);
                }
            });
        }
        return mark;
    }
    isConnectedness() {
        if (this.connectivityComponents().length === 1)
            return true;
        return false;
    }
    components(matrix = this._matrix) {
        let components = [];
        let mark = [];
        for (let i = 0; i < matrix.length; i++) {
            if (mark.indexOf(i) === -1) {
                let component = this.BFS(i, matrix);
                components.push(component);
                mark = [...mark, ...component];
            }
        }
        return components;
    }
}
exports.default = AbstractGraphConnectivity;
