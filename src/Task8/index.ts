import MapInputKeyManager from "./MapInputKeyManager"
import output from "../modules/output/output"
import MapGrid from "./MapGrid"

import Cell from "./Cell"
import ShortestPath from "./ShortestPath"

const main = (): void => {
    const keyManager: MapInputKeyManager = new MapInputKeyManager()

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

    const map = new MapGrid(keyManager.strategyReading)
    const start = new Cell(keyManager.beginVertex[0], keyManager.beginVertex[1])
    const end = new Cell(keyManager.endVertex[0], keyManager.endVertex[1])
    const shortestPath = new ShortestPath(map)

    const heuristics = [
        (u: Cell, v: Cell) => (Math.abs(u.x - v.x) + Math.abs(u.y - v.y)),
        (u: Cell, v: Cell) => (Math.max(Math.abs(u.x - v.x), Math.abs(u.y - v.y))),
        (u: Cell, v: Cell) => (Math.sqrt(Math.pow(u.x - v.x, 2) + Math.pow(u.y - v.y, 2))),
        (u: Cell, v: Cell) => 0
    ];

    for (let h of heuristics) {
        const [path, percentOfProcessed] = shortestPath.AStar(start, end, h)

        const write = output(keyManager.outputFileName)
        write(`${shortestPath.lengthPath} - length of path between (${start.x}, ${start.y}) and (${end.x}, ${end.y}) points.\nPath:\n[ ${path.map(e => `(${e.x}, ${e.y})`)} ]\n`)
        write(`Percent of processed: ${percentOfProcessed}%\n`)
    }

}

main()