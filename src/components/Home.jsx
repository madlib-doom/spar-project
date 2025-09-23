import React from 'react';

const Home = () => {
  return (
    <div>
    <div className='home'>
      <h1 className="text-success">Welcome to our engines shop</h1>
      <p>Your one-stop shop for quality automotive engines</p>
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
   
    <p></p>
    </div>
    <div className="row">
      <div className="col-md-3 mb-4">
        <div className="card shadow">
          
        </div>

      </div>
    </div>
   
    </div>
  );
};

export default Home;
