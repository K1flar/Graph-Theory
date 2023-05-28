class Graph {
    protected _matrix: number[][] = []
    protected _countVertex: number

    constructor(strategyReading: () => number[][]) {
        this._matrix = strategyReading()
        this._countVertex = this._matrix.length
    }

    public get countVertex(): number { return this._countVertex }

    public weight(vi: number, vj: number): number {
        return this._matrix[vi][vj]
    }

    public is_edge(vi: number, vj: number): boolean {
        if (vi >= this._matrix.length || vi < 0 || vj >= this._matrix.length || vj < 0) return false
        return Boolean(this._matrix[vi][vj])
    }

    public adjacency_matrix(): number[][] {
        return JSON.parse(JSON.stringify(this._matrix))
    }

    public adjacency_list(v: number, matrix: number[][] = this._matrix): number[] {
        let res: number[] = []
        for (let i = 0; i < matrix.length; i++) if (matrix[v][i]) res.push(i)
        return res
    }

    public list_of_edges(v: number | undefined = undefined): Edge[] {
        let edges: Edge[] = []
        for (let i = v || 0; i <= (v || this._matrix.length - 1); i++)
            for (let j = 0; j < this._matrix.length; j++)
                if (this.is_edge(i, j)) edges.push({u: i, v: j, weight: this.weight(i, j)})
        return edges
    }

    public is_directed(): boolean {
        for (let i = 0; i < this._matrix.length; i++)
            for (let j = 0; j < this._matrix.length; j++)
                if (this._matrix[i][j] !== this._matrix[j][i]) return true
        return false
    }

    public relatedGraphAdjacencyMatrix(): number[][] {
        let matrix: number[][] = this.adjacency_matrix()
        if (!this.is_directed()) return matrix
        for (let i = 0; i < matrix.length; i++)
            for (let j = 0; j < matrix.length; j++)
                matrix[i][j] ||= matrix[j][i]
        return matrix
    }
}

export default Graph