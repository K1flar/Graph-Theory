import ModifiedGraph from "../modules/Graph/ModifiedGraph"
import InputKeyManager from "../modules/input/InputKeyManager"
import output from "../modules/output/output"
import AllDistances from "./AllDistances"

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

    const allDistance: AllDistances = new AllDistances(graph)
    let [distances, isContainsNegativeCycle] = allDistance.algJohnson()
    
    const write = output(keyManager.outputFileName)

    if (isContainsNegativeCycle) {
        write(`Graph contains a negative cycle.\n`)
    } else {
        if (allDistance.isContainsNegativeEdge()) 
            write(`Graph contains edges with negative weight.`)
        else 
            write(`Graph does not contain edges with negative weight.`)

        write(`Shortest paths lengths:\n`)
        for (let i = 0; i < distances.length; i++) 
            for (let j = 0; j < distances.length; j++)
                if (distances[i][j] !== Infinity && i !== j)
                    write(`${i} - ${j}: ${distances[i][j]}\n`)   
    }
}

main()