import React from 'react';
import { render } from 'react-dom';
import './style.scss';
import App from './App.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';

render(
	<ErrorBoundary>
		<App />
	</ErrorBoundary>,
	document.getElementById('root')
);
