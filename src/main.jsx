import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import SpreadSheet from './components/Spreadsheet.jsx';


createRoot(document.getElementById('root')).render(
  <div className=''>
      <HashRouter>
        <Routes>
            <Route path="/" element={<App/>}>
              <Route path="/sheet/:id" element={<SpreadSheet/>} />
            </Route>
        </Routes>
      </HashRouter>
  </div>
)
