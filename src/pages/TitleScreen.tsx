import { useNavigate } from 'react-router-dom';
import routerLinks from "../router-links";
import { useEffect, useRef, KeyboardEvent, useState } from 'react';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { useSoundPlayer } from '../utils/hooks/useSoundPlayer';


const TitleScreen = () => {
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const soundPlayer = useSoundPlayer();

    // 160px max
    const [padding, setPadding] = useState(0)

    // ** Sets focus on main div
    useEffect(() => {
        if (!ref) return
        ref.current?.focus()
    }, [ref]);

    function keyDownHandler(e: KeyboardEvent<HTMLDivElement>) {
        e.preventDefault();

        if (e.code === 'Space') {
            soundPlayer.play('teleport');
            setInterval(() => setPadding((prevState) => prevState + 1.2), 12.5);
            setTimeout(() => navigate(routerLinks.menu), 2500);
        }
    }

    return (
        <div
            className="w-full h-full flex flex-col justify-center items-center"
            tabIndex={0}
            ref={ref}
            onKeyDown={keyDownHandler}
        >
            <div
                className="flex justify-center"
                style={{
                    paddingTop: padding,
                    paddingBottom: padding,
                }}
            >
                <AnimatedTitle />
            </div>
            <div
                className="flex justify-center"
                style={{
                    paddingTop: padding,
                    paddingBottom: padding,
                }}
            >
                <div className="flex gap-3 text-3xl animate-pulse">
                    press
                    <kbd className="kbd kbd-md">space</kbd>
                    to start
                </div>
            </div>
        </div>
    );
}

export default TitleScreen;