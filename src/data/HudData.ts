import { SizeType } from '../utils/types/global';

export class HudData {
  size: SizeType;
  cellAmount: number;
  cellSize: SizeType;
  
  constructor(size: SizeType, cellAmount: number) {
    this.size = size;
    this.cellAmount = cellAmount;
    
    this.cellSize = {
      height: size.height,
      width: size.width / cellAmount
    };
  }
}