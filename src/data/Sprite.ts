

export class Sprite extends Image {
    constructor(src: string, width?: number, height?: number) {
        super(width, height)
        this.src = src + "?" + new Date().getTime()
        this.setAttribute("crossOrigin", " ")
    }
}