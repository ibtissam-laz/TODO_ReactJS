import './App.css'
import Login from './pages/Login'
import Notes from './pages/Notes/Notes'
import Register from './pages/Register'
import ScrollNote from './pages/Notes/ScrollNote'
import { Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Tasks from './pages/Tasks/Tasks'
import Navbar from './pages/Navbar'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Navbar/>}>
        <Route exact path='/' element={<Home/>}/>
        <Route path='Notes' element={<Notes/>}>
        <Route element={<ScrollNote/>} path=":id"/>
        </Route>
        <Route path='Tasks' element={<Tasks/>}/>
      </Route>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Profile' element={<Profile/>}/>
    </Routes>
    </>
  )
}

export default App
