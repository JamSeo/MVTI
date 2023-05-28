import axios from "axios";

export const Movies = type => {
  return axios.create({
    baseURL: `https://api.themoviedb.org/3/movie/${type}?api_key=6461758db19e829585c3a86900619f0c&language=ko-KR&region=kr`
  });
};