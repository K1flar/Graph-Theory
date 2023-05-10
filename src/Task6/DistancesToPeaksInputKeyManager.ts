import InputKeyManager from "../modules/input/InputKeyManager"

class DistancesToPeaksInputKeyManager extends InputKeyManager {
    public beginVertex?: number
    public algorithm?: string 
    
    constructor () {
        super()
        
        for (let { flag, value } of this.params) {
            if (flag === "-n") this.beginVertex = parseInt(value!)
            if (flag === "-d" || flag === "-b" || flag === "-t") {
                if (this.algorithm) {
                    this.algorithm = undefined
                    break
                }
                this.algorithm = flag
            }
        }
    }
}

export default DistancesToPeaksInputKeyManager