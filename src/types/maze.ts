export type Orientation = 'top' | 'bottom' | 'left' | 'right'
export type Coordinate = {x: number, y: number}
export type EnhancedCoord = Coordinate & {o: Orientation}
export type Chunk = {x1: number, x2: number, y1: number, y2: number}


export type MazeCell = {
    coord: Coordinate,
    walkable: {
        top: boolean,
        bottom: boolean,
        left: boolean,
        right: boolean,
    }
    bonus: {
        placed: boolean,
        collected: boolean
    },
    enemy: {
        spawn: boolean,
        movement: boolean
    },
    startEnd: boolean,
    visited: boolean,
    priorPos: Coordinate | null
}

export type ModifiedDirs = {
    top: {
        y: -1,
        x: 0,
        o: "bottom"
    },
    bottom: {
        y: 1,
        x: 0,
        o: "top"
    },
    right: {
        y: 0,
        x: 1,
        o: "left"
    },
    left: {
        y: 0,
        x: -1,
        o: "right"
    }
}