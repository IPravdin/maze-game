import React from 'react';
import './App.css';
import MazeCanvas from "./layouts/components/MazeCanvas";

function App() {
    // TODO: it will be a starting screen in v2 and v3
    // additionally in the v3 it will have a loading screen which transitions to starting menu
    return (
        <div className="App">
            {/*TODO: register all routes here*/}
            {/*<Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
            </Routes>*/}
            {/*TODO: Add Menu Here*/}
            <MazeCanvas />
        </div>
    );
}

export default App;
