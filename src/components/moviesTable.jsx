import React, { Component } from "react";
import Likes from "./common/like";
import { Link } from "react-router-dom";
import { currentUser } from "./../services/authService";
import { getReviews } from "./../services/userService";

class MoviesTable extends Component {
  state = {
    reviews: [],
    user: "",
  };

  async componentDidMount() {
    const { data: reviews } = await getReviews();

    this.setState({ reviews });
    const user = currentUser();

    this.setState({ user });
  }

  numberOfReviews = (id) => {
    var count = 0;
    for (var review of this.state.reviews) {
      if (review.movieId === id) {
        count = count + 1;
      }
    }
    return count;
  };
  totalRating = (id) => {
    var n = 0,
      rating = 0;

    for (var review of this.state.reviews) {
      if (review.movieId === id) {
        n = n + 1;
        rating = rating + review.rating;
      }
    }
    var rate = rating / n;
    var rounded = Math.round(rate * 10) / 10;
    if (isNaN(rate)) {
      return 0;
    }
    return rounded;
  };

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
    const { pageMovies, onDelete, onLike } = this.props;
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
              onClick={() => this.raisedSort("reviews")}
            >
              Reviews {this.renderSortIcon("reviews")}
            </th>

            <th className="clickable" onClick={() => this.raisedSort("rating")}>
              Rating {this.renderSortIcon("rating")}
            </th>
            <th className="clickable" onClick={() => this.raisedSort("link")}>
              Link {this.renderSortIcon("link")}
            </th>
          </tr>
        </thead>
        <tbody>
          {pageMovies.map((movie) => (
            <tr key={movie._id}>
              <td>
                <Link id="movie-title" to={`/movies/${movie._id}`}>
                  {movie.title}
                </Link>
              </td>
              <td>{movie.genre.name}</td>
              <td>{this.numberOfReviews(movie._id)}</td>
              <td>{this.totalRating(movie._id)}</td>
              <td>
                <a id="watch-link" href={movie.link}>
                  Watch it now
                </a>
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
