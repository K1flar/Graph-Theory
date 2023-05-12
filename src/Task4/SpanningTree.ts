import Graph from "../modules/Graph/Graph"

class SpanningTree {
    private readonly _graph: Graph
    private readonly _matrix: number[][]

    constructor(graph: Graph) {
        this._graph = graph
        this._matrix = graph.relatedGraphAdjacencyMatrix()
    }

    public algKruskal(): [Edge[], number] {
        let tree: Edge[] = []
        let sum = 0

        // каждая вершина в своей компоненте связности
        let colors: number[] = []
        for (let i = 0; i < this._matrix.length; i++) colors[i] = i

        // сортировка всех ребер по их весу
        let edges: Edge[] = this._graph.list_of_edges()
        edges.sort((a, b) => a.weight > b.weight ? 1 : -1)

        // пока не закончатся все рёбра, либо все вершины не окажутся в одной компонентее связности
        while (edges.length !== 0 && (Math.max(...colors) !== Math.min(...colors))) {
            let edge: Edge = edges.shift() as Edge

            // если ребро соединяет разные компоненты связности
            if (colors[edge.u] !== colors[edge.v]) {
                tree.push(edge)
                sum += edge.weight
                // слияние компонент
                for (let i = 0; i < this._matrix.length; i++)
                    if (colors[i] === colors[edge.v] && i !== edge.v) colors[i] = colors[edge.u]

                colors[edge.v] = colors[edge.u]
            }
        }

        return [tree, sum]
    }

    public algPrima(): [Edge[], number] {
        let tree: Edge[] = [] // список ребер в дереве
        let vertices = new Set<number>([0]) // список вершин в дереве
        let sum = 0

        // ребра всего графа
        let edges: Edge[] = this._graph.list_of_edges()

        while (vertices.size !== this._matrix.length) {
            let edgeMin: Edge = {} as Edge
            edgeMin.weight = Infinity

            // поиск минимального ребра к дереву
            for (let e of edges) {
                if ((e.weight < edgeMin.weight) && 
                // проверка на принадлежность к дереву вершины u или вершины v и не принадлежность обеих вершин одновременно
                ((vertices.has(e.u) || vertices.has(e.v)) && (!vertices.has(e.u) || !vertices.has(e.v))))
                    edgeMin = e
            }

            tree.push(edgeMin)
            sum += edgeMin.weight
            vertices.add(edgeMin.u)
            vertices.add(edgeMin.v)
        }

        return [tree, sum]
    }

    public algBoruvka(): [Edge[], number] {
        let tree: Edge[] = [] // список ребер в дереве
        let sum = 0

        // ребра всего графа
        let edges: Edge[] = this._graph.list_of_edges()

        // каждая вершина является отдельным деревом
        let colors: number[] = [] // цвета вершин (они же и номера корней каждого дерева)
        for (let i = 0; i < this._matrix.length; i++) colors[i] = i

        // количество компонент связности
        let countTree = colors.length

        // пока компонент связности больше 1 
        while (countTree > 1) {
            // номера минимальных ребер для каждой компоненты связности
            let numMinEdges: number[] = []
            for (let i = 0; i < this._matrix.length; i++) numMinEdges[i] = -1

            // поиск минимальных ребер для каждой компоненты
            for (let i = 0, e = edges[0]; i < edges.length; e = edges[++i]) {
                // пропускаем, если ребро уже в компоненте
                if (colors[e.u] === colors[e.v]) continue

                // находим принадлежность вершины u к компоненте
                let r_u = colors[e.u]
                // обновляем минимальное ребро у компоненты
                if (numMinEdges[r_u] === -1 || e.weight < edges[numMinEdges[r_u]].weight)
                    numMinEdges[r_u] = i

                // находим принадлежность вершины u к компоненте
                let r_v = colors[e.v]
                // обновляем минимальное ребро у компоненты
                if (numMinEdges[r_v] === -1 || e.weight < edges[numMinEdges[r_v]].weight)
                    numMinEdges[r_v] = i
            }

            // добавление минимальных ребер к каждой компоненте (слияние компонент)
            for (let i = 0; i < this._matrix.length; i++) {
                if (numMinEdges[i] !== -1) {
                    // узнаем принадлежность к компонентам у обоих вершин из ребра
                    let r_u = colors[edges[numMinEdges[i]].u]
                    let r_v = colors[edges[numMinEdges[i]].v]
                    if (r_u === r_v) continue // случай когда ребро принадлежит одной компоненте - не подходит

                    // производим слияние компонент
                    for (let i = 0; i < this._matrix.length; i++) 
                        if (colors[i] === r_v) colors[i] = r_u
                    
                    tree.push(edges[numMinEdges[i]])
                    sum += edges[numMinEdges[i]].weight

                    countTree--
                }
            }
        }


        return [tree, sum]
    }

}

export default SpanningTree