import React, { useEffect, useState } from 'react';
import '../Admin.css'
import './Company.css'
import { Link } from 'react-router-dom';


const Admin = () => {
//! LOGOUT
  const token = window.localStorage.getItem('token');

  if(!token){
    window.location.href = '/'
  }

  function logout(){
    window.localStorage.removeItem('token');
    window.location.href = '/';
  }

  const[company, setCompany] = useState([])
  const[count, setCount] = useState(1)

  useEffect(() => {
    fetch("http://localhost:9090/company")
      .then((res) => res.json())
      .then((data) => setCompany(data));
  }, [count])

  const addCompany = e => {
    e.preventDefault();

    const { name, imgUrl } = e.target;

    fetch('http://localhost:9090/company/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'access_token': token
      },
      body: JSON.stringify({
        name: name.value,
        imgUrl: imgUrl.value
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.status == 400){
        alert(data.message)
      }else {
        setCount(count + 1)
      }
    })

    name.value = '';
    imgUrl.value = '';
  }

  const deleteCompany = e => {
    fetch(`http://localhost:9090/company/delete/${e}`, {
      method: 'DELETE',
      headers: {
        'access_token': token
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data) setCount(count + 1)
    })
  }


  return (
    <div>
      <aside className="sidebar position-fixed top-0 left-0 overflow-auto h-100 float-left" id="show-side-navigation1">
        <i className="uil-bars close-aside d-md-none d-lg-none" data-close="show-side-navigation1"></i>
        <div className="sidebar-header d-flex justify-content-center align-items-center px-3 py-4">
          <img
              className="rounded-pill img-fluid"
              width="65"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              alt=""/>
          <div className="ms-2">
            <h5 className="fs-6 mb-0">
              <a className="text-decoration-none text-dark fw-bold h4" href="#">Admin</a>
            </h5>
          </div>
        </div>

        <ul className="categories list-unstyled">
          <li className="">
            <i className="uil-map-marker-home"></i>
            <Link to='/admin' className='text-dark fw-bold h6'>
              Home
            </Link>
          </li>
          <li className="">
            <i className="uil-map-marker-admin"></i>
            <Link to='/admin/company' className='text-dark fw-bold h6'>
              Company
            </Link>
          </li>
          <li className="">
            <i className="uil-map-marker-teacher"></i>
            <Link to='/admin/complex' className='text-dark fw-bold h6'>
              Complex
            </Link>
          </li>
          <li className="">
            <i className="uil-map-marker-course"></i>
            <Link to='/admin/rooms' className='text-dark fw-bold h6'>
              Rooms
            </Link>
          </li>
          <li className="">
            <i className="uil-map-marker-student"></i>
            <Link to='/admin/banks' className='text-dark fw-bold h6'>
              Banks
            </Link>
          </li>
        </ul>
      </aside>

      <section id="wrapper">
        <nav className="navbar navbar-expand-md">
          <div className="container-fluid mx-2">
            <div className="navbar-header">
              <img width='250' height='150' src="https://cutewallpaper.org/24/house-logo-png/logo-f06fa-home-0308f-png-2586f-free-b0761-transparent-98563-png-bb38f-logos.png" alt="logo" />

              <div className="logout-wrapper" id="logout">
                <img className="logout-img" src="https://cdn-icons-png.flaticon.com/128/4436/4436954.png" alt="logout" width="30" height="30" />
                <button onClick={logout} className="logout m-0 text-dark h4 fw-bold ms-1">Logout</button>
              </div>
            </div>
          </div>
        </nav>

      <div className="container pt-4 px-4">
      <h2 className='h1'>Yangi kompaniya qo'shish</h2>

      <form className='d-flex justify-content-between align-items-center mt-4' onSubmit={addCompany}>
        <div>
          <span className='company-span'>Kompaniya nomi</span>
          <input className='form-control mt-3' type="text" placeholder='Kompaniya nomi...' name='name' required/>
        </div>

        <div>
          <span className='company-span'>Kompaniya rasmining linki</span>
          <input className='form-control mt-3' type="text" placeholder='Link...' name='imgUrl' required/>
        </div>

        <button className='company-btn'>Qo'shish</button>
      </form>

      <h2 className='h1 mt-5'>Kompaniyalar</h2>

        <div className='company-body pt-4 d-flex justify-content-between align-content-center flex-wrap'>

            {
              company && company.map((e, i) => {
              return <div className="card-style mb-4" style={{width: '18rem'}} key={i}>
                  <img src={e.company_img_url} className="card-img-top" alt="img" />
                  <div className="card-body h4 fw-bold mt-3 d-flex justify-content-between align-content-center">
                    <p className="card-text">{e.company_name}</p>

                    <button onClick={() => deleteCompany(e.company_id)} className='delete-btn' ></button>
                  </div>
                </div>
              })
            }

          </div>
      </div>

      </section>
    </div>
  );
};

export default Admin;