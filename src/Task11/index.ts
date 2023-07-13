import ModifiedGraph from "../modules/Graph/ModifiedGraph"
import InputKeyManager from "../modules/input/InputKeyManager"
import output from "../modules/output/output"
import MaxMatching from "./MaxMatching"

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

    const graph: ModifiedGraph = new ModifiedGraph(keyManager.strategyReading)
    
    const maxMatching = new MaxMatching(graph)

    const write = output(keyManager.outputFileName)

    if (graph.isBipartite()) write(`Graph is bipartite\n`)
    else write(`Graph is not bipartite\n`)
    write(`Matching:\n${maxMatching.findMaxMatching().map(e => `${e.u} - ${e.v}\n`).join("")}`)
}

main()