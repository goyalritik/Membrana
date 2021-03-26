import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
class Pagination extends Component {
  state = {};
  render() {
    const pageCount = this.props.itemsCount / this.props.pageSize;

    if (pageCount <= 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === this.props.currentPage
                  ? "page-item active"
                  : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() => this.props.onPageChange(page)}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
