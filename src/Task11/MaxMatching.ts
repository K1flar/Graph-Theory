import ModifiedGraph from "../modules/Graph/ModifiedGraph"
import MaxFlow from "../Task10/MaxFlow"

class MaxMatching {
    private readonly _graph: ModifiedGraph
    private _matrix: number[][]

    constructor(graph: ModifiedGraph) {
        this._graph = graph
        this._matrix = graph.relatedGraphAdjacencyMatrix()
    }

    public findMaxMatching(): Edge[] {
        let res: Edge[] = []

        // делаем граф направленным
        this._graph.makeDirected()

        // добавление истока и стока
        this.addSourceAndSink()
        
        // поиск максимального потока
        const maxFlow = new MaxFlow(this._graph)
        maxFlow.algFordFulkerson()

        // получение результата (буз истока и стока)
        const network = maxFlow.network
        for (let i = 0; i < network.length - 2; i++)
            for (let j = 0; j < network.length - 2; j++)
                if (network[i][j] && this._graph.is_edge(j, i)) res.push({u: i, v: j, weight: network[i][j]})

        return res
    }

    private addSourceAndSink() {
        let out: number[] = new Array(this._graph.countVertex).fill(0)
        let inp: number[] = new Array(this._graph.countVertex).fill(0)
        for (let i = 0, c = this._graph.colors[0]; i < this._graph.countVertex; c = this._graph.colors[++i])
            if (c === 1) out[i] = 1
            else if (c === 2) inp[i] = 1
        this._graph.addVertex(new Array(this._graph.countVertex).fill(0), out)
        this._graph.addVertex(inp, new Array(this._graph.countVertex).fill(0))
    }
}

export default MaxMatching