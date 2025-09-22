import axios from 'axios'
import React, { useState } from 'react'
import Loader from './Loader'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Signin = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState('')


    const [loading,setLoading]=useState(false)
    const[success,setSuccess]=useState("")
    const [error,setError]=useState("")

    const navigate=useNavigate();

    const submit=async (e)=>{
        e.preventDefault()
        setLoading(true)

        setEmail('')
        setPassword('')
        
    
    

        try{
            
            const data=new FormData();
            
            data.append("email",email)
            data.append("password",password)
    
            const response=await axios.post("https://aarondev.pythonanywhere.com/api/signin",data)

            setLoading(false)

            if(response.data.message==="Login succesful"){
                localStorage.setItem("user",JSON.stringify(response.data.user))
                navigate("/")
            }
            else{
               setError( response.data.message)
            }
    }
    catch(error){
        setLoading(false)
        setError("An error occured")
    }
}
    
  return (
    <div>
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow">
                <h1 className='text-center text-primary'>Login</h1><br />
                {loading && <Loader/>}
    
    {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={submit}>
                    <label >Enter email here:</label><br />
                    <input type="email"
                    className='form-control'
                    placeholder='Enter email here'
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)} /> <br />
                    {/* {email} */}

                    <label >Enter password here:</label>
                    <input type="text"
                    placeholder='Enter password here'
                    className='form-control'
                    required
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} /> <br /> <br />
                    {/* {password} */}

                    <button type='submit' className='btn btn-outline-warning'>Login</button><br /><br />

                    <h4 className='text-center text-info'> Don't have an account?</h4>br
                    <Link to="/Signup"><button className='btn btn-success'>Create one</button></Link>
                    

                </form>

            </div>
        </div>
    </div>
  )
}

export default Signin