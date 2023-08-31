import {AppThunk} from "../index";
import {statsActions} from "./stats";
import {mazeActions} from "./maze";

export const gameReset = (): AppThunk => (dispatch) => {
    dispatch(statsActions.reset());
    dispatch(mazeActions.reset());
}