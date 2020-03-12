import createSagaMiddleWare, {SagaMiddleware} from 'redux-saga';

const sagaMiddleWare: SagaMiddleware<object> = createSagaMiddleWare();
const dev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local';

const middleware: SagaMiddleware<object>[] = [sagaMiddleWare];

export {
  dev,
  middleware,
  sagaMiddleWare,
};