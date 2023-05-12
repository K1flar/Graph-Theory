import AbstractDistancesToPeaks from "../Task6/AbstractDistancesToPeaks"
import AlgBellmanFord from "../Task6/AlgBellmanFord"
import AlgDijkstra from "../Task6/AlgDijkstra"
import ModifiedGraph from "../modules/Graph/ModifiedGraph"

class AllDistances extends AbstractDistancesToPeaks{
    constructor (graph: ModifiedGraph) {
        super(graph)
    }

    public algJohnson(): [number[][], boolean] {
        let distances: number[][] = [];
        
        // добавим новую вершину, соединенную со всеми нулевыми ребрами
        (this._graph as ModifiedGraph).addVertex(undefined, new Array(this._graph.countVertex).fill(0))
        
        // расчитаем минимальные расстояния от новой вершины до всех остальных
        let [h, isContainsNegativeCycle] = (new AlgBellmanFord(this._graph)).solve(this._graph.countVertex - 1);

        // удаляем вершину
        (this._graph as ModifiedGraph).delVertex(this._graph.countVertex - 1)

        // если в графе есть отрицательные циклы
        if (isContainsNegativeCycle) return [[], true];

        // пересчитаем веса ребер по новой весовой функции
        (this._graph as ModifiedGraph).changeWeights((u, v) => this._graph.weight(u, v) + h[u] - h[v])

        // расчитываем расстояние по алгоритму Дейкстры
        for (let i = 0; i < this._graph.countVertex; i++) {
            distances[i] = (new AlgDijkstra(this._graph)).solve(i)[0]
        }
        
        for (let i = 0; i < this._graph.countVertex; i++) {
            for (let j = 0; j < this._graph.countVertex; j++)
                distances[i][j] = distances[i][j] + h[j] - h[i]
        }
        

        return [distances, false]
    }
}

export default AllDistances