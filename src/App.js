import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Homeindex from './HomeComponents/Homeindex'
import Admindex from './AdminComponents/Adminindex'
function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route index path='/*' element={<Homeindex/>}/>
        <Route exact path='admin/*' element={<Admindex/>}/>
        </Routes>
      </Router>
    </>
  ) 
}

export default App
