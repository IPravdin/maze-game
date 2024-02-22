import { ChangeEvent } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const RangeInput = ({
  id,
  label,
  value,
  setRangeState,
  setDefault
}: {
  id: 'sound' | 'music',
  value: number,
  setRangeState: ({ target, volume }: { target: 'sound' | 'music', volume: number }) => void,
  setDefault: (target: 'sound' | 'music') => void,
  label: string
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    setRangeState({ target: id, volume: parseInt(e.target.value) });
  };
  
  return (
    <span>
      <label htmlFor={id}>{label}</label>
      <div className='flex justify-center items-center gap-3'>
        <button
          type='button'
          className='btn btn-ghost btn-circle'
          onClick={() => {
            if (value) {
              setRangeState({ target: id, volume: 0 });
            } else {
              setDefault(id);
            }
          }}
        >
          {value ? <Volume2/> : <VolumeX/>}
        </button>
        <input
          className='range'
          id={id}
          type='range'
          min={0}
          max={100}
          value={value}
          onChange={handleChange}
        />
      </div>
    </span>
  );
};

export default RangeInput;