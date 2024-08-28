
import { createBrowserRouter,BrowserRouter, Routes, Route, HashRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./components/DashBoard";
const App=()=>{
  const router = createBrowserRouter([
    {
      path:'/',
      element:<DashBoard/>
    }
  ]);
  
  return(
    <RouterProvider router={router} ></RouterProvider>
  )
}

export default App
