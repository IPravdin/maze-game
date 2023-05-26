

export class Player {
    position: {left: number, top: number}
    collectedBonuses: number
    constructor(left: number, top: number) {
        this.collectedBonuses = 0
        this.position = {left, top}
    }
}