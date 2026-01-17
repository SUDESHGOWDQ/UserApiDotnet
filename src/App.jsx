import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home/Home.jsx'
import Edit from './Pages/Edit/Edit.jsx'
import Create from './Pages/Create/Create.jsx'
import Search from './Pages/Search/Search.jsx'
import Navbar from './Pages/Navbar/index.jsx'

const App = () => {
  return (
	<div>
	  <BrowserRouter>
	    <Navbar/>
	    <Routes>
		  <Route path='/' element={<Home/>}></Route>
		   <Route path='/create' element={<Create/>}></Route>
		  <Route path='/edit/:id' element={<Edit/>}></Route>
		  <Route path='/search' element={<Search/>}></Route>
		</Routes>
	  </BrowserRouter>
	</div>
  )
}

export default App