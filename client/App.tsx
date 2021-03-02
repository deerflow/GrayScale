import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Views
import HomeView from "./views/HomeView";
import GetStartedView from "./views/GetStartedView";
import LoginView from "./views/LoginView";
import FeedView from "./views/FeedView";
import AccountView from "./views/AccountView";

const App = () => {
    return (
        <Router>
            <Route exact path='/' component={HomeView} />
            <Route exact path='/get-started' component={GetStartedView} />
            <Route exact path='/login' component={LoginView} />
            <Route exact path='/feed' component={FeedView} />
            <Route exact path='/account' component={AccountView} />
        </Router>
    )
}

export default App;