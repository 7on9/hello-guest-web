import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import LoginAndJoinMeeting from './pages/LoginAndJoinMeeting';
import Admin from './pages/Admin/Admin';

import * as serviceWorker from './serviceWorker';

//router
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

//redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import myReducer from './reducers/index';
import thunk from 'redux-thunk';
import configureSocket from '../src/actions/socketAction';

//middleware ;
const store = createStore(myReducer, applyMiddleware(thunk));

// setup socket connection
export const socket = configureSocket(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route exact path="/" component={LoginAndJoinMeeting} />
      <Route path="/home" component={App} />
      <Route path="/admin" component={Admin} />
      {/* <App /> */}
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
