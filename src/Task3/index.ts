import Graph from "../modules/Graph/Graph"
import InputKeyManager from "../modules/input/InputKeyManager"
import output from "../modules/output/output"
import BridgesAndCutVertices from "./BridgesAndCutVertices"

const main = (): void => {
    const keyManager: InputKeyManager = new InputKeyManager()

    if (keyManager.isHelp) {
        console.log(
            "Author: Davydov Denis\n" +
            "About: MAI, M3O-219Bk-21\n" + 
            "Key description:\n" +
            "   -e - defining a graph with a list of edges\n" + 
            "   -m - defining a graph by an adjacency matrix\n" + 
            "   -l - defining a graph by an adjacency list\n" + 
            "   -o - outputting the result to a file\n" + 
            "   -h - reference\n"
        )
        return
    }

    if (!keyManager.inputFileName || !keyManager.strategyReading) {
        console.log("Error")
        return
    }

    const graph: Graph = new Graph(keyManager.strategyReading)

    const bridgesAndCutVertices: BridgesAndCutVertices = new BridgesAndCutVertices(graph)

    const write = output(keyManager.outputFileName)
    
    write(`Bridges:\n[${bridgesAndCutVertices.bridges.map(el => `(${el[0]}, ${el[1]})`)}]\n`)
    write(`Cut vertices:\n[${bridgesAndCutVertices.vertices}]`)
}

main()