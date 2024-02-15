import { PositionType } from '../utils/types/global';
import { CreatureData } from './CreatureData';
import { CoordinateType } from '../utils/types/maze';
import { MazeEnemy } from '../utils/types/enemy';

export type CurrMovCoordType = {
  dirIndex: number,
  posInDir: number,
  prevPosInDir: number
}

type Props = MazeEnemy & {
  currentPosition: PositionType;
}

export class EnemyData extends CreatureData {
  readonly spawn: CoordinateType;
  readonly notSpawnRadius: CoordinateType[][];
  readonly movement: CoordinateType[][];
  public currMovCoord: CurrMovCoordType;
  public sprite: string;
  
  constructor({ currentPosition, spawn, movement, notSpawnRadius }: Props) {
    super(currentPosition);
    
    this.sprite = 'usr(\'/enemy/enemy-b.png\')';
    this.spawn = spawn;
    this.movement = movement;
    this.notSpawnRadius = notSpawnRadius;
    this.currMovCoord = {
      dirIndex: -1,
      posInDir: -1,
      prevPosInDir: -1
    };
  }
  
  toJson = () => {
    return {
      sprite: this.sprite,
      spawn: this.spawn,
      movement: this.movement,
      notSpawnRadius: this.notSpawnRadius,
      currMovCoord: this.currMovCoord,
      currentPosition: this.currentPosition,
      alive: this.alive,
    };
  };
}