const parseParams = (): Param[] => {
    const argv: string[] = process.argv
    let params: Param[] = []

    for (let i = 0; i < argv.length; i++) {
        if (argv[i][0] === "-") {
            let param: Param = { } as Param
            param.flag = argv[i]
            if (argv[i + 1] && argv[i + 1][0] !== "-") {
                param.value = argv[i + 1]
                let j = i + 2
                while(argv[j] && argv[j][0] !== "-") param.value += ` ${argv[j++]}`
            }
            params.push(param)
        }
    }

    return params
}

export default parseParams