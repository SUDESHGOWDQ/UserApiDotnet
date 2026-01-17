import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

const index = () => {
	const navigate = useNavigate();


	function handleCreate(){
		navigate('/create')
	}
	
	function handleSearch(){
		navigate('/search')
	}
	
	function handleHome(){
		navigate('/')
	}
	
  return (
	<div className='Navbar'>
	<div className='nav-left' onClick={handleHome} style={{cursor: 'pointer'}}>CRUD APP ASP DOT NET</div>
	<div className='nav-right'>
	<button onClick={handleSearch}>Search</button>
	<button onClick={handleCreate}>Create New</button>
	</div>
	</div>
  )
}

export default index