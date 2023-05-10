import Graph from "../modules/Graph/Graph"
import AbstractDistancesToPeaks from "./AbstractDistancesToPeaks"

class AlgBellmanFord extends AbstractDistancesToPeaks {
    constructor(graph: Graph, startVertex: number) {
        super(graph, startVertex)
    }

    public solve(): number[] {
        return this.algBellmanFord()[0]
    }
}

export default AlgBellmanFord