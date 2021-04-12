import React, { Component } from "react";

class SearchBox extends Component {
  state = {};
  render() {
    const { onChange, value } = this.props;
    return (
      <input
        type="text"
        name="query"
        placeholder="Search..."
        onChange={(e) => onChange(e.currentTarget.value)}
        value={value}
        className="form-control my-3 input"
      />
    );
  }
}

export default SearchBox;
