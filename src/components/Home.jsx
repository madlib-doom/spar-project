import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Home = () => {

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
    <div className='home'>
      <h1 className="text-success">Welcome to our Automart engines shop</h1>
      <p>Your one-stop shop for quality automotive engines</p>
      {loading && <Loader/>}
      </div>
      

      <div className="row">
    <div className="col-md-2">
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit debitis enim nesciunt quas necessitatibus eveniet libero quo harum, molestiae, minima obcaecati excepturi ipsa accusamus veritatis in! Maiores facere obcaecati sint.</p>
    </div>
    <div className='col-md-8'>
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/engine1.jpeg" className="d-block w-100 carousel-images" alt="Engine 1" />
              {/* <h1>derdrtd</h1> */}
            </div>
            <div className="carousel-item">
              <img src="/images/image2.webp" className="d-block w-100 carousel-images" alt="Engine 2" />
            </div>
            <div className="carousel-item">
              <img src="/images/image3.jpeg" className="d-block w-100 carousel-images" alt="Engine 3" />
            </div>
           
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="col-md-2">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit necessitatibus aliquid beatae ea officiis commodi, alias expedita nihil quas? Eum, dignissimos facere doloribus saepe quos laboriosam natus. Officiis, illum corrupti.</p>
      </div>
   
  
    </div>
    
    <div className="row">
      {products.map((products,index)=>(
      <div className="col-md-3 justify-content-center mb-4">
        <div className="card shadow h-100">
          <img src={img_url+products.product_photo} alt="" className='card-img product-img mt-3' /><br />
          <div className="card-body">
            <h3 className='text-primary'>{products.product_name}</h3><br />
            <h5 className='text-info'>{products.product_description}</h5><br /><br />
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
  );
};

export default Home;
