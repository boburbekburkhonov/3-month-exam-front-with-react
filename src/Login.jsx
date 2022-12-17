import React from 'react';
import './Login.css'

const Login = () => {

  const loginChecker = e => {
    e.preventDefault();
    const { name, password } = e.target;

    fetch('http://localhost:9090/login/admin', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        password: password.value
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.access_token){
        window.localStorage.setItem('token', data.access_token);
        window.location.href = '/admin'
      } else if(data.status) {
        alert(data.message)
      }
    })

    name.value = '';
    password.value = '';
  }

  return (
    <div>
        <div className='box'>
          <div className='wave -one'></div>
          <div className='wave -two'></div>
          <div className='wave -three'></div>
        </div>
        <form className="card" onSubmit={loginChecker}>
          <div>
            <img width='100' height='100' src="https://cutewallpaper.org/24/house-logo-png/logo-f06fa-home-0308f-png-2586f-free-b0761-transparent-98563-png-bb38f-logos.png" alt="" />
            <h1 className='login-heading'>Welcome</h1>
          </div>

          <label className='h3'>Name:</label>
          <br />
          <input className='form-control' placeholder='Name...' type="text" name='name' required/>
          <br />
          <label className='h3'>Password:</label>
          <br />
          <input className='form-control' placeholder='Password...' type="password" name='password' required />
          <br />
          <p>
            <a href="#">forget password</a>
          </p>
          <button className='button'>Log in</button>
        </form>
    </div>
  );
};

export default Login;