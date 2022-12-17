import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const User = () => {
  return (
    <div>
      <div className="container">
        <div className='d-flex justify-content-between align-items-center'>
          <a href="#">
            <img width='440' height='240' className='home-logo' src="https://cutewallpaper.org/24/house-logo-png/logo-f06fa-home-0308f-png-2586f-free-b0761-transparent-98563-png-bb38f-logos.png" alt="" />
          </a>

          <a className='text-decoration-none d-flex justify-content-between align-items-center' href="#">
            <img src="https://cdn-icons-png.flaticon.com/128/2337/2337619.png" alt="admin" width='35' height='35' />

            <Link to='/login' className='home-admin-heading text-decoration-none'>Admin</Link>
          </a>
        </div>


        <div className='d-flex justify-content-between align-items-center  pt-5'>
          <div className='mw-25'>
            <h2 className='mb-4'>Choose Company:</h2>
            <select className='form-select'>
              <option value="">Tashkent City</option>
            </select>
          </div>

          <div className='mw-25'>
            <h2 className='mb-4'>Choose Complex:</h2>
            <select className='form-select'>
              <option value="">Tashkent City Shayhontohir</option>
            </select>
          </div>

          <div className='mw-25'>
            <h2 className='mb-4'>Choose Rooms:</h2>
            <select className='form-select'>
              <option value="">3</option>
            </select>
          </div>

          <div className='mw-25'>
            <h2 className='mb-4'>Choose Mortage Duration:</h2>
            <select className='form-select'>
              <option value="">15</option>
            </select>
          </div>
        </div>

        <div className='pt-5'>

          <h1 className='text-center'>Content</h1>

        </div>
      </div>
    </div>
  );
};

export default User;