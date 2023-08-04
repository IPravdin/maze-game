import './App.css';
import Game from "./pages/Game";
import { Route, Routes } from "react-router-dom";
import MenuV2 from "./layouts/menu/MenuV2";
import routerLinks from "./router-links";

// TODO: it will be a starting screen in v2 and v3
// additionally in the v3 it will have a loading screen which transitions to starting menu

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={routerLinks.menu} element={<MenuV2 />} />
                <Route path={routerLinks.game} element={<Game />} />
            </Routes>
        </div>
    );
}

export default App;
