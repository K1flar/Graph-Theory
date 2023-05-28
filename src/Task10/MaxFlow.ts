import { AssertionError } from "assert"
import Graph from "../modules/Graph/Graph"

class MaxFlow {
    private readonly _graph: Graph
    private _matrix: number[][] // матрица для поиска максимального потока

    private readonly _source: number
    private readonly _sink: number

    constructor(graph: Graph) {
        this._graph = graph
        this._matrix = graph.adjacency_matrix();
        [this._source, this._sink] = this.searchSourceAndSink()

        if (this._source === -1 || this._sink === -1) throw new Error("There is no source or sink in the network")
    }

    public get source(): number { return this._source }
    
    public get sink(): number { return this._sink }

    private searchSourceAndSink(): [number , number] {
        let dinp: number = 0 // полустепень захода
        let dout: number = 0 // полустепень выхода
        let source: number = -1 // источник
        let sink: number = -1 // сток
        for (let i = 0; i < this._graph.countVertex; i++) {
            dinp = dout = 0    
            for (let j = 0; j < this._graph.countVertex; j++) {
                dinp += this._matrix[j][i]
                dout += this._matrix[i][j]
            }
            if (dinp === 0) source = i
            if (dout === 0) sink = i 
        }

        return [source, sink]
    }

    public algFordFulkerson(): [Edge[], number] {
        let visited: boolean[] = new Array(this._graph.countVertex).fill(false)

        // пока есть дополняющая цепь
        while(this.DFS(this._source, Infinity, visited)) visited = visited.fill(false);

        let mf = this._matrix[this._sink].reduce((acc, el) => acc + el, 0)

        // заполняем ребра их значение потока, проходящих через них
        let edges: Edge[] = this._graph.list_of_edges()
        for (let i = 0; i < edges.length; i++) edges[i].weight = this._matrix[edges[i].v][edges[i].u]

        return [edges, mf]
    } 

    private DFS(u: number, cmin: number, visited: boolean[]): number {
        if (u === this._sink) return cmin
        visited[u] = true

        let neigh: number[] = this._graph.adjacency_list(u, this._matrix)
        for (let v of neigh) {
            if (!visited[v]) {
                let f = this.DFS(v, Math.min(cmin, this._matrix[u][v]), visited)
                // если цепь найдена
                if (f) {
                    this._matrix[u][v] -= f
                    this._matrix[v][u] += f
                        
                    return f
                }
            }
        }

        // цепь не найдена
        return 0
    } 
}

export default MaxFlow