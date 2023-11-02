import { AppThunk } from '../index';
import { playerActions } from '../slices/player';
import { enemiesActions } from '../slices/enemies';
import { statsActions } from '../slices/stats';
import { mazeActions } from '../slices/maze';
import { SizeType } from '../../utils/types/global';

export const assignMazeDataToReducers = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  const maze = state.maze;
  
  dispatch(playerActions.setState({
    startCoord: maze.data.startCoord,
    cellSize: maze.params.cellSize
  }));
  
  dispatch(enemiesActions.setState({
    cellSize: maze.params.cellSize,
    mazeEnemies: maze.data.enemies
  }));
};

export const gameReset = (): AppThunk => (dispatch) => {
  dispatch(statsActions.reset());
  dispatch(mazeActions.reset());
};

export const resize = (size: SizeType): AppThunk => (dispatch) => {
  dispatch(mazeActions.resize(size));
};