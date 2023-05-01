import Graph from "../modules/Graph/Graph"   

abstract class AbstractGraphConnectivity {
    protected readonly _graph: Graph
    protected readonly _matrix: number[][] = []

    constructor(graph: Graph) {
        this._graph = graph
        this._matrix = graph.adjacency_matrix()
    }

    public BFS(begin: number, matrix: number[][] = this._matrix): number[] {
        let queue: number[] = [begin]
        let mark: number[] = [begin]

        while (queue.length !== 0) {
            let vertex: number = queue.shift() as number
            
            this._graph.adjacency_list(vertex, matrix).forEach(el => {
                if (mark.indexOf(el) === -1) {
                    queue.push(el)
                    mark.push(el)
                }
            })
        }

        return mark
    }

    public isConnectedness(): boolean {
        if (this.connectivityComponents().length === 1) return true
        return false
    }

    public abstract connectivityComponents(): number[][]

    protected components(matrix: number[][] = this._matrix): number[][] {
        let components: number[][] = []
        let mark: number[] = []

        for (let i = 0; i < matrix.length; i++) {
            if (mark.indexOf(i) === -1) {
                let component: number[] = this.BFS(i, matrix)
                components.push(component)
                mark = [...mark, ...component]
            }
        }

        return components
    }
}

export default AbstractGraphConnectivity