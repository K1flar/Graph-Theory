import Graph from "../modules/Graph/Graph";
import inputKeyManager from "../modules/input/inputKeyManager";
import output from "../modules/output/output";
import DirectedGraphCharacteristics from "./DirectedGraphCharacteristics";
import GraphCharacteristics from "./GraphCharacteristics";

const main = (): void => {
    const keyManager = inputKeyManager()

    if (!keyManager) {
        console.log("Error")
        return
    }

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

    const graph: Graph = new Graph(keyManager.strategyReading)

    const graphCharacteristics = graph.is_directed() ? new DirectedGraphCharacteristics(graph) : new GraphCharacteristics(graph)

    const write = output(keyManager.outputFileName)

    if (graph.is_directed()) 
        write(`deg+ = [ ${(graphCharacteristics.vertexDegrees() as TVertexDegrees).input} ]\ndeg- = [ ${(graphCharacteristics.vertexDegrees() as TVertexDegrees).output} ]\n`)
    else 
        write(`deg = [ ${graphCharacteristics.vertexDegrees()} ]\n`)
    
    write(`Distancies: \n${graphCharacteristics.distanceMatrix.map(str => str.map(el => (el === Infinity ? "∞" : el)).join(" ")).join("\n")} \n`)

    if (graphCharacteristics.isConnected()) {
        write(`Eccentricity: [ ${graphCharacteristics.eccentricities()} ]\n`)

        if (!graph.is_directed()) {
            write(`D = ${(graphCharacteristics as GraphCharacteristics).diameter()} \nR = ${(graphCharacteristics as GraphCharacteristics).radius()} \n`)
            write(`Z = [ ${(graphCharacteristics as GraphCharacteristics).centralNodes()} ]\nP = [ ${(graphCharacteristics as GraphCharacteristics).peripheralNodes()} ]\n`)
        }
    }


}

main()
