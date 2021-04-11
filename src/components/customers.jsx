import React from "react";
import Form from './common/form';
import { getMovies } from './../services/movieService';
import  Joi  from 'joi-browser';
import { review } from "../services/userService";
import { currentUser } from './../services/authService';
import { getReviews } from './../services/userService';
import Rate from './common/rate';

import RateShow from './rateShow';

class Customers extends Form {
  state = {
    data: {rating:"",movie:[],review:""},
    user:"",
    movies:[],
    reviews:[],
    errors: {},
    
  };
  schema = {
    rating: Joi.number().required().label("Rating"),
    movie: Joi.string().required().label("Movie"),
    review: Joi.string().required().label("Review"),
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data: reviews } = await getReviews();
    this.setState({ movies,reviews });
    const user = currentUser();
    this.setState({ user });
  }

  doSubmit = async () => {
    try {
      await review(this.state.data,this.state.user);
      this.props.history.push("/movies");
      
      
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.movie = ex.response.data;
        this.setState({ errors });
      }
    }
  };

 

  render() {
    const { user } = this.props;
    return (
      
    <div>
      <h1>Reviews</h1>
      {user &&(
        <React.Fragment>
    <form onSubmit={this.handleSubmit}>
    <div className="form-group">
      <label htmlFor="rating">Rating</label><br/>
    <Rate id="rating" onChange={this.handleChange} /></div>
    <div className="form-group">
      
        <label htmlFor="movie">Movie</label>
        <select name="movie" id="movie" onChange={this.handleChange} className="form-control">
          <option value=""></option>
          {this.state.movies.map((option) => (
            <option key={option._id} value={[`${option._id}~${option.title}`]}>
              {option.title}
            </option>
          ))}
        </select>
        {/* {this.state.errors && <div className="alert alert-danger">{this.state.errors}</div>} */}
      </div>
        {/* <div className="mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">Review</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.data[review]} onChange={this.handleChange}></textarea>
        </div> */}
        {this.renderInput("review", "Review")}
        {/* <button disabled={this.validate()} className="btn btn-primary">
        Save
      </button> */}

           {this.renderButton("Save")} 
        </form><br/>
        

        </React.Fragment>
      )}
      <div>
        <ul className="list-group">
        {this.state.reviews.map((option)=>(
          
          <li className="list-group-item" key={option._id}><b>{option.movieName}</b><br/>{<RateShow number={option.rating}/>}<br/>~{option.userName}<br/>{option.review}</li>
        ))}
        </ul></div>
    
    </div>
    )
  }
}

export default Customers;
