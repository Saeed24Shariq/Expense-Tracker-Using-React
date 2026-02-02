import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SideBar from './components/SideBar.jsx'
import NavBar from './components/NavBar.jsx'
import Transactions from './components/Transactions.jsx'
import { store } from './store/store.jsx'
import { Provider } from 'react-redux'
import AddTransaction from './components/AddTransaction.jsx';
import Report from './components/Report.jsx'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Dashboard from './components/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <div className='flex'>
          <SideBar />

          <div className='w-[100vw] md:w-[calc(100vw-300px)] h-full'>
            <NavBar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Transactions" element={<Transactions overflow = {true} />} />
              <Route path="/Reports" element={<Report scroll = {true} />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </StrictMode>
  </BrowserRouter>

)
