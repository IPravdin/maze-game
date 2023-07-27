import {AppThunk} from "../index";
import {playerActions} from "./player";
import {enemiesActions} from "./enemies";

export const initialMazeFetch = (): AppThunk => (dispatch, getState) => {
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