import { Outlet } from 'react-router-dom'
import SpreadsheetGrid from './components/Spreadsheet'


function App() {

  return (
    <div className=''>
      <div className='flex flex-col'>
        <Outlet>
          <SpreadsheetGrid/>
        </Outlet>
      </div>
    </div>
  )
}

export default App
