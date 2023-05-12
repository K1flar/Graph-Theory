import Graph from "../modules/Graph/Graph"

abstract class AbstractDistancesToPeaks {
    protected readonly _graph: Graph
    
    constructor (graph: Graph) {
        this._graph = graph
    }

    public isContainsNegativeEdge(): boolean {
        let edges: Edge[] = this._graph.list_of_edges()
        for (let e of edges) if (e.weight < 0) return true
        return false
    } 
}

export default AbstractDistancesToPeaks