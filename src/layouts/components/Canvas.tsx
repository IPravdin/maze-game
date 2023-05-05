import {CanvasHTMLAttributes, DetailedHTMLProps, FC, useEffect, useRef} from "react";

type CanvasProps =
    DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>
    & {draw: (canvasContext: CanvasRenderingContext2D) => void}
const Canvas: FC<CanvasProps> = ({ draw, ...props}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const mazeCanv = canvasRef.current
        if (!mazeCanv) return
        const canvasContext = mazeCanv.getContext('2d')
        if (!canvasContext) return

        draw(canvasContext)

    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
}

export default Canvas