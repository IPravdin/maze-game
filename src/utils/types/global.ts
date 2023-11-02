export type SizeType = { width: number, height: number }
export type PositionType = { left: number, top: number }
export type CreatureSizeType = SizeType & {
  marginTop?: number,
  marginBottom?: number,
  marginLeft?: number,
  marginRight?: number
}
export type ChunkType = { x1: number, x2: number, y1: number, y2: number }