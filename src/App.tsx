import Game from './pages/Game';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routerLinks from './router-links';
import TitleScreen from './pages/TitleScreen';
import { SoundPlayerProvider } from './utils/hooks/useSoundPlayer';
import Menu from './pages/Menu';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Spinner from './components/Spinner';
import { Analytics } from '@vercel/analytics/react';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Spinner/>}>
        <BrowserRouter>
          <Analytics/>
          <div className='App text-center w-full h-full'>
            <SoundPlayerProvider>
              <Routes>
                <Route path={routerLinks.titleScreen} element={<TitleScreen/>}/>
                <Route path={routerLinks.menu} element={<Menu/>}/>
                <Route path={routerLinks.game} element={<Game/>}/>
              </Routes>
            </SoundPlayerProvider>
          </div>
          <div className='NoDisplay hidden h-full w-full'>
            <div className='flex justify-center items-center text-center p-5 w-full'>
              The game is not suitable for small screen sizes, please use another device (i.e. laptop) to access it.
              Thank you for understanding.
            </div>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
