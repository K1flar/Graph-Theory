"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const parseParams_1 = __importDefault(require("./parseParams"));
const parseAdjacencyMatrix_1 = __importDefault(require("./parseAdjacencyMatrix"));
const parseEdgesList_1 = __importDefault(require("./parseEdgesList"));
const parseAdjacencyList_1 = __importDefault(require("./parseAdjacencyList"));
const keyMatching = {
    "-e": "inputFileName",
    "-m": "inputFileName",
    "-l": "inputFileName",
    "-o": "outputFileName",
    "-h": "isHelp"
};
const strategy = {
    "-e": parseEdgesList_1.default,
    "-m": parseAdjacencyMatrix_1.default,
    "-l": parseAdjacencyList_1.default
};
const inputKeyManager = (matching = keyMatching) => {
    const params = (0, parseParams_1.default)();
    let res = {};
    res.isHelp = false;
    for (let { flag, value } of params) {
        if (!matching[flag])
            return null;
        let property = matching[flag];
        if (res[property])
            return null;
        if (property === "isHelp")
            res.isHelp = true;
        if (property === "inputFileName") {
            res.inputFileName = `../../tests/${value}`;
            try {
                const text = fs.readFileSync(res.inputFileName, "utf-8").trim();
                res.strategyReading = strategy[flag](text);
            }
            catch (err) {
                return null;
            }
        }
        if (property === "outputFileName")
            res.outputFileName = value;
    }
    return res;
};
exports.default = inputKeyManager;
