import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {MazeData} from "./data/MazeData";
import Maze from "./layouts/components/Maze";
import MazeBonuses from "./layouts/components/MazeBonuses";
import {PlayerData} from "./data/PlayerData";
import {CoordinateType, OrientationType} from "./types/maze";
import PlayerBonuses from "./layouts/components/PlayerBonuses";
import {HudData} from "./data/HudData";
import Finish from "./layouts/components/Finish";
import {PlayerSizeType, PositionType} from "./types/global";
import Player from "./layouts/components/Player";
import Enemies from "./layouts/components/Enemies";


// TODO: it will be a starting screen in v2 and v3
// additionally in the v3 it will have a loading screen which transitions to starting menu

const BONUSES = 10
const ENEMIES = 3

function App() {
    const divRef = useRef<HTMLDivElement>(null)

    const [mazeStructure] = useState(new MazeData({width: 20, height: 20}, BONUSES, ENEMIES))
    const [canvaSize] = useState({
        height: 800,
        width: 800
    })
    const [cellSize] = useState({
        height: canvaSize.height / mazeStructure.size.height,
        width: canvaSize.width / mazeStructure.size.width
    })

    const [hud] = useState(new HudData({width: canvaSize.width, height: 100}, BONUSES))

    const [player, setPlayer] = useState(new PlayerData({
        left: mazeStructure.startCoord.x * cellSize.width,
        top: mazeStructure.startCoord.y * cellSize.height
    }))

    const [playerSize] = useState<PlayerSizeType>({
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

    const returnUpdatedPlayer = (mode: OrientationType, prevState: PlayerData) => {
        const currentPosition: PositionType = {
            left: prevState.currentPosition.left,
            top: prevState.currentPosition.top
        }
        const currentCoord: CoordinateType = {
            x: currentPosition.left / cellSize.height,
            y: currentPosition.top / cellSize.width
        }

        // ** Is Cell walkable
        if(!mazeStructure.mazeMap[currentCoord.x][currentCoord.y].walkable[mode]) return prevState

        let newPosition: PositionType = {left: 0, top: 0}

        switch (mode) {
            case 'left':
                newPosition.left = prevState.currentPosition.left - cellSize.width
                newPosition.top = currentPosition.top
                break;
            case 'right':
                newPosition.left = prevState.currentPosition.left + cellSize.width
                newPosition.top = currentPosition.top
                break;
            case 'top':
                newPosition.left = currentPosition.left
                newPosition.top = prevState.currentPosition.top - cellSize.height
                break;
            case 'bottom':
                newPosition.left = currentPosition.left
                newPosition.top = prevState.currentPosition.top + cellSize.height
                break;
        }

        // ** Bonus collect
        const newCoord: CoordinateType = {
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
            stepsWalked: ++prevState.stepsWalked,
            collectedBonuses: collectedBonuses,
            position: {
                left: newPosition.left,
                top: newPosition.top
            }
        }
    }

    const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault()

        console.log(event.code)

        if (event.code === "ArrowRight" || event.code === "KeyD") {
            setPlayer((prevState) => returnUpdatedPlayer('right', prevState));
        }
        if (event.code === "ArrowLeft" || event.code === "KeyA") {
            setPlayer((prevState) => returnUpdatedPlayer('left', prevState));
        }
        if (event.code === "ArrowDown" || event.code === "KeyS") {
            setPlayer((prevState) => returnUpdatedPlayer('bottom', prevState));
        }
        if (event.code === "ArrowUp" || event.code === "KeyW") {
            setPlayer((prevState) => returnUpdatedPlayer('top', prevState));
        }
    };

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
                <Enemies enemiesData={mazeStructure.enemies} cellSize={cellSize} playerSize={playerSize}/>
                <Player position={player.currentPosition} playerSize={playerSize}/>
                <Maze mazeMap={mazeStructure.mazeMap} cellSize={cellSize}/>
                <MazeBonuses mazeMap={mazeStructure.mazeMap} cellSize={cellSize}/>
                <Finish coord={mazeStructure.endCoord} cellSize={cellSize}/>
            </div>
        </div>
    );
}

export default App;
