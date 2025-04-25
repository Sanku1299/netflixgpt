import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";
import userReducer from "./userSlice"; 
import moviesReducer from "./moviesSlice";
import gptReducer from './gptSlice';

const appStore = configureStore({
    reducer:{
        user:userReducer,
        movies:moviesReducer,
        gpt:gptReducer,
        config:configReducer,
    }
})

export default appStore;