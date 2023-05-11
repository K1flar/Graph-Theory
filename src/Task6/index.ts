import Graph from "../modules/Graph/Graph"
import DistancesToPeaksInputKeyManager from "./DistancesToPeaksInputKeyManager"
import output from "../modules/output/output"
import AlgDijkstra from "./AlgDijkstra"
import AlgBellmanFord from "./AlgBellmanFord"
import AlgLevit from "./AlgLevit"

const main = (): void => {
    const keyManager: DistancesToPeaksInputKeyManager = new DistancesToPeaksInputKeyManager()

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
    
    if (!keyManager.inputFileName || !keyManager.strategyReading || keyManager.beginVertex === undefined || !keyManager.algorithm) {
        console.log("Error")
        return
    }

    const graph: Graph = new Graph(keyManager.strategyReading)

    let {beginVertex, algorithm} = keyManager

    const algorithms = {
        "-d": new AlgDijkstra(graph, beginVertex),
        "-b": new AlgBellmanFord(graph, beginVertex),
        "-t": new AlgLevit(graph, beginVertex)
    }

    const distancesToPeaks = algorithms[algorithm as keyof typeof algorithms] 
    let [distances, isContainsNegativeCycle] = distancesToPeaks.solve()

    const write = output(keyManager.outputFileName)

    if (isContainsNegativeCycle) {
        write(`Graph contains a negative cycle.\n`)
    } else {
        if (distancesToPeaks.isContainsNegativeEdge()) 
            write(`Graph contains edges with negative weight.`)
        else 
            write(`Graph does not contain edges with negative weight.`)

            write(`Shortest paths lengths:\n`)
            for (let i = 0; i < distances.length; i++) if (i !== beginVertex) write(`${beginVertex} - ${i}: ${distances[i]}`)   
    }
}

main()