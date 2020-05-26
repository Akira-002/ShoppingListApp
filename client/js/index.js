import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import App from './containers/App';
import '../scss/style.scss';


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.navigator.userAgent.includes('Chrome') ?
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : compose,
  )
);

// console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
      <App/>
  </Provider>, document.getElementById('index')
);