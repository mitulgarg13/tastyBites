import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  let [address, setAddress] = useState("");
  let navigate = useNavigate();

 const handleClick = async (e) => {
  e.preventDefault();
  try {
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    };

    let latlong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude];
    });

    let [lat, long] = latlong;
    console.log('Lat:', lat, 'Long:', long);

    const response = await fetch("http://localhost:5000/api/auth/getlocation", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latlong: { lat, long } })
    });

    const data = await response.json();
    console.log('Backend response:', data);

    if (data && data.location) {
      setAddress(data.location);
      setCredentials({ ...credentials, geolocation: data.location });
    } else {
      alert('Could not fetch location from server.');
    }
  } catch (err) {
    console.error('Error getting location:', err);
    alert('Please allow location access and try again.');
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch("http://localhost:5000/api/auth/createuser", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      location: credentials.geolocation
    })
  });

  const json = await response.json();

  if (json.success) {
    // ✅ Save both!
    localStorage.setItem('token', json.authToken);
    localStorage.setItem('userEmail', credentials.email);  // ✅ This is needed!

    navigate("/"); // ✅ Already logged in → go home
  } else {
    alert("Enter Valid Credentials");
  }
};


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
      backgroundSize: 'cover',
      height: '100vh'
    }}>
      <Navbar />
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded p-4' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-white">Name</label>
            <input type="text" className="form-control bg-dark text-white" name='name' value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email address</label>
            <input type="email" className="form-control bg-dark text-white" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label text-white">Address</label>
            <input type="text" className="form-control bg-dark text-white" name='address' placeholder='Click below for fetching address' value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="mb-3">
            <button type="button" onClick={handleClick} name="geolocation" className="btn btn-success">Click for current Location</button>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password</label>
            <input type="password" className="form-control bg-dark text-white" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className="btn btn-success me-2">Submit</button>
          <Link to="/login" className="btn btn-danger">Already a user</Link>
        </form>
      </div>
    </div>
  );
}
