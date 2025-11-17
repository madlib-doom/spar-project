import axios from 'axios'
import React, { useState } from 'react'
import Loader from './Loader'

const Store = () => {

    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [cost,setCost]=useState("")
    const [photo,setPhoto]=useState('')

    const [loading,setLoading]=useState(false)
     const [success,setSuccess]=useState("")
     const [error,setError]=useState("")

     const submit= async (e)=>{
        e.preventDefault()
        setLoading(true)
    
        const data = new FormData();
        data.append('product_name', name);
        data.append('product_description', description);
        data.append('product_cost', cost);
        data.append('product_photo', photo);
 
        try{
         const response=await axios.post("https://rexkinoo.pythonanywhere.com/api/addproduct",data)
         setLoading(false)
         setSuccess(response.data.message)

         setName("")
         setDescription("")
         setCost("")
         setPhoto("")
 
 
        }
        catch(error){
         setLoading(false)
         setError("An error occured try again later...")
        }
    }
   
     
  return (
    <div className='bg-dark '>
        <h1 className='Dembele'>Welcome to Autmarts Autmobile shop</h1>
        <p className='Dembele'>Your one stop shop for quality engines</p>


        <div className="row">
          <div className="col-md-2"></div>
          
            
        <div className="col-md-8 justify-content-center mt-4">
            <div className="card shadow p-4">
                <h6>Add your products here</h6>
                {loading && <Loader/> }
               { success && <div className="alert alert-success">{success}</div>}
          {error && <div className="alert alert-danger">{error}</div>}


                <form  onSubmit={submit}>
                    <input type="text"
                    className='form-control'
                    placeholder='Specify the product name here?'
                    required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}/> <br />
                    {/* {name} */}

<textarea
  className="form-control"
  placeholder="Add description here"
  rows="6"
  required
  value={description}
  onChange={(e)=>setDescription(e.target.value)}
></textarea><br />
{/* {description} */}

<input type="number"
className='form-control'
placeholder='How much is your product?'
required
value={cost}
onChange={(e)=>setCost(e.target.value)} /> <br />

{/* {cost} */}

<input type="file" 
className='form-control'
required
accept='images/*'
onChange={(e)=>setPhoto(e.target.files[0])}/> <br />

<button type='submit' className='btn btn-success'>Sell</button>

                </form>
            </div>

        </div>
        <div className="col-md-2"></div>
        </div>
    </div>
  )
}

export default Store