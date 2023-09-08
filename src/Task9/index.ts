import ShortestHamiltonianKeyManager from "./ShortestHamiltonianPathInputKeyManager"
import output from "../modules/output/output"
import Graph from "../modules/Graph/Graph"
import ShortestHamiltonianPath from "./ShortestHamiltonianPath"

const main = (): void => {
    const keyManager: ShortestHamiltonianKeyManager = new ShortestHamiltonianKeyManager()

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

    if (!keyManager.inputFileName || !keyManager.strategyReading || keyManager.beginVertex === undefined) {
        console.log("Error")
        return
    }

    const graph: Graph = new Graph(keyManager.strategyReading)

    const shortestHamiltonianPath = (new ShortestHamiltonianPath(graph)).algAntColony(keyManager.beginVertex)
    const write = output(keyManager.outputFileName)
    write(`Hamiltonian cycle has length ${shortestHamiltonianPath.reduce((acc, e) => acc + e.weight, 0)}.\n${shortestHamiltonianPath.map(e => `${e.u} - ${e.v} : (${e.weight})\n`).join(``)}`)


}

main()