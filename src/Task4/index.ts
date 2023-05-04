import Graph from "../modules/Graph/Graph"
import SpanningTreeInputKeyManager from "./SpanningTreeInputKeyManager"
import output from "../modules/output/output"
import SpanningTree from "./SpanningTree"

const main = (): void => {
    const keyManager: SpanningTreeInputKeyManager = new SpanningTreeInputKeyManager()

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

    if (!keyManager.inputFileName || !keyManager.strategyReading || !keyManager.algorithms) {
        console.log("Error")
        return
    }

    const graph: Graph = new Graph(keyManager.strategyReading)

    const spanningTree: SpanningTree = new SpanningTree(graph)

    const write = output(keyManager.outputFileName)

    for (let flag of keyManager.algorithms) {
        let tree: Edge[] = []
        let sum: number = 0

        let ts = (new Date()).getTime()
        if (flag === "-k") [tree, sum] = spanningTree.algKruskal()
        if (flag === "-p") [tree, sum] = spanningTree.algPrima()
        if (flag === "-b") [tree, sum] = spanningTree.algBoruvka()
        let te = (new Date()).getTime()

        write(`Minimum spanning tree:\n[${tree.map(e => `(${e.u}, ${e.v}, ${e.weight})`)}]\n`)
        write(`Weight of spanning tree: ${sum}\n`)
        if (keyManager.algorithms.length > 1)
            write(`Execution time: ${te - ts}ms\n`)
    }

}

main()