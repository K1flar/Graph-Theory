"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Graph_1 = __importDefault(require("../modules/Graph/Graph"));
const inputKeyManager_1 = __importDefault(require("../modules/input/inputKeyManager"));
const output_1 = __importDefault(require("../modules/output/output"));
const BridgesAndCutVertices_1 = __importDefault(require("./BridgesAndCutVertices"));
const main = () => {
    const keyManager = (0, inputKeyManager_1.default)();
    if (!keyManager) {
        console.log("Error");
        return;
    }
    if (keyManager.isHelp) {
        console.log("Author: Davydov Denis\n" +
            "About: MAI, M3O-219Bk-21\n" +
            "Key description:\n" +
            "   -e - defining a graph with a list of edges\n" +
            "   -m - defining a graph by an adjacency matrix\n" +
            "   -l - defining a graph by an adjacency list\n" +
            "   -o - outputting the result to a file\n" +
            "   -h - reference\n");
        return;
    }
    const graph = new Graph_1.default(keyManager.strategyReading);
    const bridgesAndCutVertices = new BridgesAndCutVertices_1.default(graph);
    const write = (0, output_1.default)(keyManager.outputFileName);
    write(`Bridges:\n[${bridgesAndCutVertices.bridges.map(el => `(${el[0]}, ${el[1]})`)}]\n`);
    write(`Cut vertices:\n[${bridgesAndCutVertices.vertices}]`);
};
main();
