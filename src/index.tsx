import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store, {persistor} from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import Spinner from "./layouts/components/Spinner";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Spinner />}>
            <BrowserRouter>
                <App className="App" />
                <div className="NoDisplay hidden h-full w-full">
                    <span className="flex justify-center items-center text-center p-5">
                        The game is not suitable for small screen sizes, please use other device (for instance, laptop) to access it. Thank you for understanding.
                    </span>
                </div>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
