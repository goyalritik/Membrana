import React, { Component } from "react";

class Input extends Component {
  state = {};
  render() {
    const { type, name, label, value, onChange, error } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          id={name}
          className="form-control"
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Input;
