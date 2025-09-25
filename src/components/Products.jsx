import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import axios from 'axios';

const Products = () => {
    const[products,setProducts]=useState([]);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState("");
  
    const navigate=useNavigate()
  
    const img_url="https://rexkinoo.pythonanywhere.com/static/images/"
  
  
    const fetchProducts=async ()=>{
      try{
      const response=await axios.get("https://rexkinoo.pythonanywhere.com/api/getproducts")
      setProducts(response.data)
      setLoading(false)
    }
    catch(error){
      setLoading(false)
      setError("An error occured try again later...")
    }
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  return (
    <div>
        <h1 className="text-success">Available engines</h1>
        {loading && <Loader/>}
        <div className="row">
      {products.map((products,index)=>(
      <div className="col-md-3 justify-content-center mb-4">
        <div className="card shadow h-100">
          <img src={img_url+products.product_photo} alt="" className='card-img product-img  img_card mt-3' /><br />
          <div className="card-body">
            <h3 className='text-primary'>{products.product_name}</h3><br />
            <h5 className='text-info'>{products.product_description.slice(0,10)}...</h5><br /><br />
            <b className='text-danger'>Ksh.{products.product_cost}</b><br /><br />
            <button className='btn btn-info mt-2' onClick={()=>navigate('/productdetails',{ state:
                  {products}
                })}>See more</button>

     



          </div>


          
        </div>

      </div>
           ))}
       </div>
    </div>
  )
}

export default Products