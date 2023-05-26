
type Props = {
    left: number,
    top: number,
    width: number,
    height: number
}
const Bonus = ({ left, top, width, height }: Props) => {
    return <div className='bonus' style={{ left, top, width, height }}/>
}

export default Bonus