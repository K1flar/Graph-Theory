import Graph from "../modules/Graph/Graph"
import AbstractDistancesToPeaks from "./AbstractDistancesToPeaks"

class AlgBellmanFord extends AbstractDistancesToPeaks {
    constructor(graph: Graph, startVertex: number) {
        super(graph, startVertex)
    }

    public solve(): [number[], boolean] {
        let distances: number[] = new Array(this._matrix.length).fill(Infinity)
        distances[this._startVertex] = 0
        let edges: Edge[] = this._graph.list_of_edges()
        
        for (let i = 0; i < this._matrix.length - 1; i++) {
            for (let e of edges) {
                distances[e.v] = Math.min(distances[e.v], distances[e.u] + e.weight)
            }
        }

        for (let e of edges)
            if (distances[e.v] > distances[e.u] + e.weight) {
                return [[], true]
            }

        return [distances, false]
    }
}

export default AlgBellmanFord