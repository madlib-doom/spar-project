
import './App.css';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import Notfound from './components/Notfound';
import Home from './components/Home';
import Signin from './components/Signin';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1>Engines  shop</h1>
       </header>
       <Router>
        <Routes>
          <Route path='/Signup' element={<Register/>}/>
          <Route path='/Signin' element={<Signin/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<Notfound/>}/>
        
        </Routes>
       </Router>




    </div>
  );
}

export default App;
