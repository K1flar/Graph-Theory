interface Edge {
    startNode: number,
    endNode: number,
    weight: number
}

const parseEdgesList = (text: string) => {
    return (): number[][] => {
        let matrix: number[][] = []
        let edges: string[] = text.split('\n')
        let n = 0;

        edges.forEach(e => {
            let [start, end] = e.trim().split(' ')
            n = Math.max(n, parseInt(start), parseInt(end))
        })

        for (let i = 0; i < n; i++)
            for (let j = 0; j < n; j++) {
                matrix[i] = matrix[i] || []
                matrix[i][j] = 0
            }

        edges.forEach(e => {
            let parts = e.split(' ')
            let edge: Edge = {} as Edge
            edge.startNode = parseInt(parts[0]) - 1
            edge.endNode = parseInt(parts[1]) - 1
            edge.weight = parseInt(parts[2]) || 1

            matrix[edge.startNode][edge.endNode] = edge.weight
        })
        
        return matrix
    }
}

export default parseEdgesList