import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./components/movies";
import Reviews from "./components/review";
import TrendingMovie from "./components/Trending";
import NotFound from "./components/notFound";
import NavBar from "./components/navbar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/Logout";
import RegisterForm from "./components/registerForm";
import LandingPage from "./components/landingPage";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { currentUser } from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = currentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <img src="/NBG2.jpg" alt="BackgroundImage" itemType="jpg" id="bg" />
        <main className="">
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />

            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={this.state.user} />}
            />
            <Route
              path="/reviews"
              render={(props) => <Reviews {...props} user={this.state.user} />}
            />
            <Route path="/trendingMovie" component={TrendingMovie} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={LandingPage} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
