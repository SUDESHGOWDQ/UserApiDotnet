import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import './Edit.css'

const Edit = () => {
	const[value,setValue] = useState({
		name:"",
		email:"",
		age:""
	})

	const {id} = useParams();

	useEffect(()=>{
		const fetchData = async () => {
			try {
				const res = await axios.get(`https://localhost:7027/api/Users/${id}`)
				setValue(res.data)
				console.log(res.data);
				
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
		fetchData()
	},[id])

	const navigate = useNavigate();

	  async function handleUpdateData(e){
		e.preventDefault()
		try {
			const res = await axios.put(`https://localhost:7027/api/users/${id}`, value)
			console.log(res);
			navigate("/")
		} catch (error) {
			console.error('Error updating user:', error)
		}
	  }


  return (
	<div className='Edit'>
	  <form onSubmit={handleUpdateData}>
	    <h1>Edit Page</h1>
	    <input type="text" placeholder='Name' value={value.name} onChange={e => setValue({...value, name: e.target.value})} />
		<input type="email" placeholder='Email' value={value.email} onChange={e => setValue({...value, email: e.target.value})} />
		<input type='number' placeholder='Age' value={value.age} onChange={e => setValue({...value, age: e.target.value})} />
		<button type='submit'>Submit</button>	
	  </form>
	</div>
  )
}

export default Edit