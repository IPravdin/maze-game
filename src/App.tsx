import Game from "./pages/Game";
import { Route, Routes } from "react-router-dom";
import MenuV2 from "./layouts/menu/MenuV2";
import routerLinks from "./router-links";
import TitleScreen from "./pages/TitleScreen";
import {SoundPlayerProvider} from "./utils/hooks/useSoundPlayer";

// TODO: it will be a starting screen in v2 and v3
// additionally in the v3 it will have a loading screen which transitions to starting menu

function App({ className }: { className?: string }) {
    return (
        <div className={`text-center w-full h-full ${className ? className : ''}`}>
            <SoundPlayerProvider>
                <Routes>
                    <Route path={routerLinks.titleScreen} element={<TitleScreen />} />
                    <Route path={routerLinks.menu} element={<MenuV2 />} />
                    <Route path={routerLinks.game} element={<Game />} />
                </Routes>
            </SoundPlayerProvider>
        </div>
    );
}

export default App;
