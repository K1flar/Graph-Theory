import InputKeyManager from "../modules/input/InputKeyManager"

class ShortestHamiltonianKeyManager extends InputKeyManager {
    public beginVertex?: number

    constructor() {
        super()
    
        for (let { flag, value } of this.params) {
            if (flag === "-n") this.beginVertex = parseInt(value!) - 1
        }
    }
}

export default ShortestHamiltonianKeyManager