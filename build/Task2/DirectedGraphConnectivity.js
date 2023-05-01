"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractGraphConnectivity_1 = __importDefault(require("./AbstractGraphConnectivity"));
class DirectedGraphConnectivity extends AbstractGraphConnectivity_1.default {
    constructor(graph) {
        super(graph);
    }
    connectivityComponents() {
        return this.components(this._graph.relatedGraphAdjacencyMatrix());
    }
    isStronglyConnected() {
        if (this.stronglyConnectedComponents().length === 1)
            return true;
        return false;
    }
    stronglyConnectedComponents() {
        return this.algKosaraju();
    }
    algKosaraju() {
        let components = [];
        // инвертирование дуг 
        let invertedMatrix = [];
        for (let i = 0; i < this._matrix.length; i++) {
            invertedMatrix[i] = [];
            for (let j = 0; j < this._matrix.length; j++)
                invertedMatrix[i][j] = this._matrix[j][i];
        }
        let marked = []; // посещенные вершины
        let tout = []; // время выхода из каждой вершины
        for (let i = 0; i < this._matrix.length; i++)
            if (marked.indexOf(i) === -1)
                this.DFS(i, marked, invertedMatrix, tout);
        tout = tout.reverse();
        marked = [];
        let lastLength = 0;
        for (let i = 0; i < tout.length; i++) {
            if (marked.indexOf(tout[i]) === -1) {
                this.DFS(tout[i], marked);
                let component = marked.slice(lastLength);
                lastLength = marked.length;
                components.push(component);
            }
        }
        return components;
    }
    DFS(vertex, marked, matrix = this._matrix, tout) {
        marked.push(vertex);
        this._graph.adjacency_list(vertex, matrix).forEach(el => {
            if (marked.indexOf(el) === -1)
                this.DFS(el, marked, matrix, tout);
        });
        tout === null || tout === void 0 ? void 0 : tout.push(vertex);
    }
}
exports.default = DirectedGraphConnectivity;
