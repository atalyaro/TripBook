import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { combineReducers, createStore } from 'redux';
import { tokenReducer, vacationsUserReducer, vacationsAdminReducer, followsReducer } from './redux/reducers';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
  token: tokenReducer,
  vacationsuser: vacationsUserReducer,
  vacationsadmin: vacationsAdminReducer,
  follows: followsReducer
})

const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);