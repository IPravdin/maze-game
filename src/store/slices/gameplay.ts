import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerMoveKeys } from '../../utils/types/player';

type FrozenModeType = 'won' | 'lost' | 'pause' | 'none';

type StateType = {
  frozen: boolean,
  playerMoveDir: PlayerMoveKeys | null,
  frozenMode: FrozenModeType,
  musicVolume: number,
  soundVolume: number,
  firstLaunch: boolean,
  tutorial: boolean,
  titleScreen: boolean,
}
const gameplayInitialState: StateType = {
  frozen: false,
  frozenMode: 'none',
  playerMoveDir: null,
  musicVolume: 10,
  soundVolume: 10,
  firstLaunch: true,
  tutorial: true,
  titleScreen: false,
};
const gameplaySlice = createSlice({
  name: 'gameplay',
  initialState: gameplayInitialState,
  reducers: {
    froze(state, action: PayloadAction<FrozenModeType>) {
      state.frozenMode = action.payload;
      state.frozen = true;
    },
    unfroze(state) {
      state.frozen = false;
      state.frozenMode = 'none';
    },
    playerMove(state, action: PayloadAction<PlayerMoveKeys | null>) {
      state.playerMoveDir = action.payload;
    },
    
    setVolume(state, action: PayloadAction<{ target: 'music' | 'sound', volume: number }>) {
      if (action.payload.target === 'music') {
        state.musicVolume = action.payload.volume;
      } else {
        state.soundVolume = action.payload.volume;
      }
    },
    setVolumeDefault(state, action: PayloadAction<'music' | 'sound'>) {
      if (action.payload === 'music') {
        state.musicVolume = gameplayInitialState.musicVolume;
      } else {
        state.soundVolume = gameplayInitialState.soundVolume;
      }
    },
    setFirstLaunchOff(state) {
      state.firstLaunch = false;
    },
    setTutorial(state) {
      state.tutorial = !state.tutorial;
    }
  }
});

export const gameplayActions = gameplaySlice.actions;
export const gameplayReducer = gameplaySlice.reducer;

