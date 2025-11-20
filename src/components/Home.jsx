import React from 'react';
import { Link } from 'react-router-dom';
import Chatbot from './Chatbot';
import './css/home.css'; 

const Home = () => {
  return (
    <div className="bg-dark text-white home-page">

     
      <div
        className="home-hero d-flex justify-content-center text-start"
        style={{
       
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/images/banner2.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          position: 'relative',
          color: 'white',
          alignItems: 'center'
        }}
      >
        <div className="hero-content" style={{ zIndex: 2 }}>
          <h1  style={{
            fontFamily:"sans-serif",
            fontSize:'30px',
            fontWeight:'bold',
            fontVariant:'all-small-caps'
          }}
          className="display-4 fw-bold">Welcome to our Automart Spare part Shop</h1>
          <p style={{
            fontFamily:'serif',
            fontStyle:'italic',
            textAlign:'center'

          }} className="lead">Your one-stop shop for quality Spare Parts</p>
          <Link to="/products" className="btn btn-warning btn-lg mt-3">
            Browse Products
          </Link>
        </div>

        {/* subtle decorative overlay to further separate text from busy images */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            mixBlendMode: 'multiply'
          }}
        />
      </div>

      {/* Auto Parts Grid Section */}
     {/* Quick Links Section */}
{/* Quick Links Section */}
<div className="container my-5">
  <h2 style={{
    fontFamily:'serif',
    fontStyle:'italic',
    textAlign:'center'
  }}className="text-center mb-3">Our spare parts include:</h2>
  <p className="text-center text-muted mb-4">Popular categories</p>

  <div className="row row-cols-1 row-cols-md-3 g-4">
    {/* Card 1 */}
    <div className="col">
      <div className="card h-100 hover-card text-center border-0 shadow">
        <img src="/images/parts/wheel.png" className="card-img-top p-4" alt="Wheels" />
        <div className="card-body">
          <h5 className="card-title mb-0">Wheels</h5>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="col">
      <div className="card h-100 hover-card text-center border-0 shadow">
        <img src="/images/parts/engine.png" className="card-img-top p-4" alt="Engine" />
        <div className="card-body">
          <h5 className="card-title mb-0">Engines</h5>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="col">
      <div className="card h-100 hover-card text-center border-0 shadow">
        <img src="/images/parts/suspension.png" className="card-img-top p-4" alt="Suspension" />
        <div className="card-body">
          <h5 className="card-title mb-0">Suspension</h5>
        </div>
      </div>
    </div>

    {/* Card 4 */}
    <div className="col">
      <div className="card h-100 hover-card text-center border-0 shadow">
        <img src="/images/parts/brakes.jpeg" className="card-img-top p-4" alt="Brakes" />
        <div className="card-body">
          <h5 className="card-title mb-0">Brakes</h5>
        </div>
      </div>
    </div>

    {/* Card 5 */}
    <div className="col">
      <div className="card h-100 hover-card text-center border-0 shadow">
        <img src="/images/parts/batteries.jpeg" className="card-img-top p-4" alt="Battery" />
        <div className="card-body">
          <h5 className="card-title mb-0">Batteries</h5>
        </div>
      </div>
    </div>

    {/* Card 6 */}
    <div className="col">
      <div className="card h-100 hover-card text-center border-0 shadow">
        <img src="/images/parts/oils.jpeg" className="card-img-top p-4" alt="Oil" />
        <div className="card-body">
          <h5 className="card-title mb-0">Oil & Fluids</h5>
        </div>
      </div>
    </div>
  </div>
</div>


<h5 className='text-center text-success '>Click <Link to="/products" 
  style={{
  textDecoration: 'none',    
    color: 'green',           

   
           
    display: 'inline-block',    
    fontWeight: 'bold',
    

}}>here
</Link> to view more products</h5>


      

      {/* Sticky Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Home;