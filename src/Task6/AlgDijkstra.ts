import Graph from "../modules/Graph/Graph"
import AbstractDistancesToPeaks from "./AbstractDistancesToPeaks"

class AlgDijkstra extends AbstractDistancesToPeaks {
    constructor(graph: Graph) {
        super(graph)
    }

    public solve(startVertex: number): [number[], boolean] {
        let distances: number[] = new Array(this._graph.countVertex).fill(Infinity) // массив расстояний от startVertex
        let visited: boolean[] = new Array(this._graph.countVertex).fill(false)     // метки посещенных вершин
        let k: number = 0 // количество посещенных
        distances[startVertex] = 0

        // количество посещений для каждой вершины
        let count: number[] = new Array(this._graph.countVertex).fill(0)

        while (k != this._graph.countVertex) {
            // выбор необработанной вершины с минимальной пометкой distance
            let md: number = Infinity
            let v: number = -1
            for (let i = 0; i < this._graph.countVertex; i++) {
                if (!visited[i] && distances[i] < md) {
                    md = distances[i]
                    v = i
                }
            }
            if (v === -1) break

            // помечаем вершину обработанной
            visited[v] = true
            k++
            count[v]++

            // обновляем метки для соседей v
            let neigh: number[] = this._graph.adjacency_list(v)
            for (let n of neigh) {
                // новое расстояние
                let nd = distances[v] + this._graph.weight(v, n)
                if (nd < distances[n]) {
                    distances[n] = nd

                    // модификация Форда
                    if (visited[n]) {
                        visited[n] = false
                        k--
                    }
                }
            }

            // если вершину посещали уже n раз, значит в графе есть цикл
            for (let k of count) if (k === this._graph.countVertex) return [[], true]

        }

        return [distances, false]
    }
}

export default AlgDijkstra