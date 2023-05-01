"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractGraphCharacteristics_1 = __importDefault(require("./AbstractGraphCharacteristics"));
class DirectedGraphCharacteristics extends AbstractGraphCharacteristics_1.default {
    constructor(graph) {
        super(graph);
    }
    vertexDegrees() {
        let res = { input: [], output: [] };
        for (let i = 0; i < this._matrix.length; i++)
            res.input[i] = res.output[i] = 0;
        for (let i = 0; i < this._matrix.length; i++)
            for (let j = 0; j < this._matrix.length; j++) {
                res.input[j] += this._matrix[j][i] && 1;
                res.output[i] += this._matrix[i][j] && 1;
            }
        return res;
    }
}
exports.default = DirectedGraphCharacteristics;
