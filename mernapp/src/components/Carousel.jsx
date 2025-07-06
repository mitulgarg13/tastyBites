import React from 'react';

export default function Carousel() {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          {/* Overlay: Search Bar */}
          <div className="carousel-caption d-flex flex-column justify-content-center align-items-center" style={{ zIndex: 9 }}>
            <form className="d-flex w-75">
              <input
                className="form-control me-2 bg-white bg-opacity-75 text-dark"
                type="search"
                placeholder="What are you craving?"
                aria-label="Search"
                style={{
                  border: '2px solid #800000',
                  borderRadius: '8px',
                }}
              />
              <button
                className="btn"
                type="submit"
                style={{
                  backgroundColor: '#800000',
                  color: 'white',
                  borderRadius: '8px',
                }}
              >
                Search
              </button>
            </form>
          </div>

          {/* Slides */}
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1600&auto=format&fit=crop&q=80"
              className="d-block w-100"
              alt="Burger"
              style={{
                filter: 'brightness(60%)',
                borderRadius: '10px',
                height: '450px',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1623334044303-241021148842?w=1600&auto=format&fit=crop&q=80"
              className="d-block w-100"
              alt="Pastry"
              style={{
                filter: 'brightness(60%)',
                borderRadius: '10px',
                height: '450px',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1522244451342-a41bf8a13d73?w=1600&auto=format&fit=crop&q=80"
              className="d-block w-100"
              alt="Barbeque"
              style={{
                filter: 'brightness(60%)',
                borderRadius: '10px',
                height: '450px',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
