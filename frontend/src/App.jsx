import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Button from 'react-bootstrap/Button';

import Home from "./pages/Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './pages/Products/Products';
import Contact from './pages/Contact/Contact';

function App() {

  return (
      <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/products" element={<Product/>}/>
          <Route path="/contact" element={<Contact/>}/>
          
        </Routes>  
      </Router></>
  )
}
export default App;
