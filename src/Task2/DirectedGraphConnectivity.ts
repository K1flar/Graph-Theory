import Graph from "../modules/Graph/Graph"
import AbstractGraphConnectivity from "./AbstractGraphConnectivity"

class DirectedGraphConnectivity extends AbstractGraphConnectivity{
    constructor(graph: Graph) {
        super(graph)
    }

    public connectivityComponents(): number[][] {
        return this.components(this._graph.relatedGraphAdjacencyMatrix())
    }

    public isStronglyConnected(): boolean {
        if (this.stronglyConnectedComponents().length === 1) return true
        return false
    }

    public stronglyConnectedComponents(): number[][] {
        return this.algKosaraju();
    }

    private algKosaraju(): number[][] {
        let components: number[][] = []

        // инвертирование дуг 
        let invertedMatrix: number[][] = []
        for (let i = 0; i < this._matrix.length; i++) {
            invertedMatrix[i] = []
            for (let j = 0; j < this._matrix.length; j++)
                invertedMatrix[i][j] = this._matrix[j][i]
        }

        let marked: number[] = [] // посещенные вершины
        let tout: number[] = [] // время выхода из каждой вершины
        for (let i = 0; i< this._matrix.length; i++) 
            if (marked.indexOf(i) === -1) 
                this.DFS(i, marked, invertedMatrix, tout)
            
        tout = tout.reverse()
        marked = []
        let lastLength: number = 0
        for (let i = 0; i < tout.length; i++) {
            if (marked.indexOf(tout[i]) === -1) {
                this.DFS(tout[i], marked)
                let component: number[] = marked.slice(lastLength)
                lastLength = marked.length
                components.push(component)
            }
        }

        return components
    }

    private DFS(vertex: number, marked: number[], matrix: number[][] = this._matrix, tout?: number[]): void {
        marked.push(vertex)
        this._graph.adjacency_list(vertex, matrix).forEach(el => {
            if (marked.indexOf(el) === -1) this.DFS(el, marked, matrix, tout)
        })
        tout?.push(vertex)
    }
}

export default DirectedGraphConnectivity