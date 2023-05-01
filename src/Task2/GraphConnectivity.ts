import Graph from "../modules/Graph/Graph"
import AbstractGraphConnectivity from "./AbstractGraphConnectivity"

class GraphConnectivity extends AbstractGraphConnectivity{
    constructor(graph: Graph) {
        super(graph)
    }

    public connectivityComponents(): number[][] {
        return this.components()
    }

}

export default GraphConnectivity