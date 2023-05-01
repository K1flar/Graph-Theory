import { time } from "console";
import Graph from "../modules/Graph/Graph";

class BridgesAndCutVertices {
    private readonly _graph: Graph
    private readonly _matrix: number[][]
    private tin: number[] = []
    private tup: number[] = []
    
    private _bridges: [number, number][] = []
    private _vertices: number[] = []

    constructor(graph: Graph) {
        this._graph = graph
        this._matrix = graph.relatedGraphAdjacencyMatrix()

        // проходимся по всем компонентам
        let marked: number[] = []
        for (let i = 0; i < this._matrix.length; i++) {
            if (marked.indexOf(i) === -1) this.DFS(i, -1, marked, this._bridges, this._vertices)
        }
    }

    private DFS(v: number, p: number, marked: number[], bridges: [number, number][], vertices: number[]) {
        marked.push(v)
        this.tup[v] = this.tin[v] = (p === -1 ? 1 : this.tin[p] + 1)
        let children = 0
        this._graph.adjacency_list(v, this._matrix).forEach(u => {
            if (u !== p) { 
                if (marked.indexOf(u) !== -1) { // (v; u) - обратное
                    this.tup[v] = Math.min(this.tup[v], this.tin[u])
                } else { // (v; u) - прямое
                    this.DFS(u, v, marked, bridges, vertices)
                    this.tup[v] = Math.min(this.tup[v], this.tup[u])
                    
                    if (this.tin[v] < this.tup[u]) bridges.push([v, u]) 
                    if (this.tin[v] <= this.tup[u] && p !== -1 && vertices.indexOf(v) === -1) vertices.push(v)
                    children++
                }
            }
        })

        if (p === -1 && children > 1) vertices.push(v)
    }

    get bridges(): [number, number][] { return this._bridges }
    
    get vertices() { return this._vertices }
}

export default BridgesAndCutVertices