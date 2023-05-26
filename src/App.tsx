import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {MazeStructure} from "./data/MazeStructure";
import Cell from "./layouts/components/Cell";
import Maze from "./layouts/components/Maze";
import Bonuses from "./layouts/components/Bonuses";


// TODO: it will be a starting screen in v2 and v3
// additionally in the v3 it will have a loading screen which transitions to starting menu

function App() {
    const divRef = useRef<HTMLDivElement>(null)
    const [canvaSize] = useState(800)
    const [mazeStructure] = useState(new MazeStructure(20, 20, 3))
    const [cellSize] = useState({
        h: canvaSize / mazeStructure.mazeHeight,
        w: canvaSize / mazeStructure.mazeWidth
    })

    const [playerPosit, setPlayerPosit] = useState({
        left: mazeStructure.startCoord.x * cellSize.w,
        top: mazeStructure.startCoord.y * cellSize.h
    })

    const [playerSize] = useState({
        width: cellSize.w - 15,
        height: cellSize.w - 15,
        borderWidth: 2.5,
        margin: 5,
    })

    // ** Sets focus on main div
    useEffect(() => {
        if (!divRef) return
        divRef.current?.focus()
    }, [divRef])


    const handleSetLeft = () => {
        setPlayerPosit((prevState) => {
            // ** Is Cell walkable
            const currentY = prevState.top / cellSize.h
            const currentX = prevState.left / cellSize.w

            if(!mazeStructure.mazeMap[currentX][currentY].walkable.left) return prevState

            // ** Map borders check
            const posLeft = prevState.left - cellSize.w

            if (posLeft < 0) return prevState

            // is new cell contains star
            // if contains - collect

            return {
                ...prevState,
                left: posLeft
            }
        });
    }

    const handleSetRight = () => {
        setPlayerPosit((prevState) => {
            const currentY = prevState.top / cellSize.h
            const currentX = prevState.left / cellSize.w

            if(!mazeStructure.mazeMap[currentX][currentY].walkable.right) return prevState

            const posRight = prevState.left + cellSize.w

            // Map borders check
            if (posRight > canvaSize - cellSize.h) return prevState
            return {
                ...prevState,
                left: posRight
            }
        });
    }

    const handleSetDown = () => {
        setPlayerPosit((prevState) => {
            const currentY = prevState.top / cellSize.h
            const currentX = prevState.left / cellSize.w

            if(!mazeStructure.mazeMap[currentX][currentY].walkable.bottom) return prevState

            const posDown = prevState.top + cellSize.h

            // Map borders check
            if (posDown > canvaSize - cellSize.h) return prevState
            return {
                ...prevState,
                top: posDown
            }
        });
    }

    const handleSetUp = () => {
        setPlayerPosit((prevState) => {
            const currentY = prevState.top / cellSize.h
            const currentX = prevState.left / cellSize.w

            if(!mazeStructure.mazeMap[currentX][currentY].walkable.top) return prevState

            const posUp = prevState.top - cellSize.h

            // Map borders check
            if (posUp < 0) return prevState
            return {
                ...prevState,
                top: posUp
            }
        });
    }

    const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault()
        if (event.code === "ArrowRight") {
            handleSetRight()
        }
        if (event.code === "ArrowLeft") {
            handleSetLeft()
        }
        if (event.code === "ArrowDown") {
            handleSetDown()
        }
        if (event.code === "ArrowUp") {
            handleSetUp()
        }
    };

    // For npc movements
    useEffect(() => {
        const interval = setInterval(() => {

        }, 10000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="App" onKeyDown={keyDownEvent} tabIndex={0} ref={divRef}>
            {/*TODO: register all routes here*/}
            {/*<Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
            </Routes>*/}
            {/*TODO: Add Menu Here*/}

            <div className="container" style={{ width: canvaSize, height: canvaSize }}>
                <div className="enemy" style={{ ...playerSize, left: cellSize.w }}></div>
                <div className="player" style={{ ...playerSize, top: playerPosit.top, left: playerPosit.left }}></div>
                <Maze mazeMap={mazeStructure.mazeMap} cellSize={cellSize}/>
                <Bonuses mazeMap={mazeStructure.mazeMap} cellSize={cellSize}/>
            </div>
        </div>
    );
}

export default App;
