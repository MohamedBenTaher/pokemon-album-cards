import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
export default function configureStore(initialState = {}) {
  const middlewares = [];

  if (process.env.NODE_ENV === "development") {
    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);
  }

  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore( rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
  )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}