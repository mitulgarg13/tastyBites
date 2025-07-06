// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar(props) {

  const [cartView, setCartView] = useState(false);
  localStorage.setItem('temp', "first");
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  const items = useCart();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark position-sticky"
        style={{
          backgroundColor: "#800000", // ✅ Rich Maroon
          boxShadow: "0px 10px 20px black",
          position: "fixed",
          zIndex: "10",
          width: "100%"
        }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">TastyBites</Link> {/* ✅ New Outlet Name */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("token")) ?
                <li className="nav-item">
                  <Link className="nav-link fs-5 mx-3 active" to="/myorder">My Orders</Link>
                </li> : ""}
            </ul>

            {(!localStorage.getItem("token")) ?
              <form className="d-flex">
                <Link className="btn bg-white text-danger mx-1" to="/login">Login</Link> {/* ✅ Maroon buttons */}
                <Link className="btn bg-white text-danger mx-1" to="/signup">Signup</Link>
              </form> :
              <div>
                <div className="btn bg-white text-danger mx-2" onClick={loadCart}>
                  <Badge color="secondary" badgeContent={items.length}>
                    <ShoppingCartIcon />
                  </Badge>
                  Cart
                </div>

                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : ""}

                <button onClick={handleLogout} className="btn bg-white text-danger">Logout</button>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}
