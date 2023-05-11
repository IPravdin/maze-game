export type Orientation = 't' | 'b' | 'l' | 'r'
export type Coordinate = {x: number, y: number}
export type EnhancedCoord = Coordinate & {o: Orientation}
export type Chunk = {x1: number, x2: number, y1: number, y2: number}

export type MazeCell = {
    walkable: {
        t: boolean,
        b: boolean,
        l: boolean,
        r: boolean,
    }
    bonus: {
        placed: boolean,
        collected: boolean
    },
    enemyObject: {
        withEnemy: boolean
    },
    visited: boolean,
    priorPos: Coordinate | null
}

export type ModifiedDirs = {
    t: {
        y: -1,
        x: 0,
        o: "b"
    },
    b: {
        y: 1,
        x: 0,
        o: "t"
    },
    r: {
        y: 0,
        x: 1,
        o: "l"
    },
    l: {
        y: 0,
        x: -1,
        o: "r"
    }
}