import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Create.css'

const Create = () => {
	const[value,setValue] = useState({
		name:"",
		email:"",
		age:""
	})

	const navigate = useNavigate();

	  async function handleCreateData(e){
		e.preventDefault()
		const res = await axios.post("https://localhost:7027/api/users",value)
		console.log(res);
		navigate("/")
	  }


  return (
	<div className='create'>
	  <form onSubmit={handleCreateData}>
	    <h1>Create Page</h1>
	    <input type="text" placeholder='Name' value={value.name} onChange={e => setValue({...value, name: e.target.value})} />
		<input type="email" placeholder='Email' value={value.email} onChange={e => setValue({...value, email: e.target.value})} />
		<input type='number' placeholder='Age' value={value.age} onChange={e => setValue({...value, age: e.target.value})} />
		<button type='submit'>Submit</button>	
	  </form>
	</div>
  )
}

export default Create