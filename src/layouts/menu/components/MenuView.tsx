import {ReactNode} from "react";

type Props = {
    title?: string,
    titleClasses?: string,
    content?: ReactNode,
    cardActions?: ReactNode,
}
const MenuView = ({ title, titleClasses, content, cardActions }: Props) => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[46rem] max-h-[38rem] m-auto">
                <div className="card w-full h-full">
                    <div className="card-body w-full h-full">
                        {title && (
                            <h1 className={`card-title justify-center font-title font-extralight ${titleClasses ? titleClasses : 'text-2xl'}`}>
                                {title}
                            </h1>
                        )}
                        {content}
                        {cardActions && <div className="card-actions justify-center">{cardActions}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuView;