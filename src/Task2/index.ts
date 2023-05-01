import Graph from "../modules/Graph/Graph"
import inputKeyManager from "../modules/input/inputKeyManager"
import output from "../modules/output/output"
import DirectedGraphConnectivity from "./DirectedGraphConnectivity"
import GraphConnectivity from "./GraphConnectivity"

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

    const graphConnectivity = graph.is_directed() ? new DirectedGraphConnectivity(graph) : new GraphConnectivity(graph)

    const write = output(keyManager.outputFileName)

    if (graph.is_directed()) {
        if (graphConnectivity.isConnectedness()) write("Digraph is connected.\n")
        else write(`Digraph is not connected and contains ${graphConnectivity.connectivityComponents().length} connected components.\n`)
        write(`Connected components:\n[${graphConnectivity.connectivityComponents().map(el => `[${el}]`)}]\n`)
        if (graphConnectivity.isConnectedness()) {
            if ((graphConnectivity as DirectedGraphConnectivity).isStronglyConnected()) write(`Digraph is strongly connected.\n`)
            else write(`Digraph is weakly connected and contains ${(graphConnectivity as DirectedGraphConnectivity).stronglyConnectedComponents().length} strongly connected components.\n`)
            write(`Strongly connected components:\n[${(graphConnectivity as DirectedGraphConnectivity).stronglyConnectedComponents().map(el => `[${el}]`)}]`)
        }    
    } else {
        if (graphConnectivity.isConnectedness()) write("Graph is connected.\n")
        else write(`Graph is not connected and contains ${graphConnectivity.connectivityComponents().length} connected components.\n`)
        write(`Connected components:\n[${graphConnectivity.connectivityComponents().map(el => `[${el}]`)}]`)
    }
}

main()