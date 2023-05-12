import AlgBellmanFord from "../Task6/AlgBellmanFord"
import AlgDijkstra from "../Task6/AlgDijkstra"
import ModifiedGraph from "../modules/Graph/ModifiedGraph"

class AllDistances {
    private readonly _graph: ModifiedGraph

    constructor (graph: ModifiedGraph) {
        this._graph = graph
    }

    public algJohnson(): [number[][], boolean] {
        let distances: number[][] = []
        
        // добавим новую вершину, соединенную со всеми нулевыми ребрами
        this._graph.addVertex(undefined, new Array(this._graph.countVertex).fill(0))
        console.log(this._graph.adjacency_matrix())
        // расчитаем минимальные расстояния от новой вершины до всех остальных
        let [h, isContainsNegativeCycle] = (new AlgBellmanFord(this._graph, this._graph.countVertex - 1)).solve()
        console.log(h)

        // удаляем вершину
        this._graph.delVertex(this._graph.countVertex - 1)

        // если в графе есть отрицательные циклы
        if (isContainsNegativeCycle) return [[], true]
        console.log(this._graph.adjacency_matrix())
        // пересчитаем веса ребер по новой весовой функции
        this._graph.changeWeights((u, v) => this._graph.weight(u, v) + h[u] - h[v])

        console.log("nnew\n",this._graph.adjacency_matrix())

        // расчитываем расстояние по алгоритму Дейкстры
        for (let i = 0; i < this._graph.countVertex; i++) {
            distances[i] = (new AlgDijkstra(this._graph, i)).solve()[0]
        }
        console.log(distances)
        for (let i = 0; i < this._graph.countVertex; i++) {
            for (let j = 0; j < this._graph.countVertex; j++)
                distances[i][j] = distances[i][j] + h[j] - h[i]
        }
        

        return [distances, false]
    }
}

export default AllDistances