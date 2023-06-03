import MapGrid from "./MapGrid"
import Cell from "./Cell"

class ShortestPath {
    private readonly _map: MapGrid
    public lengthPath: number = 0

    constructor(map: MapGrid) {
        this._map = map
    }

    public AStar(bc: Cell, ec: Cell, h: (u: Cell, v: Cell) => number): [Cell[], number] {
        let path: Cell[] = [ec]
        

        let openCells: Cell[] = [bc]
        let closedCells: Cell[] = []
        let currentCell: Cell = bc
        currentCell.distanceFromStart = 0
        currentCell.fullDistance = 0
        currentCell.parent = currentCell

        while(currentCell.x !== ec.x || currentCell.y !== ec.y) {
            let min = Infinity
            let minI = -1
            for (let i = 0, c = openCells[0]; i < openCells.length; c = openCells[++i]) {
                if (c.fullDistance! < min) {
                    min = c.fullDistance!
                    minI = i
                }
            }
            currentCell = openCells[minI]
            openCells.splice(minI, 1)
            closedCells.push(currentCell)

            let neighbours: Cell[] = this._map.neighbors(currentCell)
            for (let n of neighbours) {
                if (closedCells.find((e) => (n.x === e.x && n.y === e.y))) continue
 
                if (openCells.find((e) => (n.x === e.x && n.y === e.y))) {
                    // расстояние от стартовой клетки
                    let newDistance = currentCell.distanceFromStart! + this._map.distance(currentCell, n)
                    if (n.distanceFromStart! > newDistance) {
                        n.parent = currentCell
                        n.distanceFromStart = newDistance
                        n.fullDistance = n.distanceFromStart + h(n, ec)  
                    }
                } else {
                    n.parent = currentCell
                    n.distanceFromStart = currentCell.distanceFromStart! + this._map.distance(currentCell, n)
                    n.fullDistance = n.distanceFromStart + h(n, ec)  
                    openCells.push(n)
                }
            }
            
        }

        let c = currentCell
        while(c.x !== bc.x || c.y !== bc.y) {
            c = c.parent!
            path.push(c)
        }
        path.reverse()
        this.lengthPath = currentCell.distanceFromStart!
        return [path, closedCells.length / Math.pow(this._map._countCells, 2) * 100]
    } 
    
    
}

export default ShortestPath