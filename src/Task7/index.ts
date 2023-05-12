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

    let [distances, isContainsNegativeCycle] = new AllDistances(graph).algJohnson()
    
    console.log(isContainsNegativeCycle)
    console.log(distances)
    
    const write = output(keyManager.outputFileName)

}

main()