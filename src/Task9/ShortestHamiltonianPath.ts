import Graph from "../modules/Graph/Graph"

class ShortestHamiltonianPath {
    private readonly _graph: Graph
    private readonly _matridx: number[][]

    private _pheromones: number[][]
    private a = 1   // показатель важности феромонного следа
    private b = 2   // показатель важности близости вершины
    private p = 0.2 // коэффициент испарения феромона
    private Q       // пропорционально длине пути

    constructor(graph: Graph) {
        this._graph = graph
        this._matridx = graph.adjacency_matrix()
        this._pheromones = []
        for (let i = 0; i < graph.countVertex; i++) {
        this._pheromones[i] = []
            for (let j = 0; j < graph.countVertex; j++)
                if (i === j) this._pheromones[i][j] = 0
                else this._pheromones[i][j] = 1
        }

        this.Q = this._matridx[0].reduce((acc, e) => acc + e, 0)
    }

    public algAntColony(beginVertex: number): Edge[] {
        let res: Edge[] = []

        let T: number = 500 // количество итераций
        
        for (T; T > 0; T--) {
            // "рассаживаем" муравья на каждую вершину
            for (let i = 0; i < this._graph.countVertex; i++) {
                let visited: boolean[] = new Array(this._graph.countVertex).fill(false)
                let cur: number = i   // текущая вершина
                visited[cur] = true 
                let k = 1             // количество посещенных
                let path: Edge[] = [] // найденный путь
                let len = 0           // длина найденного пути
                // пока не обошли все вершины
                while(k < this._graph.countVertex) {
                    // составаляем массив вероятноатей перехода в соседнии вершины
                    let neigh: number[] = this._graph.adjacency_list(cur).filter(e => !visited[e])
                    let probabilities: number[] = neigh.map(n => this.P(cur, n, neigh))
                    for (let j = 1; j < probabilities.length; j++) probabilities[j] += probabilities[j - 1]

                    // выбираем следующую вершину с учетом вероятностей перехода
                    let next = this.randNext(neigh, probabilities)
                    visited[next] = true
                    k++
                    path.push({u: cur, v: next, weight: this._graph.weight(cur, next)})
                    len += this._graph.weight(cur, next)

                    cur = next
                }
                path.push({u: path[path.length - 1].v, v: i, weight: this._graph.weight(path[path.length - 1].v, i)})
                len += this._graph.weight(path[path.length - 1].v, i)
                
                // обновляем ферамонный след
                for (let i = 0, e = path[0]; i < path.length; e = path[++i]) {
                    this._pheromones[e.u][e.v] = (1 - this.p) * this._pheromones[e.u][e.v] + this.Q / len
                    this._pheromones[e.v][e.u] = this._pheromones[e.u][e.v] 
                }
            }
        }
        console.log(this._pheromones)
        // формирвоание оптимального пути
        let cur = beginVertex
        let next: number
        let visited: boolean[] = new Array(this._graph.countVertex).fill(false)
        visited[cur] = true 
        let k = 1
        while (k != this._graph.countVertex) {
            let maxI = -1
            let max = -Infinity
            for (let i = 0; i < this._graph.countVertex; i++)
                if ((this._pheromones[cur][i] > max) && !visited[i]) {
                    max = this._pheromones[cur][i]
                    maxI = i
                }
            visited[maxI] = true
            next = maxI
            res.push({u: cur, v: next, weight: this._graph.weight(cur, next)})
            cur = next
            k++
        }
        res.push({u: next!, v: beginVertex, weight: this._graph.weight(next!, beginVertex)})
        return res
    }

    // желание "муравья" перейти из вершины i в вершину j
    private desire(i: number, j: number): number { return Math.pow(this._pheromones[i][j], this.a) / Math.pow(this._matridx[i][j], this.b) }

    // вероятность перейти в j-уйю вершину
    private P(i: number, j: number, neigh: number[]): number {
        return this.desire(i, j) / neigh.reduce((acc, n) => acc + this.desire(i, n), 0)
    }

    // выбор следующей вершины с учетом массива вероятностей перехода
    private randNext(neigh: number[], p: number[]): number {
        let rand = Math.random()
        let i = 0;
        let res: number = neigh[0]
        while(rand > p[i]) res = neigh[++i]
        return res
    }
}

export default ShortestHamiltonianPath