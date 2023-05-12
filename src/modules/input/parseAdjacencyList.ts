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

        return matrix
    }
}

export default parseAdjacencyList