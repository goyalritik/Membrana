import React, { Component } from "react";

class Rate extends Component {
  state = {};
  render() {
    let classes = "fa fa-star";
    if (!this.props.rated) classes += "-o";
    return (
      <i
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
        className={classes}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Rate;
