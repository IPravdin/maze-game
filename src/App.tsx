import React, {useEffect, useState} from 'react';
import './App.css';
import {MazeStructure} from "./data/MazeStructure";
import Cell from "./layouts/new-components/Cell";


// TODO: it will be a starting screen in v2 and v3
// additionally in the v3 it will have a loading screen which transitions to starting menu

function App() {

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

    const handleSetLeft = () => {
        setPlayerPosit((prevState) => {
            const currentY = prevState.top / cellSize.h
            const currentX = prevState.left / cellSize.w

            // Is Cell walkable
            if(!mazeStructure.mazeMap[currentX][currentY].walkable.left) return prevState

            const posLeft = prevState.left - cellSize.w

            // Map borders check
            if (posLeft < 0) return prevState

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
        <div className="App">
            {/*TODO: register all routes here*/}
            {/*<Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
            </Routes>*/}
            {/*TODO: Add Menu Here*/}

            <div className="container" style={{ width: canvaSize, height: canvaSize }} onKeyDown={keyDownEvent} tabIndex={0}>
                <div className="enemy" style={{ ...playerSize, left: cellSize.w }}></div>
                <div className="player" style={{ ...playerSize, top: playerPosit.top, left: playerPosit.left }}></div>
                <div>
                    {mazeStructure.mazeMap.map((columns, x) => {
                        return columns.map((cell, y) => {
                            return <Cell key={`cell[${x}][${y}]`} x={x} y={y} cell={cell} cellSize={cellSize}/>
                            }
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
