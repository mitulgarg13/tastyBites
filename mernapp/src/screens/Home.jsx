import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  // ✅ Use env variable for backend URL or fallback
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const loadFoodItems = async () => {
    try {
      let response = await fetch(`${BASE_URL}/api/auth/foodData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      setFoodItems(data.food_items);
      setFoodCat(data.category);
    } catch (error) {
      console.error("❌ Error fetching food data:", error);
    }
  };

  useEffect(() => {
    // ✅ Wake up backend on initial load
    fetch(`${BASE_URL}/ping`)
      .then(() => console.log('✅ Backend awake'))
      .catch(() => console.log('❌ Ping failed'));

    // ✅ Then load food data
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Carousel Section */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn text-white bg-danger"
                onClick={() => setSearch('')}
              >
                X
              </button>
            </div>
          </div>

          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=60"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1623334044303-241021148842?w=500&auto=format&fit=crop&q=60"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="pastry"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1522244451342-a41bf8a13d73?w=500&auto=format&fit=crop&q=60"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="barbeque"
            />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Food Categories and Cards */}
      <div className='container'>
        {foodCat && foodCat.length > 0 ? (
          foodCat.map((cat) => (
            <div key={cat._id || cat.id} className='row mb-3'>
              <div className='fs-3 m-3'>{cat.CategoryName}</div>
              <hr
                id="hr-success"
                style={{
                  height: "4px",
                  backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))"
                }}
              />
              {foodItems
                .filter(item =>
                  item.CategoryName === cat.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map(filterItem => (
                  <div key={filterItem._id || filterItem.id} className='col-12 col-md-6 col-lg-3'>
                    <Card
                      foodName={filterItem.name}
                      item={filterItem}
                      options={filterItem?.options?.[0] || {}}
                      ImgSrc={filterItem.img}
                    />
                  </div>
                ))
              }
            </div>
          ))
        ) : (
          <div className='text-center'>No categories found.</div>
        )}
      </div>

      <Footer />
    </div>
  );
}

