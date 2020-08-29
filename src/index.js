import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";
import App from "./components/App";
import Modal from "./components/Modal";
import Welcome from "./components/Welcome";
import Signout from "./components/auth/Signout";
import Signin from "./components/auth/Signin";
import User from "./components/auth/User";
import Scanner from "./components/Scanner/Scanner";
import AddUser from "./components/Dashboard/AddUser";
import Dashboard from "./components/Dashboard/Dashboard";

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem("token") },
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/scanner" component={Scanner} />
        <Route path="/signout" component={Signout} />
        <Route path="/signin" component={Signin} />
        <Route path="/adduser" component={AddUser} />
        <Route path="/user" component={User} />
        <Route path="/dashboard" component={Dashboard} />
      </App>
    </BrowserRouter>
    <Modal />
  </Provider>,
  document.querySelector("#root")
);
