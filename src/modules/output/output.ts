const fs = require("fs")

const output = (outputFileName: string | undefined) => {
    if (outputFileName) {
        return (data: string): void => fs.appendFileSync(outputFileName, data)
    } else {
        return (data: string): void => console.log(data)
    }
}

export default output
