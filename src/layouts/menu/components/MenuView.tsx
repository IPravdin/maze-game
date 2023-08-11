import {ReactNode} from "react";


const MenuView = ({ title, content, cardActions }: { title?: string, content?: ReactNode, cardActions?: ReactNode }) => {
    return (
        <div className="w-full h-full">
            <div className="w-[46rem] max-h-[38rem] m-auto">
                <div className="card w-full h-full">
                    <div className="card-body w-full h-full">
                        {title && <h1 className="card-title justify-center">{title}</h1>}
                        {content}
                        {cardActions && <div className="card-actions justify-center">{cardActions}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuView;