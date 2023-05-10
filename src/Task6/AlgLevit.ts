import Graph from "../modules/Graph/Graph"
import AbstractDistancesToPeaks from "./AbstractDistancesToPeaks"

class AlgLevit extends AbstractDistancesToPeaks {
    constructor (graph: Graph, startVertex: number) {
        super(graph, startVertex)
    }

    public solve(): number[] {
        let distances: number[] = new Array(this._matrix.length).fill(Infinity)
        distances[this._startVertex] = 0
        // принадлежность вершины к множеству
        let belong: number[] = new Array(this._matrix.length).fill(2) // изначально все необработанные (кроме startVertex)
        belong[this._startVertex] = 1

        let queue: number[] = [this._startVertex]
        let urgentQueue: number[] = []

        while (queue.length !== 0 || urgentQueue.length !== 0) {
            let u: number = urgentQueue.shift() || queue.shift() as number
            
            let neigh: number[] = this._graph.adjacency_list(u)
            for (let v of neigh) {
                // если вершина, расстояние до которой еще не вычислено
                if (belong[v] === 2) {
                    distances[v] = Math.min(distances[v], distances[u] + this._graph.weight(u, v))
                    belong[v] = 1
                    queue.push(v)
                }
                // если вершина, расстояние до которой вычисляется
                if (belong[v] === 1) distances[v] = Math.min(distances[v], distances[u] + this._graph.weight(u, v))
                // если вершина, расстояние до которой уже вычислено (возможно, не окончательно)
                if (belong[v] === 0 && distances[v] > distances[u] + this._graph.weight(u, v)) {
                    distances[v] = distances[u] + this._graph.weight(u, v)
                    belong[v] = 1
                    urgentQueue.push(v)
                }
            }
            belong[u] = 0
        }
        return distances
    }
}

export default AlgLevit