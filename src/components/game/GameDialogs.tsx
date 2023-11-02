import PauseDialog from '../menu/PauseDialog';
import React from 'react';
import CongratsDialog from './CongratsDialog';
import LooseDialog from './LooseDialog';

export default function GameDialogs() {
  return (
    <>
      <CongratsDialog/>
      <LooseDialog/>
      <PauseDialog/>
    </>
  );
}