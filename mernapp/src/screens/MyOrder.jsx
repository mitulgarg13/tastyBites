import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  // ✅ Use env variable for your backend
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const fetchMyOrder = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/myOrderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail')
        })
      });

      const response = await res.json();
      console.log("Fetched Order Data:", response);
      setOrderData(response.orderData.order_data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className='container'>
        <div className='row'>
          {orderData && orderData.slice(0).reverse().map((orderGroup, index) => {
            const orderDateObj = orderGroup[0];
            const items = orderGroup.slice(1);
            const orderDate = orderDateObj.Order_date;

            return (
              <React.Fragment key={index}>
                <div className='m-auto mt-5'>
                  <strong>Date: {new Date(orderDate).toLocaleDateString()}</strong>
                  <hr />
                </div>

                {items.map((item, itemIndex) => (
                  <div className='col-12 col-md-6 col-lg-3' key={itemIndex}>
                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                      <img
                        src={item.img}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "120px", objectFit: "fill" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                          <span className='m-1'>{item.qty}</span>
                          <span className='m-1'>{item.size}</span>
                          <div className='d-inline ms-2 h-100 w-20 fs-5'>
                            ₹{item.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
