// Core
import { createStore, applyMiddleware, compose} from 'redux';
// Reducers
import { rootReducer } from '../rootReducer';
// MiddleWares
import {middleware, sagaMiddleWare, dev } from '../middlewares';
import { rootSaga } from '../rootSaga'

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = dev && devtools ? devtools : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

sagaMiddleWare.run(rootSaga);

export { store };
