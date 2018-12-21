import { createStore, applyMiddleware, compose } from 'redux';

import TicTactList from './store/reducers/ticTacList';

const rootReducer = TicTactList;

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware()));

export default store;