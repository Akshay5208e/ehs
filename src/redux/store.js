import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducer/rootReducer";

const middleware = [thunk];
if (process.env.NODE_ENV ==="production")
{
    middleware.push(logger)
}
export const store = createStore(rootReducer,applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())