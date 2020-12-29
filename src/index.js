import React from 'react';
import { render } from 'react-dom';
import './style.scss';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
    // eslint-disable-next-line no-undef
    document.getElementById('root'),
);
