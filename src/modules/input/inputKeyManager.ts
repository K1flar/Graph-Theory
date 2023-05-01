const fs = require("fs")

import parseParams from "./parseParams"

import parseAdjacencyMatrix from "./parseAdjacencyMatrix"
import parseEdgesList from "./parseEdgesList"
import parseAdjacencyList from "./parseAdjacencyList"

const keyMatching: KeyMatching = {
    "-e": "inputFileName",
    "-m": "inputFileName",
    "-l": "inputFileName",
    "-o": "outputFileName",
    "-h": "isHelp"
}

const strategy: Strategy = {
    "-e": parseEdgesList,
    "-m": parseAdjacencyMatrix,
    "-l": parseAdjacencyList
}

const inputKeyManager = <T extends IinputKeyManager = IinputKeyManager>(matching: KeyMatching<T> = keyMatching): T | null => {
    const params: Param[] = parseParams()
    let res: T = {} as T
    res.isHelp = false

    for(let {flag, value} of params) {
        if (!matching[flag]) return null
        let property: keyof T = matching[flag]
        if (res[property]) return null

        if (property === "isHelp") res.isHelp = true
        if (property === "inputFileName") {
            res.inputFileName = `../../tests/${value}`
            try {
                const text: string = fs.readFileSync(res.inputFileName, "utf-8").trim()
                res.strategyReading = strategy[flag](text)
            } catch(err) {
                return null
            }
        }
        if (property === "outputFileName") res.outputFileName = value
    }

    return res
}

export default inputKeyManager