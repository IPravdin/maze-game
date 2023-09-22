import { useNavigate } from 'react-router-dom';
import routerLinks from "../router-links";
import { useEffect, useRef, KeyboardEvent, MouseEvent } from 'react';
import SvgTitle from '../assets/icons/title';
import { AnimatedTitle } from '../layouts/components/menu/AnimatedTitle';


const TitleScreen = () => {
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // ** Sets focus on main div
    useEffect(() => {
        if (!ref) return
        ref.current?.focus()
    }, [ref]);

    function keyDownHandler(e: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        navigate(routerLinks.menu);
    }

    return (
        <div
            className="w-full h-full flex flex-col justify-center items-center bg-[#472d3c]"
            tabIndex={0}
            ref={ref}
            onKeyDown={keyDownHandler}
            //onClick={keyDownHandler}
        >
            <AnimatedTitle className="text-white" />
            <p className="text-white text-3xl animate-pulse">press any button to continue</p>
        </div>
    );
}

export default TitleScreen;