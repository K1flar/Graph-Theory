const parseParams = (): Param[] => {
    const argv: string[] = process.argv
    let params: Param[] = []

    for (let i = 0; i < argv.length; i++) {
        if (argv[i][0] === "-") {
            let param: Param = {flag: argv[i], value: undefined}
            if (argv[i + 1] && argv[i + 1][0] !== "-") param.value = argv[i + 1]
            params.push(param)
        }
    }

    return params
}

export default parseParams