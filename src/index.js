import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Provider} from 'react-redux';
import {store} from './store/store';
import React from 'react';
import  ReactDOM  from 'react-dom';
import App from './components/App' 
import './index.css';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('app')
);