import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../layout/uiSlice";
import { PostAPI } from "../../features/post/PostAPI";
import { LoginAPI } from "../../features/login/LoginAPI";
import { RegisterAPI } from "../../features/register/RegisterAPI";
 

export const store = configureStore({
    reducer:{
        [LoginAPI.reducerPath]:LoginAPI.reducer,
        [PostAPI.reducerPath]: PostAPI.reducer, 
        [RegisterAPI.reducerPath]: RegisterAPI.reducer,
        ui : uiSlice.reducer
    },
    middleware :(getdefaultMiddleware) => 
        getdefaultMiddleware().concat(LoginAPI.middleware).concat(PostAPI.middleware).concat(RegisterAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
