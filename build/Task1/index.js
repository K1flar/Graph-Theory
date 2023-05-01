"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Graph_1 = __importDefault(require("../modules/Graph/Graph"));
const inputKeyManager_1 = __importDefault(require("../modules/input/inputKeyManager"));
const output_1 = __importDefault(require("../modules/output/output"));
const DirectedGraphCharacteristics_1 = __importDefault(require("./DirectedGraphCharacteristics"));
const GraphCharacteristics_1 = __importDefault(require("./GraphCharacteristics"));
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
    const graphCharacteristics = graph.is_directed() ? new DirectedGraphCharacteristics_1.default(graph) : new GraphCharacteristics_1.default(graph);
    const write = (0, output_1.default)(keyManager.outputFileName);
    if (graph.is_directed())
        write(`deg+ = [ ${graphCharacteristics.vertexDegrees().input} ]\ndeg- = [ ${graphCharacteristics.vertexDegrees().output} ]\n`);
    else
        write(`deg = [ ${graphCharacteristics.vertexDegrees()} ]\n`);
    write(`Distancies: \n${graphCharacteristics.distanceMatrix.map(str => str.map(el => (el === Infinity ? "∞" : el)).join(" ")).join("\n")} \n`);
    if (graphCharacteristics.isConnected()) {
        write(`Eccentricity: [ ${graphCharacteristics.eccentricities()} ]\n`);
        if (!graph.is_directed()) {
            write(`D = ${graphCharacteristics.diameter()} \nR = ${graphCharacteristics.radius()} \n`);
            write(`Z = [ ${graphCharacteristics.centralNodes()} ]\nP = [ ${graphCharacteristics.peripheralNodes()} ]\n`);
        }
    }
};
main();
