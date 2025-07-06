import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  const navigate = useNavigate();
  const dispatch = useDispatchCart();
  const data = useCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();

  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.item;

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const finalPrice = qty * parseInt(options[size] || 0);

  const handleAddToCart = async () => {
    if (!localStorage.getItem('token')) {
      return navigate('/login');
    }

    const existingFood = data.find(
      (item) => item.id === foodItem._id && item.size === size
    );

    if (existingFood) {
      await dispatch({
        type: 'UPDATE',
        id: foodItem._id,
        price: finalPrice,
        qty: qty,
      });
    } else {
      await dispatch({
        type: 'ADD',
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.ImgSrc,
      });
    }
  };

  return (
    <div>
      <div
        className="card mt-3"
        style={{
          width: '16rem',
          maxHeight: '400px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        }}
      >
        <img
          src={props.ImgSrc}
          className="card-img-top"
          alt={props.foodName}
          style={{
            height: '160px',
            objectFit: 'cover',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">{props.foodName}</h5>
          <div className="container w-100 p-0" style={{ height: '38px' }}>
            <select
              className="m-2 h-100 w-20 bg-danger text-white rounded"
              onChange={handleQty}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-2 h-100 w-20 bg-danger text-white rounded"
              ref={priceRef}
              onChange={handleOptions}
            >
              {priceOptions.map((sizeOption) => (
                <option key={sizeOption} value={sizeOption}>
                  {sizeOption}
                </option>
              ))}
            </select>
            <div className="d-inline ms-2 h-100 w-20 fs-5 fw-bold text-danger">
              ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button
            className="btn"
            style={{
              backgroundColor: '#800000', // rich maroon
              color: 'white',
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
