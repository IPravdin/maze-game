import { mazeActions } from '../../store/slices/maze';
import { mazeFetch } from '../../store/slices/maze-fetch';
import { gameplayActions } from '../../store/slices/gameplay';
import routerLinks from '../../router-links';
import Dialog from '../Dialog';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export default function LooseDialog() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const gameplay = useSelector((state: RootState) => state.gameplay);
  
  return (
    <Dialog
      open={gameplay.frozenMode === 'lost'}
      id="lost_modal"
      title="Looser"
      content={<p className="py-4">Ups... Do you wanna try again?</p>}
      btnSuccess="One more try"
      btnError="Leave Game"
      onSuccessClick={() => {
        // @ts-ignore
        dispatch(mazeFetch());
      }}
      onErrorClick={() => {
        dispatch(gameplayActions.unfroze());
        navigate(routerLinks.menu);
      }}
      onClose={() => {
        dispatch(mazeActions.generateOneMore());
        dispatch(gameplayActions.unfroze());
      }}
    />
  );
}