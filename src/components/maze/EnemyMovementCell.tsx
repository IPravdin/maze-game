import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CoordinateType } from '../../utils/types/maze';
import { objectsEqual, positionToCoord } from '../../utils/helpers';
import { useSoundPlayer } from '../../utils/hooks/useSoundPlayer';

const EnemyMovementCell = ({
  coord
}: {
  coord: CoordinateType
}) => {
  const soundPlayer = useSoundPlayer();
  const player = useSelector((state: RootState) => state.player);
  const cellSize = useSelector((state: RootState) => state.maze.params.cellSize);
  
  const movStyle = {
    width: cellSize.width,
    height: cellSize.height,
    backgroundImage: "url('/cells/enemy-movement.png')"
  }
  
  useEffect(() => {
    const playEnemySound = () => {
      if (!player.data) return;
      
      const playerPos = positionToCoord(player.data.currentPosition, cellSize);
      
      if (objectsEqual(playerPos, coord)) {
        soundPlayer.play('enemy');
      }
    }
    
    playEnemySound();
  }, [player.data?.currentPosition]);
  
  return (
    <div
      className='absolute bg-cover bg-no-repeat'
      style={{
        left: coord.x * cellSize.width,
        top: coord.y * cellSize.height,
        ...movStyle
      }}
    >
      {/*{coord.x} | {coord.y}*/}
    </div>
  );
}

export default EnemyMovementCell;