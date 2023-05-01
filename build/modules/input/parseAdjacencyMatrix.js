"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseAdjacencyMatrix = (text) => {
    return () => {
        let matrix = [];
        let parts = text.split('\n');
        let n = parts.length;
        for (let i = 0; i < n; i++) {
            let row = parts[i].trim().split(' ');
            matrix[i] = row.map(e => parseInt(e));
        }
        return matrix;
    };
};
exports.default = parseAdjacencyMatrix;
