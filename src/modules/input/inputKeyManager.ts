const fs = require("fs")

import parseParams from "./parseParams"

import parseAdjacencyMatrix from "./parseAdjacencyMatrix"
import parseEdgesList from "./parseEdgesList"
import parseAdjacencyList from "./parseAdjacencyList"

class InputKeyManager {
    public readonly inputFileName?: string
    public readonly strategyReading?: () => number[][]
    public readonly outputFileName?: string
    public readonly isHelp?: boolean

    protected params: Param[] = []

    private readonly strategy: Strategy = {
        "-e": parseEdgesList,
        "-m": parseAdjacencyMatrix,
        "-l": parseAdjacencyList
    }

    constructor() {
        this.params = parseParams()

        for (let { flag, value } of this.params) {
            if (flag === "-h") this.isHelp = true

            if (flag === "-e" || flag === "-m" || flag === "-l") {
                if (this.inputFileName) {
                    this.inputFileName = undefined
                    break
                }
                this.inputFileName = `../../tests/${value}`
                try {
                    const text: string = fs.readFileSync(this.inputFileName, "utf-8").trim()
                    this.strategyReading = this.strategy[flag](text)
                } catch (err) {
                    throw "Error"
                }
            }

            if (flag === "-o") this.outputFileName = value
        }
    }
}

export default InputKeyManager