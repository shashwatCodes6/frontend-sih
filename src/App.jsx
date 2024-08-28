
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import { Login } from "./components/Signin";
import { SignUp } from "./components/SignUp";


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
    }
  ]);
  
  return(
    <RouterProvider router={router} ></RouterProvider>
  )
}

export default App
