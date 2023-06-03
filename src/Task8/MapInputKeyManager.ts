import InputKeyManager from "../modules/input/InputKeyManager"

class MapInputKeyManager extends InputKeyManager {
    public beginVertex?: [number, number]
    public endVertex?: [number, number]

    constructor() {
        super()

        for (let { flag, value } of this.params) {
            if (flag === "-n") this.beginVertex = value?.split(" ").map(e => parseInt(e)) as [number, number]
            if (flag === "-d") this.endVertex = value?.split(" ").map(e => parseInt(e)) as [number, number]

            // проверка, что карта задается через матрицу
            if (flag === "-l" || flag === "-e") {
                this.inputFileName = undefined
                this.strategyReading = undefined
                break
            }
        }   
    }
}

export default MapInputKeyManager