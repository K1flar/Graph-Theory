class Cell {
    private _x: number
    private _y: number
    public parent?: Cell
    public fullDistance?: number
    public distanceFromStart?: number

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    get x(): number { return this._x }
    
    get y(): number { return this._y }
}

export default Cell