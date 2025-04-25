import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upComingMovies: null,
    trailerVideo: null,
    movieInfo: null,
    castInfo: null,
    movieVideos: null,
    castMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpComingMovies: (state, action) => {
      state.upComingMovies = action.payload;
    },
    addMovieInfo: (state, action) => {
      state.movieInfo = action.payload;
    },
    clearMovieInfo: (state, action) => {
      state.movieInfo = null;
    },
    addCastInfo: (state, action) => {
      state.castInfo = action.payload;
    },
    addMovieVideos: (state, action) => {
      state.movieVideos = action.payload;
    },
    addCastMovies: (state, action) => {
      state.castMovies = action.payload;
    },
    clearCastMovies: (state, action) => {
      state.castMovies = null;
    },
  },
});

export const {
  addNowPlayingMovies,
  addPopularMovies,
  addUpComingMovies,
  addTopRatedMovies,
  addTrailerVideo,
  addMovieInfo,
  addCastInfo,
  addMovieVideos,
  clearMovieInfo,
  addCastMovies,
  clearCastMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
