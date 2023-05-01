"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractGraphCharacteristics_1 = __importDefault(require("./AbstractGraphCharacteristics"));
class GraphCharacteristics extends AbstractGraphCharacteristics_1.default {
    constructor(graph) {
        super(graph);
    }
    vertexDegrees() {
        let res = [];
        for (let i = 0; i < this._matrix.length; i++)
            res[i] = 0;
        for (let i = 0; i < this._matrix.length; i++)
            for (let j = 0; j < this._matrix.length; j++)
                res[i] += this._matrix[i][j] && 1;
        return res;
    }
    diameter() {
        if (!this.isConnected())
            return null;
        return Math.max(...this.eccentricities());
    }
    radius() {
        if (!this.isConnected())
            return null;
        return Math.min(...this.eccentricities());
    }
    centralNodes() {
        if (!this.isConnected())
            return null;
        let res = [];
        let eccentricities = this.eccentricities();
        let radius = this.radius();
        for (let i = 0; i < eccentricities.length; i++)
            if (eccentricities[i] === radius)
                res.push(i + 1);
        return res;
    }
    peripheralNodes() {
        if (!this.isConnected())
            return null;
        let res = [];
        let eccentricities = this.eccentricities();
        let diameter = this.diameter();
        for (let i = 0; i < eccentricities.length; i++)
            if (eccentricities[i] === diameter)
                res.push(i + 1);
        return res;
    }
}
exports.default = GraphCharacteristics;
