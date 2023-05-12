import Graph from "../modules/Graph/Graph"
import AbstractDistancesToPeaks from "./AbstractDistancesToPeaks"

class AlgBellmanFord extends AbstractDistancesToPeaks {
    constructor(graph: Graph) {
        super(graph)
    }

    public solve(startVertex: number): [number[], boolean] {
        let distances: number[] = new Array(this._graph.countVertex).fill(Infinity)
        distances[startVertex] = 0
        let edges: Edge[] = this._graph.list_of_edges()
        console.log(edges)
        for (let i = 0; i < this._graph.countVertex - 1; i++) {
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