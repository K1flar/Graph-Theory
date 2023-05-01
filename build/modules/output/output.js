"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const output = (outputFileName) => {
    if (outputFileName) {
        return (data) => fs.appendFileSync(outputFileName, data);
    }
    else {
        return (data) => console.log(data);
    }
};
exports.default = output;
