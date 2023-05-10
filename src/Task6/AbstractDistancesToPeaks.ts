import Graph from "../modules/Graph/Graph"

abstract class AbstractDistancesToPeaks {
    protected readonly _graph: Graph
    protected readonly _matrix: number[][]
    protected readonly _startVertex: number
    
    constructor (graph: Graph, startVertex: number) {
        this._graph = graph
        this._matrix = graph.adjacency_matrix()
        this._startVertex = startVertex
    }

    public isContainsNegativeEdge(): boolean {
        let edges: Edge[] = this._graph.list_of_edges()
        for (let e of edges) if (e.weight < 0) return true
        return false
    }

    public isContainsNegativeCycle(): boolean {
        return this.algBellmanFord()[1]
    }

    protected algBellmanFord(): [number[], boolean] {
        let distances: number[] = new Array(this._matrix.length).fill(Infinity)
        distances[this._startVertex] = 0
        let edges: Edge[] = this._graph.list_of_edges()

        for (let i = 0; i < this._matrix.length - 1; i++) {
            for (let e of edges) {
                if (distances[e.v] > distances[e.u] + e.weight) {
                    distances[e.v] = distances[e.u] + e.weight
                }
            }
        }

        for (let e of edges)
            if (distances[e.v] > distances[e.u] + e.weight) {
                return [[], true]
            }

        return [distances, false]
    } 
}

export default AbstractDistancesToPeaks