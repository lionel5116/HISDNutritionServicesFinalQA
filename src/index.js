import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Provider} from 'react-redux';
import React from 'react';
import  ReactDOM  from 'react-dom';
import App from './components/App' 
import './index.css';
import initialState from './reducers/initialState';
import configureStore from './store/configureStore';
import { loadUser } from './actions/sharedActions';

const store = configureStore(initialState);
//store.dispatch(loadUser());
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('app')
);