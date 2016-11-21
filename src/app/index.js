<<<<<<< HEAD
import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import App from './app';

import rootReducer from './reducers';

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

let rootElement = document.getElementById('app-root');

render(
	<Provider store={store}>
		<App />
	</Provider>,
	rootElement
);



=======
import { createStore } from 'redux';
import RootReducer from './reducers';

let store = createStore(RootReducer);
>>>>>>> cd8832ba74a48ee3e5c54cbff8b950ffd8fe4739
