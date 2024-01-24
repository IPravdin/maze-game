import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { statsActions } from '../../store/slices/stats';

export default function NameInput() {
  const dispatch = useDispatch();
  const stats = useSelector((state: RootState) => state.stats);
  
  return (
    <div className='flex items-center justify-center'>
      <div className='flex gap-2'>
        <label className='label label-text'>
          Hi! How can I call you?
        </label>
        <input
          defaultValue={stats.current.name}
          type='text'
          placeholder={stats.current.name}
          className='input input-bordered max-w-xs'
          onBlur={(e) => {
            const newName = e.target.value;
            if (newName) dispatch(statsActions.changeName(newName));
          }}
          onKeyDown={(e) => {
            // Fixes bug when keys are not recognised
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
}