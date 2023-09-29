import Enemy from "./Enemy";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const Enemies = () => {
    const mazeEnemies = useSelector((state: RootState) => state.maze.data.enemies);

    return (
        <>
            {mazeEnemies.map((enemy, index) =>
                <Enemy
                    key={`enemy[${enemy.spawn.x}][${enemy.spawn.y}]`}
                    id={index}
                    data={enemy}
                />
            )}
        </>
    )
}

export default Enemies