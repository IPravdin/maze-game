import {CanvasHTMLAttributes, DetailedHTMLProps, FC, useEffect, useRef} from "react";

type CanvasProps =
    DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
    & {draw: (canvasContext: CanvasRenderingContext2D) => void}
const Canvas: FC<CanvasProps> = ({ draw, ...props}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    let firstTime = true

    useEffect(() => {
        const canvasContext = canvasRef.current?.getContext('2d')

        if (!canvasContext) return

        draw(canvasContext)

        if (firstTime) {
            console.log(firstTime)
            firstTime = false
        }


    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas