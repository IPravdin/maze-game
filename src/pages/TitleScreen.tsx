import {Link} from "react-router-dom";
import routerLinks from "../router-links";


const TitleScreen = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Link to={routerLinks.menu}>
                <button className="btn">Play</button>
                <div className="font-title h-0 w-0"></div>
            </Link>
        </div>
    );
}

export default TitleScreen;