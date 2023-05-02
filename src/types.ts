type Strategy = {
    [flag: string]: (text: string) => () => number[][]
}

type Param = {
    flag: string,
    value?: string
}

type TVertexDegrees = {
    input: number[],
    output: number[]
}

type Edge = {
    v: number,
    u: number,
    weight: number
}