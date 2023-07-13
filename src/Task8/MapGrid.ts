import Cell from "./Cell"

class MapGrid {
    private readonly _map: number[][]
    public readonly _countCells: number

    constructor(strategyReading: () => number[][]) {
        this._map = strategyReading()
        this._countCells = this._map.length
    }

    get map(): number[][] { return JSON.parse(JSON.stringify(this._map)) }  

    public neighbors(c: Cell): Cell[] {
        let neighbors: Cell[] = []
        let steps = [[0, 1], [0, -1], [1, 0], [-1, 0]]

        for (let [dx, dy] of steps) {
            let [x, y] = [c.x + dx, c.y + dy]
            if (x < 0 || x >= this._countCells) continue
            if (y < 0 || y >= this._countCells) continue

            neighbors.push(new Cell(x, y))
        }

        return neighbors
    }

    public height(i: number, j: number): number { return this._map[i][j] }

    public distance(u: Cell, v: Cell): number {
        return (Math.abs(u.x - v.x) + Math.abs(u.y - v.y) + Math.abs(this.height(u.x, u.y) - this.height(v.x, v.y)))
    }
}

export default MapGrid