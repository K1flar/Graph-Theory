interface IinputKeyManager {
    inputFileName: string | undefined,
    strategyReading: () => number[][],
    outputFileName: string | undefined,
    isHelp: boolean
}

type Strategy = {
    [flag: string]: (text: string) => () => number[][]
}

type Param = {
    flag: string,
    value: string | undefined
}

type KeyMatching<T extends IinputKeyManager = IinputKeyManager> = {
    [key: string]: keyof T
}

type TVertexDegrees = {
    input: number[],
    output: number[]
}