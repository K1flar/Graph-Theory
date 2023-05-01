import Graph from "../modules/Graph/Graph";
import AbstractGraphCharacteristics from "./AbstractGraphCharacteristics";

class GraphCharacteristics extends AbstractGraphCharacteristics {
    constructor(graph: Graph) {
        super(graph)
    }

    public vertexDegrees(): number[] {
        let res: number[] = []
        for (let i = 0; i < this._matrix.length; i++) res[i] = 0
        for (let i = 0; i < this._matrix.length; i++)
            for (let j = 0; j < this._matrix.length; j++)
                res[i] += this._matrix[i][j] && 1
        return res
    }

    public diameter(): number | null {
        if (!this.isConnected()) return null
        return Math.max(...this.eccentricities() as number[])
    }

    public radius(): number | null {
        if (!this.isConnected()) return null
        return Math.min(...this.eccentricities() as number[])
    }

    public centralNodes(): number[] | null {
        if (!this.isConnected()) return null

        let res: number[] = []
        let eccentricities: number[] = this.eccentricities() as number[]
        let radius = this.radius()
        for (let i = 0; i < eccentricities.length; i++) if (eccentricities[i] === radius) res.push(i + 1)
        return res
    }

    public peripheralNodes(): number[] | null {
        if (!this.isConnected()) return null

        let res: number[] = []
        let eccentricities: number[] = this.eccentricities() as number[]
        let diameter = this.diameter()
        for (let i = 0; i < eccentricities.length; i++) if (eccentricities[i] === diameter) res.push(i + 1)
        return res
    }
}

export default GraphCharacteristics