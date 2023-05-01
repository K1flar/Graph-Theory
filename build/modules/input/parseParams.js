"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseParams = () => {
    const argv = process.argv;
    let params = [];
    for (let i = 0; i < argv.length; i++) {
        if (argv[i][0] === "-") {
            let param = { flag: argv[i], value: undefined };
            if (argv[i + 1] && argv[i + 1][0] !== "-")
                param.value = argv[i + 1];
            params.push(param);
        }
    }
    return params;
};
exports.default = parseParams;
