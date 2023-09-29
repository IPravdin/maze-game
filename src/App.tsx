import Game from "./pages/Game";
import { Route, Routes } from "react-router-dom";
import routerLinks from "./router-links";
import TitleScreen from "./pages/TitleScreen";
import {SoundPlayerProvider} from "./utils/hooks/useSoundPlayer";
import Menu from './pages/Menu';

function App({ className }: { className?: string }) {
    return (
        <div className={`text-center w-full h-full ${className ? className : ''}`}>
            <SoundPlayerProvider>
                <Routes>
                    <Route path={routerLinks.titleScreen} element={<TitleScreen />} />
                    <Route path={routerLinks.menu} element={<Menu />} />
                    <Route path={routerLinks.game} element={<Game />} />
                </Routes>
            </SoundPlayerProvider>
        </div>
    );
}

export default App;
