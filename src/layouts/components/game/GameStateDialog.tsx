import {ReactNode, useEffect} from "react";

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
const GameStateDialog = ({ id, title, content, open, onOpen, onClose, btnError, btnSuccess, onErrorClick, onSuccessClick }: Props) => {
    useEffect(() => {
        if (!open) return

        if(onOpen) onOpen();

        // @ts-ignore
        window[id].showModal()
    }, [open])

    return (
        <dialog id={id} className="modal" onClose={onClose}>
            <form method="dialog" className="modal-box">
                {title && <h3 className="font-bold text-lg">{title}</h3>}
                {content}
                <div className="modal-action">
                    {btnError && <button className="btn btn-error" onClick={onErrorClick}>{btnError}</button>}
                    {btnSuccess && <button className="btn btn-success" onClick={onSuccessClick}>{btnSuccess}</button>}
                </div>
            </form>
        </dialog>
    )
}

export default GameStateDialog;