
import { createHashRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import { Login } from "./components/Signin";
import { SignUp } from "./components/SignUp";
import Progress from "./components/Progress";
import Navbar from "./components/Navbar";
import Realtime from "./components/Realtime"
import { Logout } from "./components/Logout";


const App=()=>{
  const router = createHashRouter([
    {
      path:'/',
      element:<Navbar/>,
      children:[
        {
          path:'/',
          element:<DashBoard/>
        },{
          path:'/login',
          element:<Login/>
        },{
          path:'/signup',
          element:<SignUp/>
        },{
          path:'/logout',
          element:<Logout/>
        },{
          path:'/progress/:id',
          element:<Progress/>
        },{
          path:'/Realtime',
          element:<Realtime/>
        }
      ]
    }
  ]);
  
  return(
    <RouterProvider router={router} ></RouterProvider>
  )
}

export default App
