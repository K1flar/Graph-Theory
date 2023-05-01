"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Graph_1 = __importDefault(require("../modules/Graph/Graph"));
const inputKeyManager_1 = __importDefault(require("../modules/input/inputKeyManager"));
const output_1 = __importDefault(require("../modules/output/output"));
const DirectedGraphConnectivity_1 = __importDefault(require("./DirectedGraphConnectivity"));
const GraphConnectivity_1 = __importDefault(require("./GraphConnectivity"));
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
    const graphConnectivity = graph.is_directed() ? new DirectedGraphConnectivity_1.default(graph) : new GraphConnectivity_1.default(graph);
    const write = (0, output_1.default)(keyManager.outputFileName);
    if (graph.is_directed()) {
        if (graphConnectivity.isConnectedness())
            write("Digraph is connected.\n");
        else
            write(`Digraph is not connected and contains ${graphConnectivity.connectivityComponents().length} connected components.\n`);
        write(`Connected components:\n[${graphConnectivity.connectivityComponents().map(el => `[${el}]`)}]\n`);
        if (graphConnectivity.isConnectedness()) {
            if (graphConnectivity.isStronglyConnected())
                write(`Digraph is strongly connected.\n`);
            else
                write(`Digraph is weakly connected and contains ${graphConnectivity.stronglyConnectedComponents().length} strongly connected components.\n`);
            write(`Strongly connected components:\n[${graphConnectivity.stronglyConnectedComponents().map(el => `[${el}]`)}]`);
        }
    }
    else {
        if (graphConnectivity.isConnectedness())
            write("Graph is connected.\n");
        else
            write(`Graph is not connected and contains ${graphConnectivity.connectivityComponents().length} connected components.\n`);
        write(`Connected components:\n[${graphConnectivity.connectivityComponents().map(el => `[${el}]`)}]`);
    }
};
main();
