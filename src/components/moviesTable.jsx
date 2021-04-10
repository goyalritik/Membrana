import React, { Component } from "react";
import Likes from "./common/like";
import { Link } from "react-router-dom";
import { currentUser } from "./../services/authService";
import Rate from './common/rate';

class MoviesTable extends Component {
  state = {};

  raisedSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (path) => {
    if (path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc"></i>;
    else return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    const { pageMovies, onDelete, onLike, onRate } = this.props;
    const user = currentUser();

    return (
      <table className="table">
        <thead>
          <tr>
            <th className="clickable" onClick={() => this.raisedSort("title")}>
              Title {this.renderSortIcon("title")}
            </th>

            <th
              className="clickable"
              onClick={() => this.raisedSort("genre.name")}
            >
              Genre {this.renderSortIcon("genre.name")}
            </th>

            <th
              className="clickable"
              onClick={() => this.raisedSort("numberInStock")}
            >
              NumberInStock {this.renderSortIcon("numberInStock")}
            </th>

            <th
              className="clickable"
              onClick={() => this.raisedSort("rating")}
            >
              Rating {this.renderSortIcon("rating")}
            </th>
            <th
              className="clickable"
              onClick={() => this.raisedSort("link")}
            >
              Link {this.renderSortIcon("link")}
            </th>

            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pageMovies.map((movie) => (
            <tr key={movie._id}>
              <td>
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
              </td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.rating}</td>
              <td><a href={movie.link}>Click Here</a></td>
              <td>
                <Rate onClick={() => onRate(movie)} rated={movie.rated} />
                <Rate onClick={() => onRate(movie)} rated={movie.rated} />
                <Rate onClick={() => onRate(movie)} rated={movie.rated} />
                <Rate onClick={() => onRate(movie)} rated={movie.rated} />
                <Rate onClick={() => onRate(movie)} rated={movie.rated} />
              </td>
              <td>
                <Likes onClick={() => onLike(movie)} liked={movie.liked} />
              </td>
              <td>
                {user && user.isAdmin && (
                  <button
                    onClick={() => onDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
