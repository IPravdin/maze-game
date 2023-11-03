import { ReactNode, useEffect, useRef } from 'react';

interface Props {
  id: string,
  title?: string,
  content?: ReactNode,
  open: boolean,
  onOpen?: () => void,
  onClose?: () => void,
  btnError?: string,
  onErrorClick?: () => void,
  btnSuccess?: string,
  onSuccessClick?: () => void,
}

const Dialog = ({
  id,
  title,
  content,
  open,
  onOpen,
  onClose,
  btnError,
  btnSuccess,
  onErrorClick,
  onSuccessClick
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!open) return;
    
    if (onOpen) onOpen();
    
    ref.current?.showModal();
    
    return () => ref.current?.close();
  }, [open, ref]);
  
  return (
    <dialog id={id} className='modal' onClose={onClose} ref={ref}>
      <form method='dialog' className='modal-box w-[48rem] max-w-[48rem]'>
        {title && <h3 className='font-title text-4xl mb-3'>{title}</h3>}
        <span className="text-lg">{content}</span>
        <div className='modal-action'>
          {btnError && (
            <button className='btn btn-error' onClick={onErrorClick}>
              {btnError}
            </button>
          )}
          {btnSuccess && <button className='btn btn-success' onClick={onSuccessClick}>{btnSuccess}</button>}
        </div>
      </form>
    </dialog>
  );
};

export default Dialog;