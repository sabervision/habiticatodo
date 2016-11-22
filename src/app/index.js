import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { authenticationMiddleware } from './middleware';

import App from './app';

import rootReducer from './reducers';

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware, authenticationMiddleware));

let rootElement = document.getElementById('app-root');

render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);
