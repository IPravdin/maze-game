
interface Props {
    id: string,
    title: string,
    text: string
}
export const Dialog = ({id, title, text}: Props) => {
    return (
        <dialog id={id} className="modal">
            <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{text}</p>
                <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </div>
            </form>
        </dialog>
    )
}

export default Dialog
