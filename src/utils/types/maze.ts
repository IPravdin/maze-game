import { MazeEnemy } from './enemy';

export type OrientationType = 'top' | 'bottom' | 'left' | 'right';
export type CoordinateType = { x: number, y: number };

export type MazeCell = {
  coord: CoordinateType,
  walkable: {
    top: boolean,
    bottom: boolean,
    left: boolean,
    right: boolean,
  }
  bonus: {
    placed: boolean,
    collected: boolean
  },
  enemy: {
    spawn: boolean,
    movement: boolean
  },
  startEnd: {
    start: boolean,
    end: boolean
  },
  visited: boolean,
  priorPos: CoordinateType | null
};

export type ModifiedDirs = {
  top: {
    y: -1,
    x: 0,
    o: 'bottom'
  },
  bottom: {
    y: 1,
    x: 0,
    o: 'top'
  },
  right: {
    y: 0,
    x: 1,
    o: 'left'
  },
  left: {
    y: 0,
    x: -1,
    o: 'right'
  }
};

export type MazeDataJsonType = {
  enemies: MazeEnemy[],
  mazeMap: MazeCell[][],
  startCoord: CoordinateType,
  endCoord: CoordinateType,
};