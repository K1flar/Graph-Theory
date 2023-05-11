import Graph from "../modules/Graph/Graph"
import AbstractDistancesToPeaks from "./AbstractDistancesToPeaks"

class AlgDijkstra extends AbstractDistancesToPeaks {
    constructor(graph: Graph, startVertex: number) {
        super(graph, startVertex)
    }

    public solve(): [number[], boolean] {
        let distances: number[] = new Array(this._matrix.length).fill(Infinity) // массив расстояний от startVertex
        let visited: boolean[] = new Array(this._matrix.length).fill(false)     // метки посещенных вершин
        let k: number = 0 // количество посещенных

        distances[this._startVertex] = 0

        // количество посещений для каждой вершины
        let count: number[] = new Array(this._matrix.length).fill(0)

        while (k != this._matrix.length) {
            // выбор необработанной вершины с минимальной пометкой distance
            let md: number = Infinity
            let v: number = -1
            for (let i = 0; i < this._matrix.length; i++) {
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
            for (let k of count) if (k === this._matrix.length) return [[], true]

        }

        return [distances, false]
    }
}

export default AlgDijkstra