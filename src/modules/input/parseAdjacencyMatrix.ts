const parseAdjacencyMatrix = (text: string) => {
    return (): number[][] => {
        let matrix:number[][] = []
        let parts: string[] = text.split('\n')
        let n = parts.length

        for (let i = 0; i < n; i++) {
            let row: string[] = parts[i].trim().split(' ')
            matrix[i] = row.map(e => parseInt(e))
        }

        return matrix
    }
}

export default parseAdjacencyMatrix