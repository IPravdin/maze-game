import {useEffect} from "react";

interface Props {
    id: string,
    title: string,
    text: string,
    open: boolean,
    onOpen: () => void,
    onClose: () => void
}
const GameStateDialog = ({ id, title, text, open, onOpen, onClose }: Props) => {
    useEffect(() => {
        if (!open) return

        onOpen()

        // @ts-ignore
        window[id].showModal()
    }, [open])

    return (
        <dialog id={id} className="modal" onClose={onClose}>
            <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{text}</p>
                <div className="modal-action">
                    <button className="btn">Continue</button>
                </div>
            </form>
        </dialog>
    )
}

export default GameStateDialog;