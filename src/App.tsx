import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {MazeStructure} from "./data/MazeStructure";
import Maze from "./layouts/components/Maze";
import Bonuses from "./layouts/components/Bonuses";
import {Player} from "./data/Player";
import {Orientation} from "./types/maze";


// TODO: it will be a starting screen in v2 and v3
// additionally in the v3 it will have a loading screen which transitions to starting menu

function App() {
    const divRef = useRef<HTMLDivElement>(null)
    const [canvaSize] = useState({
        height: 800,
        width: 800
    })
    const [mazeStructure] = useState(new MazeStructure(10, 10, 3))
    const [cellSize] = useState({
        height: canvaSize.height / mazeStructure.height,
        width: canvaSize.width / mazeStructure.width
    })

    const [player, setPlayer] = useState(new Player(
        mazeStructure.startCoord.x * cellSize.width,
        mazeStructure.startCoord.y * cellSize.height
    ))

    const [playerSize] = useState({
        width: cellSize.width - 15,
        height: cellSize.width - 15,
        borderWidth: 2.5,
        margin: 5,
    })

    // ** Sets focus on main div
    useEffect(() => {
        if (!divRef) return
        divRef.current?.focus()
    }, [divRef])

    const returnUpdatedPlayer = (mode: Orientation, prevState: Player) => {
        const isMovementX = mode === 'left' || mode === 'right'
        const currentY = prevState.position.top / cellSize.height
        const currentX = prevState.position.left / cellSize.width
        let newPosition

        switch (mode) {
            case 'left':
                newPosition = prevState.position.left - cellSize.width
                break;
            case 'right':
                newPosition = prevState.position.left + cellSize.width
                break;
            case 'top':
                newPosition = prevState.position.top - cellSize.height
                break;
            case 'bottom':
                newPosition = prevState.position.top + cellSize.height
                break;
        }

        // ** Is Cell walkable
        if(!mazeStructure.mazeMap[currentX][currentY].walkable[mode]) return prevState

        // ** Map borders check
        if (newPosition < 0) return prevState
        else if (newPosition > canvaSize.height - cellSize.height) return prevState
        else if (newPosition > canvaSize.width - cellSize.width) return prevState

        // ** Bonus collect
        const newY = !isMovementX ? newPosition / cellSize.width : currentY
        const newX = isMovementX ? newPosition / cellSize.width : currentX
        const newCell = mazeStructure.mazeMap[newX][newY]
        let addBonus = 0

        if(newCell.bonus.placed && !newCell.bonus.collected) {
            addBonus++
            newCell.bonus.collected = true

            console.log(newCell)
        }

        return {
            ...prevState,
            collectedBonuses: prevState.collectedBonuses + addBonus,
            position: {
                left: isMovementX ? newPosition : prevState.position.left,
                top: !isMovementX ? newPosition : prevState.position.top
            }
        }
    }

    const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault()
        if (event.code === "ArrowRight") {
            setPlayer((prevState) => returnUpdatedPlayer('right', prevState));
        }
        if (event.code === "ArrowLeft") {
            setPlayer((prevState) => returnUpdatedPlayer('left', prevState));
        }
        if (event.code === "ArrowDown") {
            setPlayer((prevState) => returnUpdatedPlayer('bottom', prevState));
        }
        if (event.code === "ArrowUp") {
            setPlayer((prevState) => returnUpdatedPlayer('top', prevState));
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

            <div className="container" style={{ width: canvaSize.width, height: canvaSize.height }}>
                <div className="enemy" style={{ ...playerSize, left: cellSize.width }}></div>
                <div className="player" style={{ ...playerSize, top: player.position.top, left: player.position.left }}></div>
                <Maze mazeMap={mazeStructure.mazeMap} cellSize={cellSize}/>
                <Bonuses mazeMap={mazeStructure.mazeMap} cellSize={cellSize}/>
            </div>
        </div>
    );
}

export default App;
