import {Chunk, Coordinate, MazeCell, ModifiedDirs, Orientation} from "../types/maze";
import {returnRand, returnRandomInt, shuffle} from "../helpers/mazeStructure";

export class MazeData {
    width: number;
    height: number;
    minStars: number;
    mazeMap: MazeCell[][];
    startCoord: Coordinate;
    endCoord: Coordinate;
    directions: Orientation[];
    modifiedDir: ModifiedDirs;
    constructor(mazeWidth: number, mazeHeight: number, minStars: number) {
        this.width = mazeWidth
        this.height = mazeHeight
        this.minStars = minStars
        this.mazeMap = this.generateMap()
        this.directions = ["top", "bottom", "left", "right"]
        this.modifiedDir = {
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

        this.defineMaze()

        const {startCord, endCord} = this.defineStartEnd()
        this.startCoord = startCord
        this.endCoord = endCord

        this.defineBonusPlaces(startCord, endCord)
    }

    private generateMap = (): MazeCell[][] => {
        let mazeMap = new Array(this.height);
        for (let x = 0; x < this.height; x++) {
            mazeMap[x] = new Array(this.width);
            for (let y = 0; y < this.width; ++y) {
                mazeMap[x][y] = {
                    walkable: {
                        top: false,
                        bottom: false,
                        left: false,
                        right: false,
                    },
                    bonus: {
                        placed: false,
                        collected: false
                    },
                    enemy: false,
                    visited: false,
                    priorPos: null
                };
            }
        }

        return mazeMap
    }

    private defineMaze = () => {
        let isCompleted = false; // Toggle to stop Maze generation
        let moveToNext = false;
        let cellsVisited = 1; // Cells that have been generated
        let numLoops = 0;
        let maxLoops = 0;
        let pos = {
            x: 0,
            y: 0
        };
        let numCells = this.width * this.height;

        // For each Cell on Map
        while (!isCompleted) {
            moveToNext = false;
            this.mazeMap[pos.x][pos.y].visited = true;

            if (numLoops >= maxLoops) {
                shuffle(this.directions);
                maxLoops = Math.round(returnRand(this.height / 8));
                numLoops = 0;
            }
            numLoops++;

            // For each Cell's side: n, s, e, w
            for (let index = 0; index < this.directions.length; index++) {
                let direction = this.directions[index]; // either n, s, e, w
                const nx = pos.x + this.modifiedDir[direction].x;
                const ny = pos.y + this.modifiedDir[direction].y;

                if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
                    //Check if the tile is already visited
                    if (!this.mazeMap[nx][ny].visited) {
                        //Carve through walls from this tile to next
                        this.mazeMap[pos.x][pos.y].walkable[direction] = true;
                        this.mazeMap[nx][ny].walkable[this.modifiedDir[direction].o] = true;

                        //Set Currentcell as next cells Prior visited
                        this.mazeMap[nx][ny].priorPos = pos;
                        //Update Cell position to newly visited location
                        pos = {
                            x: nx,
                            y: ny
                        };
                        cellsVisited++;
                        //Recursively call this method on the next tile
                        moveToNext = true;
                        break;
                    }
                }
            }

            if (!moveToNext) {
                //  If it failed to find a direction,
                //  move the current position back to the prior cell and Recall the method.
                pos = this.mazeMap[pos.x][pos.y].priorPos!;
            }
            if (numCells === cellsVisited) {
                isCompleted = true;
            }
        }
    }

    private defineStartEnd = (): { startCord: Coordinate, endCord: Coordinate } => {
        let startCoord, endCoord

        switch (returnRand(4)) {
            case 0:
                startCoord = {
                    x: 0,
                    y: 0
                };
                endCoord = {
                    x: this.height - 1,
                    y: this.width - 1
                };
                break;
            case 1:
                startCoord = {
                    x: 0,
                    y: this.width - 1
                };
                endCoord = {
                    x: this.height - 1,
                    y: 0
                };
                break;
            case 2:
                startCoord = {
                    x: this.height - 1,
                    y: 0
                };
                endCoord = {
                    x: 0,
                    y: this.width - 1
                };
                break;
            default:
                startCoord = {
                    x: this.height - 1,
                    y: this.width - 1
                };
                endCoord = {
                    x: 0,
                    y: 0
                };
                break;
        }

        return {startCord: startCoord, endCord: endCoord}
    }

    private defineBonusPlaces = (playerStartCoord: Coordinate, finishCoord: Coordinate) =>  {
        const bonuses = this.minStars
        const chunks = returnChunks(bonuses, this.width, this.height )
        const selectedChunks = returnSelectedChucks(bonuses, chunks)

        for(let i = 0; i < selectedChunks.length; i++) {
            const {x, y} = this.defineBonusPlace(selectedChunks[i], playerStartCoord, finishCoord)

            this.mazeMap[x][y].bonus.placed = true
        }
    }

    private defineBonusPlace = (chunk: Chunk, playerStartCoord: Coordinate, finishCoord: Coordinate): Coordinate => {
        let isValid = false

        let xCord: number
        let yCord: number
        while(!isValid) {
            xCord = returnRandomInt(chunk.x1, chunk.x2)
            yCord = returnRandomInt(chunk.y1, chunk.y2)

            // Checks whether bonus is not on the same place as playerStartCoord and finishCoord
            if (xCord !== playerStartCoord.x && xCord !== finishCoord.x) {
                if (yCord !== playerStartCoord.y && yCord !== finishCoord.y) {
                    isValid = true
                }
            }
            // TODO: add check for enemies spawn point
        }

        return {x: xCord!, y: yCord!}
    }
}

const returnChunks = (bonuses: number, mazeWidth: number, mazeHeight: number) => {
    const widthChunkSize = Math.floor(mazeWidth / bonuses)
    const heightChunkSize = Math.floor(mazeHeight / bonuses)

    let chunks: Chunk[] = []
    for (let x = 0; x < mazeWidth; x = x + widthChunkSize) {
        for (let y = 0; y < mazeHeight; y = y + heightChunkSize) {
            const x1Cord = x
            const x2Cord = x + widthChunkSize - 1
            const y1Cord = y
            const y2Cord = y + heightChunkSize - 1

            if (x2Cord < mazeWidth) {
                if(y2Cord < mazeHeight) {
                    chunks.push({
                        x1: x1Cord,
                        x2: x2Cord,
                        y1: y1Cord,
                        y2: y2Cord
                    })
                }
            }
        }
    }

    return chunks
}

const returnSelectedChucks = (bonuses: number, chunks: Chunk[]) => {
    let selectedChunks: Chunk[] = []
    let genIndexes: number[] = []
    let i = 0
    // Rand select chunks
    while(i < bonuses) {
        const index = returnRandomInt(0, chunks.length - 1)
        const isGen = genIndexes.includes(index)

        if (!isGen) {
            genIndexes.push(index)
            selectedChunks.push(chunks[index])
            i++
        }

    }

    return selectedChunks
}