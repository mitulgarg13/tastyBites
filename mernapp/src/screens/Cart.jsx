import React, { useState } from 'react';
import Delete from "@mui/icons-material/Delete";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Use env variable for your live backend URL
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  if (data.length === 0) {
    return (
      <div>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className='m-5 w-100 text-center fs-3 text-white'>
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    if (data.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    let userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      toast.error("Please login to place an order.");
      return;
    }

    setLoading(true);

    try {
      let response = await fetch(`${BASE_URL}/api/auth/orderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      console.log("JSON RESPONSE:::::", response.status);

      if (response.status === 200) {
        dispatch({ type: "DROP" });
        toast.success("✅ Order placed successfully!");
      } else {
        toast.error("❌ Order failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="text-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover text-white'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <Delete
                    style={{ cursor: 'pointer', color: 'white' }}
                    onClick={() => dispatch({ type: "REMOVE", index })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
        </div>

        <div>
          <button
            className='btn bg-success mt-5 text-white'
            onClick={handleCheckOut}
            disabled={loading}
          >
            {loading ? "Processing..." : "Check Out"}
          </button>
        </div>
      </div>
    </div>
  );
}
