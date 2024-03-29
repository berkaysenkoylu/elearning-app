import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { /*HashRouter,*/ BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/auth';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(authReducer, composeEnhancer(applyMiddleware(thunk)));

/*
<Provider store={store}>
    <HashRouter basename="elearning-app">
        <App />
    </HashRouter>
</Provider>

<Provider store={store}>
    <BrowserRouter basename="/">
        <App />
    </BrowserRouter>
</Provider>
*/

const app = (
    <Provider store={store}>
        <BrowserRouter basename="elearning-app">
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
