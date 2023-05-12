import Graph from "./Graph"

class ModifiedGraph extends Graph {
    private _edges: Edge[] = []

    constructor(strategyReading: () => number[][]) {
        super(strategyReading)
        
        for (let i = 0; i < this._countVertex; i++)
            for (let j = 0; j < this._countVertex; j++)
                if (this.is_edge(i, j)) this._edges.push({u: i, v: j, weight: this.weight(i, j)})

        console.log(this._edges)
    }

    public addVertex(inp?: number[], out?: number[]): void {
        // // добавляем от куда можно зайти в новую вершину
        // for (let i = 0; i < this._countVertex; i++) this._matrix[i].push(inp ? inp[i] || 0 : 0)
        // // добавляем куда можем прийти из новой вершины
        // this._matrix[this._countVertex] = []
        // for (let i = 0; i < this._countVertex; i++) this._matrix[this._countVertex].push(out ? out[i] || 0 : 0)
        // this._matrix[this._countVertex][this._countVertex] = 0
        // добавляем ребра
        for (let i = 0; i < this._countVertex; i++) {
            if (inp) this._edges.push({u: i, v: this._countVertex, weight: inp[i] || 0})
            if (out) this._edges.push({u: this._countVertex, v: i, weight: out[i] || 0})
        }
        this._countVertex++
    }

    public delVertex(v: number): void {
        // for (let i = 0; i < this._countVertex; i++) this._matrix[i].splice(v, v)
        // this._matrix.splice(v, v)
        // удаление всех ребер
        let i = 0, e: Edge = this._edges[0]
        while(i !== this._edges.length) {
            if (e.u === v || e.v === v) {this._edges.splice(i, i); i--}
            e = this._edges[++i]
        }
        this._countVertex--
    }

    public changeWeights(D: (u: number, v: number) => number): void {
        for (let i = 0; i < this._countVertex; i++)
            for (let j = 0; j < this._countVertex; j++)
                if (this.is_edge(i, j))this._matrix[i][j] = D(i, j)
        
        for (let i = 0, e = this._edges[0]; i < this._countVertex; e = this._edges[++i]) this._edges[i].weight = D(e.u, e.v)
    }

    public override adjacency_list(v: number, matrix?: number[][]): number[] {
        let res: number[] = []
        for(let e of this._edges) if (e.u === v) res.push(e.v)

        return res
    }

    public override list_of_edges(v?: number): Edge[] {
        if (v === undefined) return JSON.parse(JSON.stringify(this._edges))
        let res: Edge[] = []
        for (let e of this._edges) if (e.u === v) res.push(e)
        return res
    }
}

export default ModifiedGraph