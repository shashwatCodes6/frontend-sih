
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import { Login } from "./components/Signin";
import { SignUp } from "./components/SignUp";
import Progress from "./components/Progress";

const App=()=>{
  const router = createBrowserRouter([
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
      path:'/progress/:id',
      element:<Progress/>
    }
  ]);
  
  return(
    <RouterProvider router={router} ></RouterProvider>
  )
}

export default App
