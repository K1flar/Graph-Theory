import Graph from "../modules/Graph/Graph"

abstract class AbstractDistancesToPeaks {
    protected readonly _graph: Graph
    protected readonly _matrix: number[][]
    protected readonly _startVertex: number
    
    constructor (graph: Graph, startVertex: number = 0) {
        this._graph = graph
        this._matrix = graph.adjacency_matrix()
        this._startVertex = startVertex
    }

    public isContainsNegativeEdge(): boolean {
        let edges: Edge[] = this._graph.list_of_edges()
        for (let e of edges) if (e.weight < 0) return true
        return false
    } 
}

export default AbstractDistancesToPeaks