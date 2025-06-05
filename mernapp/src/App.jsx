
import './App.css'
import './custom.scss';
import Home from './screens/Home'

import { BrowserRouter , Routes, Route ,Link} from "react-router-dom";
import Login from './screens/Login'
import Signup from './screens/Signup.jsx';
import MyOrder from './screens/MyOrder.jsx';
import Cart from './screens/Cart.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {


  return (
    <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
    </BrowserRouter>
  )
}

export default App
