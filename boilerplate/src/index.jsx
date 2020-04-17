import React from "react";
import ReactDOM from "react-dom"; 
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import App from "./components/App.jsx";  
import Welcome from "./components/Welcome.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import SignOut from "./components/auth/SignOut.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import Feature from "./components/Feature.jsx";
// import FeatureWithDropzone from "./components/FeatureWithDropZone.jsx";


const store = createStore(
    reducers,
   { auth : {authenticated : localStorage.getItem("token")}},
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
        <App>
            <Route path="/" exact component={Welcome} />
            <Route path="/signup" component={SignUp} />
            <Route path="/feature" component={Feature} />
            <Route path="/signout" component={SignOut} />
            <Route path="/signin" component={SignIn} />
        </App>
        </BrowserRouter>
    </Provider>,
    document.querySelector("#root"));