import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

import App from './App';

import { Provider } from 'react-redux';
import { persistor, store, persistConfig } from './redux';

import { PersistGate } from 'redux-persist/integration/react';
import { crossBrowserListener } from './utils/reduxpersist-listener';

window.addEventListener('storage', crossBrowserListener(store, persistConfig));

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);
