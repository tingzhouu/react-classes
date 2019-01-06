import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Loader from "./Loader"
import "./SeasonDisplay.css";

class App extends React.Component {

  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude }); //uses setState function to update latitude
      },
      err => {
        this.setState({ errorMessage: err.message});
      }
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat) {
      return (
        <SeasonDisplay lat={this.state.lat}/>
      );
    }

    if (!this.state.errorMessage && !this.state.lat) {
      return (
        <Loader message="Attempting to load your location..."/>
      )
    }
  }

  //defining render function
  render() {
    return (
      this.renderContent()
    );
  }
}

ReactDOM.render(<App/>, document.querySelector("#root"));