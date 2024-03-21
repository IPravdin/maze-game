import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreatureSizeType, SizeType } from '../../utils/types/global';
import { EnemySpeed } from '../../utils/enums/enemy-speed';
import { MazeEnemy } from '../../utils/types/enemy';
import { CoordinateType } from '../../utils/types/maze';
import { gameplayActions } from './gameplay';
import getCreatureSize, { initialCreatureSize } from './get-creature-size';

const initialState: EnemiesState = {
  params: {
    size: initialCreatureSize,
    defaultSpeed: EnemySpeed.stop,
    speed: EnemySpeed.stop,
  },
  data: {
    enemiesCurCoords: null
  }
};

const enemiesSlice = createSlice({
  name: 'enemies',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<{ cellSize: SizeType, mazeEnemies: MazeEnemy[] }>) {
      const { cellSize, mazeEnemies } = action.payload;
      const defaultSpeed = EnemySpeed.medium;
      
      state.params = {
        size: getCreatureSize(cellSize),
        defaultSpeed: defaultSpeed,
        speed: defaultSpeed,
      };
      
      state.data.enemiesCurCoords = mazeEnemies.map((enemy) => enemy.spawn);
    },
    setDefaultSpeed(state, action: PayloadAction<EnemySpeed>) {
      state.params.defaultSpeed = action.payload;
    },
    recordCoord(state, action: PayloadAction<{ id: number, newCoord: CoordinateType }>) {
      if (!state.data.enemiesCurCoords) return;
      const { id, newCoord } = action.payload;
      
      state.data.enemiesCurCoords[id] = newCoord;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(gameplayActions.froze, (state) => {
        state.params.speed = EnemySpeed.stop;
      })
      .addCase(gameplayActions.unfroze, (state) => {
        state.params.speed = state.params.defaultSpeed;
      });
    
  }
});

type EnemiesState = {
  params: {
    size: CreatureSizeType,
    defaultSpeed: EnemySpeed,
    speed: EnemySpeed
  },
  data: {
    enemiesCurCoords: CoordinateType[] | null
  }
}
export const enemiesActions = enemiesSlice.actions;
export const enemiesReducer = enemiesSlice.reducer;