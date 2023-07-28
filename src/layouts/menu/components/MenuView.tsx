import {ReactNode} from "react";


const MenuView = ({ title, content, cardActions }: { title?: string, content?: ReactNode, cardActions?: ReactNode }) => {
    return (
        <div className="card">
            <div className="card-body">
                {title && <h1 className="card-title justify-center">{title}</h1>}
                {content}
                {cardActions && <div className="card-actions justify-center">{cardActions}</div>}
            </div>
        </div>
    );
}

export default MenuView;