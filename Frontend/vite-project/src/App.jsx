import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {useState} from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import Register from './Authentication/Register';
import Login from './Authentication/Login';
import MessagePage from './Message/MessagePage';
import {LoginContext} from'./AuthContext/LoginContext'

function App() {
 const [data, setData] = useState([]);
  return (
    <LoginContext.Provider value={{data,setData}}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='message' element={<MessagePage/> } />
      </Routes>
    </BrowserRouter>
    </LoginContext.Provider>
  )
}

export default App
