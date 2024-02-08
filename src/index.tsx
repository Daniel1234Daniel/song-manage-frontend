import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import rootReducer from './redux/songsSlice';
import rootSaga from './redux/rootSaga';
import { createRoot } from 'react-dom/client';
const sagaMiddleware = createSagaMiddleware();
const container = document.getElementById('root')!;
const root = createRoot(container);

const store = configureStore({
    reducer: {
        songs:rootReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});


sagaMiddleware.run(rootSaga);

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,

);
