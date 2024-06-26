import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerData } from '../../data/PlayerData';
import { coordToPosition } from '../../utils/helpers';
import { CoordinateType, OrientationType } from '../../utils/types/maze';
import { CreatureSizeType, PositionType, SizeType } from '../../utils/types/global';
import getCreatureSize, { initialCreatureSize } from './get-creature-size';
import { PlayerDataJsonType, PlayerMoveKeys } from '../../utils/types/player';

const playerSprite = (character: 'male' | 'female') => ({
  top: `url('/player/${character}/player-t.png')`,
  bottom: `url('/player/${character}/player-b.png')`,
  left: `url('/player/${character}/player-l.png')`,
  right: `url('/player/${character}/player-r.png')`,
  dead: `url('/player/${character}/player-dead.png')`
});

const initialState: PlayerState = {
  params: {
    startCoord: { x: 0, y: 0 },
    playerSize: initialCreatureSize,
    character: 'male',
    sprite: playerSprite('male').bottom,
    playerMoveDir: null,
  },
  data: null
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<{ startCoord: CoordinateType, cellSize: SizeType }>) {
      const { startCoord, cellSize } = action.payload;
      
      state.params = {
        ...state.params,
        startCoord,
        playerSize: getCreatureSize(cellSize),
        sprite: playerSprite(state.params.character).bottom,
        playerMoveDir: null
      };
      
      state.data = new PlayerData(coordToPosition(startCoord, cellSize)).toJson();
    },
    collectBonus(state) {
      if (!state.data) return;
      
      state.data.collectedBonuses++;
    },
    recordStep(state) {
      if (!state.data) return;
      
      state.data.stepsWalked++;
    },
    move(state, actions: PayloadAction<PositionType>) {
      if (!state.data) return;
      
      state.data.currentPosition = actions.payload;
    },
    setPlayerMoveDir(state, action: PayloadAction<PlayerMoveKeys | null>) {
      state.params.playerMoveDir = action.payload;
    },
    kill(state) {
      if (!state.data) return;
      
      state.data.alive = false;
      state.params.sprite = playerSprite(state.params.character).dead;
    },
    changeSprite(state, actions: PayloadAction<OrientationType>) {
      state.params.sprite = playerSprite(state.params.character)[actions.payload];
    },
    changeCharacter(state, actions: PayloadAction<'male' | 'female'>) {
      state.params.character = actions.payload;
      state.params.sprite = playerSprite(state.params.character).bottom;
    },
  },
});

type PlayerState = {
  params: {
    startCoord: CoordinateType,
    playerSize: CreatureSizeType,
    sprite: string,
    character: 'male' | 'female',
    playerMoveDir: PlayerMoveKeys | null,
  },
  data: PlayerDataJsonType | null
}

export const playerActions = playerSlice.actions;
export const playerReducer = playerSlice.reducer;