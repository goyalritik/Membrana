import React from "react";
import { Link } from "react-router-dom";

class landingPage extends React.Component {
  render() {
    return (
      <div id="landing-page-wrapper">
        <div id="gradient-layer" />
        <div id="landing-page-container">
          <div id="landing-lines">
            Membrana, Your one stop location to select your next Watch!
          </div>
          <div id="page-description">
            A one store away from the world of movies where you rate, review &
            watch!
          </div>
          <Link to="/movies">
            <button id="start-watching">Start watching</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default landingPage;
