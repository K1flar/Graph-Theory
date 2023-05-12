import Graph from "../modules/Graph/Graph"

class Geodesics {
    private readonly _graph: Graph
    private readonly _matrix: number[][]

    constructor (graph: Graph) {
        this._graph = graph
        this._matrix = graph.adjacency_matrix()
    }

    public algDijkstra(startVertex: number, endVertex: number): [Edge[], number] {
        let path: Edge[] = [] // геодезическая цепь
        
        // расстояния до вершины
        let distance: number[] = new Array(this._matrix.length).fill(Infinity)
        distance[startVertex] = 0
        // массив помеченных вершин
        let visited: boolean[] = new Array(this._matrix.length).fill(false) 
        // массив родителей
        let parents: number[] = []

        while (!visited[endVertex]) {
            // выбор необработанной вершины с минимальной пометкой distance
            let md: number = Infinity
            let v: number = -1
            for (let i = 0; i < this._matrix.length; i++)
                if (!visited[i] && distance[i] < md) {
                    md = distance[i]
                    v = i
                }
            // проверка на отсутствие пути
            if (md === Infinity) return [[], -1]
            
            // помечаем вершину обработанной
            visited[v] = true

            // пересчитываются метки у всех необработанных вершин к v
            let neigh: number[] = this._graph.adjacency_list(v)
            for (let n of neigh) {
                let nd: number = distance[v] + this._graph.weight(v, n) 
                if (nd < distance[n]) {
                    distance[n] = nd
                    parents[n] = v
                }
            } 
        }

        let v = endVertex
        while (v !== startVertex) {
            path.push({u: parents[v], v: v, weight: this._graph.weight(parents[v], v)})
            v = parents[v]
        }
        path.reverse()

        return [path, distance[endVertex]]
    }
}

export default Geodesics