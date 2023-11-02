import React from 'react';
import { CoordinateType } from '../../utils/types/maze';
import EnemyMovementCell from './EnemyMovementCell';

const EnemyMovementCells = ({ data, id, spawn }: { data: CoordinateType[][], id: number, spawn: CoordinateType }) => {
  return (
    <div>
      {data.map((movement, index2) => (
        movement.map((side, index3) => (
          <EnemyMovementCell
            key={id + index2 + index3}
            coord={side}
          />
        ))
      ))}
      <EnemyMovementCell coord={spawn}/>
    </div>
  );
};

export default EnemyMovementCells;