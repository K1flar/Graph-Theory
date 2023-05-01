const parseAdjacencyList = (text: string) => {
    return (): number[][] => {
        let matrix: number[][] = []
        let parts: string[] = text.split('\n')

        for (let i = 0; i < parts.length; i++)
            matrix[i] = []

        for (let i = 0; i < matrix.length; i++)
            for (let j = 0; j < matrix.length; j++)
                matrix[i][j] = 0 

        for (let i = 0; i < matrix.length; i++) {
            let nodes: number[] = parts[i].trim().split(' ').map(node => parseInt(node) - 1)
            for (let j = 0; j < nodes.length; j++)
                matrix[i][nodes[j]] = 1
        }

        // parts.forEach(e => {
        //     let vertex: number = parseInt(e.split(' ')[0]) - 1
        //     matrix[vertex] = []
        // })

        // for (let i = 0; i < matrix.length; i++)
        //     for (let j = 0; j < matrix.length; j++)
        //         matrix[i][j] = 0

        // parts.forEach(e => {
        //     let nodes: number[] = e.split(' ').map(node => parseInt(node) - 1)
        //     let startNode: number = nodes[0]
        //     for (let i = 1; i < nodes.length; i++)
        //         matrix[startNode][nodes[i]] = 1 
        // })

        return matrix
    }
}

export default parseAdjacencyList