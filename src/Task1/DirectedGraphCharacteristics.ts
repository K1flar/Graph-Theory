import { AnyTxtRecord } from "dns";
import Graph from "../modules/Graph/Graph";
import AbstractGraphCharacteristics from "./AbstractGraphCharacteristics";

class DirectedGraphCharacteristics extends AbstractGraphCharacteristics {
    constructor(graph: Graph) {
        super(graph)
    }

    public vertexDegrees(): TVertexDegrees {
        let res: TVertexDegrees = {input: [], output: []} as TVertexDegrees
        for (let i = 0; i < this._matrix.length; i++) res.input[i] = res.output[i] = 0

        for (let i = 0; i < this._matrix.length; i++)
            for (let j = 0; j < this._matrix.length; j++) {
                res.input[j] += this._matrix[j][i] && 1
                res.output[i] += this._matrix[i][j] && 1
            }                 

        return res
    }
}

export default DirectedGraphCharacteristics