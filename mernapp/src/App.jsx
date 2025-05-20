
import './App.css'
import './custom.scss';
import Home from './screens/Home'
import { BrowserRouter , Routes, Route ,Link} from "react-router-dom";
import Login from './screens/Login'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
