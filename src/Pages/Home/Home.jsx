import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.css'

const Home = () => {
	const[data,setData]	=React.useState([])

	async function fetchData(){
		 const res = await axios.get("https://localhost:7027/api/users")
		 setData(res.data)
	}

	useEffect(()=>{
		fetchData()
	},[data])


	function handleDelete(id){
		const res = axios.delete(`https://localhost:7027/api/users/${id}`)
		console.log(res);
	}

	
	

  return (
	<div className='Home'>
	  <h1>Home Page</h1>
	  <table>
	    <thead>
		  <tr>
		    <th>ID</th>
			<th>Name</th>
			<th>Email</th>
			<th>Age</th>
			<th>Actions</th>
		</tr>
		</thead>
		<tbody>

		     {
				data.map((item,index)=>{
					return(
						<tr key={item.id}>
						  <td>{item.id}</td>
						  <td>{item.name}</td>
						  <td>{item.email}</td>
						  <td>{item.age}</td>
						  <td>
						   <Link to={`/edit/${item.id}`}><button>Edit</button></Link>
							<button onClick={()=>handleDelete(item.id)}>Delete</button>
						  </td>
						</tr>
					)
				})
			 }

		  </tbody>
	  </table>
	</div>
  )
}

export default Home