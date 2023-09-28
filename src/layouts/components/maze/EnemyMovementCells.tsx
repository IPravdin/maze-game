import React from 'react';
import { CoordinateType } from '../../../utils/types/maze';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import EnemyMovementCell from './EnemyMovementCell';

const EnemyMovementCells = ({ data, id, spawn }: { data: CoordinateType[][], id: number, spawn: CoordinateType }) => {
  const cellSize = useSelector((state: RootState) => state.maze.params.cellSize);
  const movStyle = {
    width: cellSize.width,
    height: cellSize.height,
    backgroundImage: "url('/cells/enemy-movement.png')"
  }
  
  return (
    <>
      {data.map((movement, index2) => (
        movement.map((side, index3) => (
          <EnemyMovementCell
            key={id + index2 + index3}
            coord={side}
            movStyle={movStyle}
          />
        ))
      ))}
      <div
        key={id + ' spawn'}
        className='absolute bg-cover bg-no-repeat'
        style={{
          left: spawn.x * cellSize.width,
          top: spawn.y * cellSize.height,
          ...movStyle
        }}
      />
    </>
  );
}

export default EnemyMovementCells;