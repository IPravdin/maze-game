import {Coordinate, EnemySpawnCoords, MazeCell, ModifiedDirs, Orientation} from "../types/maze";
import {returnRand, returnRandomInt, shuffle} from "../helpers/mazeStructure";
import {ChunkType, SizeType} from "../types/global";

export class MazeData {
    readonly size: SizeType
    readonly bonuses: number;
    readonly enemies: number;
    readonly mazeMap: MazeCell[][];
    readonly startCoord: Coordinate;
    readonly endCoord: Coordinate;
    readonly directions: Orientation[];
    readonly modifiedDir: ModifiedDirs;
    constructor(size: SizeType, bonuses: number, enemies: number) {
        this.size = size
        this.bonuses = bonuses
        this.enemies = enemies
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

        this.defineEnemyPlaces()
        this.defineBonusPlaces(startCord, endCord)
    }

    private generateMap = (): MazeCell[][] => {
        let mazeMap = new Array(this.size.width);
        for (let x = 0; x < this.size.width; x++) {
            mazeMap[x] = new Array(this.size.height);
            for (let y = 0; y < this.size.height; ++y) {
                mazeMap[x][y] = {
                    coord: {x, y},
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
                    enemy: {
                        spawn: false,
                        movement: false
                    },
                    startEnd: false,
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
        let numCells = this.size.width * this.size.height;

        // For each Cell on Map
        while (!isCompleted) {
            moveToNext = false;
            this.mazeMap[pos.x][pos.y].visited = true;

            if (numLoops >= maxLoops) {
                shuffle(this.directions);
                maxLoops = Math.round(returnRand(this.size.height / 8));
                numLoops = 0;
            }
            numLoops++;

            // For each Cell's side: n, s, e, w
            for (let index = 0; index < this.directions.length; index++) {
                let direction = this.directions[index]; // either n, s, e, w
                const nx = pos.x + this.modifiedDir[direction].x;
                const ny = pos.y + this.modifiedDir[direction].y;

                if (nx >= 0 && nx < this.size.width && ny >= 0 && ny < this.size.height) {
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
                    x: this.size.width - 1,
                    y: this.size.height - 1
                };
                break;
            case 1:
                startCoord = {
                    x: 0,
                    y: this.size.height - 1
                };
                endCoord = {
                    x: this.size.width - 1,
                    y: 0
                };
                break;
            case 2:
                startCoord = {
                    x: this.size.width - 1,
                    y: 0
                };
                endCoord = {
                    x: 0,
                    y: this.size.height - 1
                };
                break;
            default:
                startCoord = {
                    x: this.size.width - 1,
                    y: this.size.height - 1
                };
                endCoord = {
                    x: 0,
                    y: 0
                };
                break;
        }

        this.mazeMap[startCoord.x][startCoord.y].startEnd = true
        this.mazeMap[endCoord.x][endCoord.y].startEnd = true

        return {startCord: startCoord, endCord: endCoord}
    }

    private defineEnemyPlaces = () => {
        const spawnCells: MazeCell[] = this.returnSuitableSpawnCells()
        const selectedCells: EnemySpawnCoords[] = []

        for(let i = 0; i < this.enemies; i++) {
            this.defineEnemyCell(spawnCells, selectedCells)
        }
    }

    private returnSuitableSpawnCells = () => {
        const spawnCells: MazeCell[] = []
        this.mazeMap.forEach((row) => {
            row.forEach((cell) => {
                if (cell.startEnd) return

                let walkways = 0

                Object.values(cell.walkable).forEach((dir) => {
                    if (dir) {
                        walkways++
                }})

                if (walkways > 2) {
                    spawnCells.push(cell)
                }

            })
        })

        return spawnCells
    }

    private defineEnemyCell = (spawnCells: MazeCell[], enemySpawnCoords: EnemySpawnCoords[]) => {
        const selectedIndex = returnRandomInt(0, spawnCells.length - 1)
        const selectedCell = spawnCells.splice(selectedIndex, 1)[0]

        const selectedCellInOtherRadius = !!enemySpawnCoords?.find((enemy) =>
            enemy.notSpawnRadius?.find((x) =>
                x.find((cell) => selectedCell.coord.x === cell.x || selectedCell.coord.y === cell.y)))


        if (selectedCellInOtherRadius) {
            this.defineEnemyCell(spawnCells, enemySpawnCoords)
            return;
        }

        selectedCell.enemy.spawn = true
        selectedCell.enemy.movement = true

        this.defineEnemyMovementCell(selectedCell)
        this.recordEnemySpawnCoords(selectedCell, enemySpawnCoords)
    }

    private recordEnemySpawnCoords = (currentCell: MazeCell, enemySpawnCoords: EnemySpawnCoords[]) => {
        const radius = 2

        const startX = currentCell.coord.x - 2;
        const startY = currentCell.coord.y - 2;
        const diameterX = radius * 2 + 1;
        const diameterY = radius * 2 + 1;

        let notSpawnRadius = new Array(diameterX);
        for (let x = 0; x < diameterX; x++) {
            notSpawnRadius[x] = [];
            for (let y = 0; y < diameterY; y++) {
                const newX = startX + x;
                const newY = startY + y;

                // Checks if went out of map boundaries
                if (
                    newX >= 0 && newX < this.size.width
                    && newY < this.size.height && newY >= 0
                ) {
                    notSpawnRadius[x].push({
                        x: newX,
                        y: newY
                    })
                }
            }
        }

        enemySpawnCoords.push({
            coord: currentCell.coord,
            notSpawnRadius
        })
    }

    private defineEnemyMovementCell = (cell: MazeCell) => {
        Object.keys(cell.walkable).forEach((key )=> {
            // @ts-ignore
            if (cell.walkable[key]) {
                this.defineNextMovement(key as Orientation, cell)
            }
        })
    }

    private defineNextMovement = (mode: Orientation, startCell: MazeCell) => {
        let neighbour = this.returnNextMovementCell(mode, startCell)
        neighbour.enemy.movement = true

        // Selects next cell
        const cameFrom = this.modifiedDir[mode].o
        const nextOrientation: Orientation | undefined =
            Object.keys(neighbour.walkable).find((key) => key !== cameFrom && neighbour.walkable[key as Orientation]) as Orientation

        if (nextOrientation) {
            const next = this.returnNextMovementCell(nextOrientation, neighbour)
            next.enemy.movement = true
        }
    }

    private returnNextMovementCell = (mode: Orientation, startCell: MazeCell) => {
        let nextCell: MazeCell
        switch (mode) {
            case 'top':
                nextCell = this.mazeMap[startCell.coord.x][startCell.coord.y - 1]
                break;
            case 'bottom':
                nextCell = this.mazeMap[startCell.coord.x][startCell.coord.y + 1]
                break;
            case 'left':
                nextCell = this.mazeMap[startCell.coord.x - 1][startCell.coord.y]
                break;
            case 'right':
                nextCell = this.mazeMap[startCell.coord.x + 1][startCell.coord.y]
                break;
        }

        return nextCell
    }

    private defineBonusPlaces = (playerStartCoord: Coordinate, finishCoord: Coordinate) =>  {
        const bonuses = this.bonuses
        const chunks: ChunkType[] = this.returnChunks(this.size)

        for(let i = 0; i < bonuses; i++) {
            this.defineBonus(chunks, playerStartCoord, finishCoord)
        }
    }

    private defineBonus = (chunks: ChunkType[], playerStartCoord: Coordinate, finishCoord: Coordinate) => {
        const selectedChunk = returnRandomInt(0, 3)
        const {x1, x2, y1, y2} = chunks[selectedChunk]

        const selectedX = returnRandomInt(x1, x2)
        const selectedY = returnRandomInt(y1, y2)

        const selectedCell = this.mazeMap[selectedX][selectedY]

        // ** Check if place is not occupied by start and end points
        if(selectedCell.startEnd) {
            this.defineBonus(chunks, playerStartCoord, finishCoord)
            return
        }

        // ** Check if place is not occupied by another bonus
        if (selectedCell.bonus.placed) {
            this.defineBonus(chunks, playerStartCoord, finishCoord)
            return
        }
        // ** Check if place is not occupied by enemy spawn or movement trajectory
        if (selectedCell.enemy.spawn || selectedCell.enemy.movement) {
            this.defineBonus(chunks, playerStartCoord, finishCoord)
            return
        }

        selectedCell.bonus.placed = true
    }

    private returnChunks = (mazeSize: SizeType) => {
        const borderX = Math.floor(mazeSize.width / 2)
        const borderY = Math.floor(mazeSize.height / 2)

        return [
            {
                x1: 0,
                y1: 0,
                x2: borderX - 1,
                y2: borderY - 1
            },
            {
                x1: borderX,
                y1: 0,
                x2: mazeSize.width - 1,
                y2: borderY - 1
            },
            {
                x1: 0,
                y1: borderY,
                x2: borderX - 1,
                y2: mazeSize.height - 1
            },
            {
                x1: borderX,
                y1: borderY,
                x2: mazeSize.width - 1,
                y2: mazeSize.height - 1
            },
        ]
    }
}

