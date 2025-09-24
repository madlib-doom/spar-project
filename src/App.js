
import './App.css';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import Notfound from './components/Notfound';
import Home from './components/Home';
import Signin from './components/Signin';
import Register from './components/Register';
import Store from './components/Store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Mpesapayment from './components/Mpesapayment';
import ProductDetails from './components/Productdetails';
import Aboutus from './components/Aboutus';


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Engines  shop</h1>
       </header>
       <Router>
        <Navbar/>
        <Routes>
          <Route path='/Signup' element={<Register/>}/>
          <Route path='/Signin' element={<Signin/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<Notfound/>}/>
          <Route path='/addproducts' element={<Store/>}/>
          <Route path='/mpesapayment' element={<Mpesapayment/>}/>
          <Route path='/productdetails' element={<ProductDetails/>}/>
          <Route path="/about" element={<Aboutus/>}/>
          
        
        </Routes>
        <Footer/>
       </Router>




    </div>
  );
}

export default App;
