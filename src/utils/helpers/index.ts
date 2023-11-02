import { CoordinateType, OrientationType } from '../types/maze';
import { PositionType, SizeType } from '../types/global';

export const shuffle = (a: OrientationType[]) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  
  return a;
};

export const returnRand = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const returnRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const objectsEqual = (obj1: Object, obj2: Object) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const coordToPosition = (coord: CoordinateType, cellSize: SizeType): PositionType => {
  return {
    left: +(coord.x * cellSize.width).toFixed(),
    top: +(coord.y * cellSize.height).toFixed()
  };
};

export const positionToCoord = (position: PositionType, cellSize: SizeType): CoordinateType => {
  return {
    x: +(position.left / cellSize.width).toFixed(),
    y: +(position.top / cellSize.height).toFixed()
  };
};

export function returnBonusCollectionRate(bonusesCollected: number, bonusesTotal: number) {
  return bonusesCollected / bonusesTotal;
}