import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Loader from './Loader';
// import './stylings/Signup.css'; // Make sure this contains both the loader and hero CSS

const Mpesapayment = () => {
    // we shall use the useLocation hook to retrieve the details(propertiesd) passed from the previous component
 const {products}=useLocation().state || {}
 const[phone,setPhone]=useState("");
// console.log("The products are: ",products)
 const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
   

  const img_url="https://rexkinoo.pythonanywhere.com/static/images/"
//   IMPLEMENT THE MPESA PAYMENT FUNCTION
const submit= async(e)=>{
    e.preventDefault()
    setLoading(true)

    const data=new FormData()
    data.append("phone",phone)
    data.append('amount',products.product_cost)

    const response= await axios.post("https://aarondev.pythonanywhere.com/api/mpesa_payment",data)
    setSuccess(response.data.message)
    setLoading(false)
}
    return (
    <div className='row justify-content-center mt-4' >
        <h2 className='text-success'>Lipa na mpesa</h2>

        <div className="col-md-6">
        <img src={img_url + products.product_photo} alt="product" 
        className='card-img product_img mt-3'/>
        <h4 className='text-danger'>{products.product_name}</h4>
        <h4>Price: <span className='text.primary'>KES{products.product_cost}</span></h4>
        </div>
        <div className="col-md-6">
            <div className="card shadow p-4">
               
            <form onSubmit={submit} >
                <label >Fill in the details to complete the transaction</label>
                {loading && <Loader />}
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <input type="number" className='form-control' value={products.product_cost} readOnly /> <br />
                <input type="number" placeholder='Enter phone number here. eg 2547...' 
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                
                className='form-control' /> <br /> <br />
                {/* {phone} */}

                <button className='btn btn-success'>Complete transaction</button>
            </form>
            </div>
        </div>
        {/* {product.product_cost} <br />
        {product.product_description} <br />
         {product.product_id}
          <br />
          {product.product_name} */}


    </div>
  )
}

export default Mpesapayment