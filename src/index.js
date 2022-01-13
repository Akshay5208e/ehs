/*jshint esversion: 6 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import reducer from "./redux/reducer/index";
import AdminPage from "./components/admin/AdminPage";
import { Provider } from "react-redux";
import {store} from "./redux/store"
import { UserProvider } from "./firebase/userContext";
import { SearchProvider } from "./components/SearchPage/SearchContext";

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <SearchProvider>
        <UserProvider>
        <Route path="/">
          <App />
        </Route>
        </UserProvider>
        </SearchProvider>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
