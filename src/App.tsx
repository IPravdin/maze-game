import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {MazeData} from "./data/MazeData";
import Maze from "./layouts/components/Maze";
import MazeBonuses from "./layouts/components/MazeBonuses";
import {PlayerData} from "./data/PlayerData";
import {Coordinate, Orientation} from "./types/maze";
import PlayerBonuses from "./layouts/components/PlayerBonuses";
import {HudData} from "./data/HudData";
import Finish from "./layouts/components/Finish";
import {PositionType} from "./types/global";


// TODO: it will be a starting screen in v2 and v3
// additionally in the v3 it will have a loading screen which transitions to starting menu

function App() {
    const divRef = useRef<HTMLDivElement>(null)

    const [mazeStructure] = useState(new MazeData({width: 10, height: 10}, 3))
    const [canvaSize] = useState({
        height: 800,
        width: 800
    })
    const [cellSize] = useState({
        height: canvaSize.height / mazeStructure.size.height,
        width: canvaSize.width / mazeStructure.size.width
    })

    const [hud] = useState(new HudData({width: canvaSize.width, height: 100}, 7))

    const [player, setPlayer] = useState(new PlayerData({
        left: mazeStructure.startCoord.x * cellSize.width,
        top: mazeStructure.startCoord.y * cellSize.height
    }))

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

    const returnUpdatedPlayer = (mode: Orientation, prevState: PlayerData) => {
        const currentPosition: PositionType = {
            left: prevState.position.left,
            top: prevState.position.top
        }
        const currentCoord: Coordinate = {
            x: currentPosition.left / cellSize.height,
            y: currentPosition.top / cellSize.width
        }

        // ** Is Cell walkable
        if(!mazeStructure.mazeMap[currentCoord.x][currentCoord.y].walkable[mode]) return prevState

        let newPosition: PositionType = {left: 0, top: 0}

        switch (mode) {
            case 'left':
                newPosition.left = prevState.position.left - cellSize.width
                newPosition.top = currentPosition.top
                break;
            case 'right':
                newPosition.left = prevState.position.left + cellSize.width
                newPosition.top = currentPosition.top
                break;
            case 'top':
                newPosition.left = currentPosition.left
                newPosition.top = prevState.position.top - cellSize.height
                break;
            case 'bottom':
                newPosition.left = currentPosition.left
                newPosition.top = prevState.position.top + cellSize.height
                break;
        }

        // ** Bonus collect
        const newCoord: Coordinate = {
            x: newPosition.left / cellSize.width,
            y: newPosition.top / cellSize.height
        }

        const newCell = mazeStructure.mazeMap[newCoord.x][newCoord.y]
        let collectedBonuses = prevState.collectedBonuses

        if(newCell.bonus.placed && !newCell.bonus.collected) {
            collectedBonuses++
            newCell.bonus.collected = true
            console.log(collectedBonuses)
        }

        return {
            ...prevState,
            collectedBonuses: collectedBonuses,
            position: {
                left: newPosition.left,
                top: newPosition.top
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
            <div className="container" style={{ width: hud.size.width, height: hud.size.height }}>
                <PlayerBonuses bonuses={player.collectedBonuses} cellSize={hud.cellSize}/>
            </div>
            <div className="container" style={{ width: canvaSize.width, height: canvaSize.height }}>
                <div className="enemy" style={{ ...playerSize, left: cellSize.width }}></div>
                <div className="player" style={{ ...playerSize, top: player.position.top, left: player.position.left }}></div>
                <Maze mazeMap={mazeStructure.mazeMap} cellSize={cellSize}/>
                <MazeBonuses mazeMap={mazeStructure.mazeMap} cellSize={cellSize}/>
                <Finish coord={mazeStructure.endCoord} cellSize={cellSize}/>
            </div>
        </div>
    );
}

export default App;
