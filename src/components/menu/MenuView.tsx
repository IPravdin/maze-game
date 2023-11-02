import { ReactNode } from 'react';
import SvgTitle from '../../assets/icons/title';

type Props = {
  title?: string,
  startTitle?: boolean,
  content?: ReactNode,
  cardActions?: ReactNode,
}
const MenuView = ({ title, startTitle = false, content, cardActions }: Props) => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      {startTitle && (
        <div className='flex justify-center py-40'>
          <SvgTitle/>
        </div>
      )}
      <div className={`w-[46rem] m-auto ${startTitle ? 'mt-0' : ''}`}>
        <div className='card w-full h-full'>
          <div className='card-body w-full h-full'>
            {title && (
              <h1 className={`card-title justify-center font-title font-extralight text-2xl`}>
                {title}
              </h1>
            )}
            {content}
            {cardActions && <div className='card-actions justify-center'>{cardActions}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuView;