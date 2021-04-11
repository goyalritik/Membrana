import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";
const apiEndpoint1 = config.apiUrl + "/reviews";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

export function review(data,user) {
  var [id,name]= data.movie.split("~");
 
  return http.post(apiEndpoint1, {
    rating: data.rating,
    movieId: id,
    movieName:name,
    review: data.review,
    userId: user.email,
    userName: user.name
  });
}
export function getReviews() {
  return http.get(apiEndpoint1);
}