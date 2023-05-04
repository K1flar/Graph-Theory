import InputKeyManager from "../modules/input/InputKeyManager"

class SpanningTreeInputKeyManager extends InputKeyManager {
    public readonly algorithms?: string[] 
    
    constructor() {
        super()

        for(let { flag } of this.params) { 
            if (flag === "-k" || flag === "-p" || flag === "-b" || flag === "-s") {
                if (this.algorithms) {
                    this.algorithms = undefined
                    break
                }
                if (flag === "-s") this.algorithms = ["-k", "-p", "-b"]
                else this.algorithms = [ flag ]
            }
        }
    }
}

export default SpanningTreeInputKeyManager