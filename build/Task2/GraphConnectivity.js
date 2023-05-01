"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractGraphConnectivity_1 = __importDefault(require("./AbstractGraphConnectivity"));
class GraphConnectivity extends AbstractGraphConnectivity_1.default {
    constructor(graph) {
        super(graph);
    }
    connectivityComponents() {
        return this.components();
    }
}
exports.default = GraphConnectivity;
