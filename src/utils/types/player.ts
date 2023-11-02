import { PositionType } from './global';

export type PlayerDataJsonType = {
  collectedBonuses: number,
  stepsWalked: number,
  currentPosition: PositionType,
  alive: boolean
}

export type PlayerMoveKeys = "ArrowRight" | "KeyD" | "ArrowLeft" | "KeyA" | "ArrowDown" | "KeyS" | "ArrowUp" | "KeyW";