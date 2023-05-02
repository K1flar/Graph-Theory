import Graph from "../modules/Graph/Graph"

class SpanningTree {
    private readonly _graph: Graph
    private readonly _matrix: number[][]    

    constructor(graph: Graph) {
        this._graph = graph
        this._matrix = graph.relatedGraphAdjacencyMatrix()
    }

    
}