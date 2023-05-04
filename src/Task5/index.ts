import Graph from "../modules/Graph/Graph"
import GeodesicsInputKeyManaher from "./GeodesicsInputKeyManaher"
import output from "../modules/output/output"
import Geodesics from "./Geodesics"


const main = (): void => {
    const keyManager: GeodesicsInputKeyManaher = new GeodesicsInputKeyManaher()

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
    
    if (!keyManager.inputFileName || !keyManager.strategyReading || keyManager.beginVertex === undefined || keyManager.endVertex === undefined) {
        console.log("Error")
        return
    }

    const graph: Graph = new Graph(keyManager.strategyReading)

    const {beginVertex, endVertex} = keyManager
    const geodesics: Geodesics = new Geodesics(graph)

    const [path, weight] = geodesics.algDijkstra(beginVertex, endVertex) 

    const write = output(keyManager.outputFileName)

    if (weight < 0)
        write(`There is no path between the vertices ${beginVertex} and ${endVertex}.`)
    else
        write(`Shortest path length between ${beginVertex} and ${endVertex} vertices: ${weight}\nPath:\n[${path.map(e => `(${e.u}, ${e.v}, ${e.weight})`)}]`)
}

main()