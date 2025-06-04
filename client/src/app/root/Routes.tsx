import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import { LoginPage } from "../../features/login/LoginPage";
import { Post } from "../../features/post/Post";
import { RegisterPage } from "../../features/register/RegisterPage";
import { ContactPage } from "../../features/create/CreatePage";
import LogoutPage from "../../features/logout/LogoutPage";

export const router =createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',element:<LoginPage/>
            },
            {
                path:'/login',element:<LoginPage/>
            },
             {
                path:'/post',element:<Post/>
            },
             {
                path:'/logout',element:<LogoutPage/>
            },
             {
                path:'/Register',element:<RegisterPage/>
            },
              
        ]
    }
])