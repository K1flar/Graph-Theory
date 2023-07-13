import InputKeyManager from "../modules/input/InputKeyManager"

class GeodesicsInputKeyManaher extends InputKeyManager {
    public beginVertex?: number
    public endVertex?: number
    
    constructor() {
        super()

        for (let { flag, value } of this.params) {
            if (flag === "-n") this.beginVertex = parseInt(value!)
            if (flag === "-d") this.endVertex = parseInt(value!)
        }
    }
}

export default GeodesicsInputKeyManaher