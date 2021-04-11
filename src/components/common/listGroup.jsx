import React, { Component } from "react";

class ListGroup extends Component {
  state = {};
  render() {
    const {
      items,
      textProperty,
      valueProperty,
      onItemsSelect,
      selectedItem,
    } = this.props;
    return (
      <ul className="list-group">
        {items.map((item) => (
          <li
            onClick={() => onItemsSelect(item)}
            key={item[valueProperty]}
            className={
              item === selectedItem
                ? "list-group-item active genre-card"
                : "list-group-item genre-card"
            }
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default ListGroup;
