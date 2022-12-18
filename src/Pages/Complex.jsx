import React, { useEffect, useState } from "react";
import "../Admin.css";
import "./Complex.css";
import { Link } from "react-router-dom";

const Admin = () => {
  const token = window.localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
  }

  function logout() {
    window.localStorage.removeItem("token");
    window.location.href = "/";
  }

  const [count, setCount] = useState(1);
  const [complex, setComplex] = useState([]);
  const [company, setCompany] = useState([]);

  // GET COMPANY

  useEffect(() => {
    fetch("http://localhost:9090/company")
      .then((res) => res.json())
      .then((data) => setCompany(data));
  }, []);

  // GET COMPLEX

  useEffect(() => {
    fetch("http://localhost:9090/complex")
      .then((res) => res.json())
      .then((data) => setComplex(data));
  }, [count]);

  // CREATE COMPLEX

  const createComplex = (e) => {
    e.preventDefault();

    const { complexName, company } = e.target;

    fetch("http://localhost:9090/complex/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        access_token: token,
      },
      body: JSON.stringify({
        complexName: complexName.value,
        company: company.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 201) {
          setCount(count + 1);
        } else {
          alert(data.message);
        }
      });

    complexName.value = "";
  };

  // DELETE COMPLEX

  const complexDelete = (e) => {
    fetch(`http://localhost:9090/complex/delete/${e}`, {
      method: "DELETE",
      headers: {
        access_token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) setCount(count + 1);
      });
  };

  return (
    <div>
      <aside
        className="sidebar position-fixed top-0 left-0 overflow-auto h-100 float-left"
        id="show-side-navigation1"
      >
        <i
          className="uil-bars close-aside d-md-none d-lg-none"
          data-close="show-side-navigation1"
        ></i>
        <div className="sidebar-header d-flex justify-content-center align-items-center px-3 py-4">
          <img
            className="rounded-pill img-fluid"
            width="65"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            alt=""
          />
          <div className="ms-2">
            <h5 className="fs-6 mb-0">
              <a className="text-decoration-none text-dark fw-bold h4" href="#">
                Admin
              </a>
            </h5>
          </div>
        </div>

        <ul className="categories list-unstyled">
          <li className="">
            <i className="uil-map-marker-home"></i>
            <Link to="/admin" className="text-dark fw-bold h6">
              Home
            </Link>
          </li>
          <li className="">
            <i className="uil-map-marker-admin"></i>
            <Link to="/admin/company" className="text-dark fw-bold h6">
              Company
            </Link>
          </li>
          <li className="">
            <i className="uil-map-marker-teacher"></i>
            <Link to="/admin/complex" className="text-dark fw-bold h6">
              Complex
            </Link>
          </li>
          <li className="">
            <i className="uil-map-marker-course"></i>
            <Link to="/admin/rooms" className="text-dark fw-bold h6">
              Rooms
            </Link>
          </li>
          <li className="">
            <i className="uil-map-marker-student"></i>
            <Link to="/admin/banks" className="text-dark fw-bold h6">
              Banks
            </Link>
          </li>
        </ul>
      </aside>

      <section id="wrapper">
        <nav className="navbar navbar-expand-md">
          <div className="container-fluid mx-2">
            <div className="navbar-header">
              <img
                width="250"
                height="150"
                src="https://cutewallpaper.org/24/house-logo-png/logo-f06fa-home-0308f-png-2586f-free-b0761-transparent-98563-png-bb38f-logos.png"
                alt="logo"
              />

              <div className="logout-wrapper" id="logout">
                <img
                  className="logout-img"
                  src="https://cdn-icons-png.flaticon.com/128/4436/4436954.png"
                  alt="logout"
                  width="30"
                  height="30"
                />
                <button
                  onClick={logout}
                  className="logout m-0 text-dark h4 fw-bold ms-1"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="container pt-4 px-4">
          <h2 className="h1">Yangi Komplex qo'shish</h2>

          <form
            onSubmit={createComplex}
            className="d-flex justify-content-between align-items-center mt-4"
          >
            <div>
              <span className="company-span">Kompaniya nomi</span>
              <select name="company" className="form-select mt-3">
                <option selected disabled hidden>
                  Choose company
                </option>
                {company &&
                  company.map((e, i) => {
                    return (
                      <option key={i} value={e.company_id}>
                        {e.company_name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div>
              <span className="company-span">Komplex nomi</span>
              <input
                className="form-control mt-3"
                type="text"
                placeholder="Komplex nomi..."
                name="complexName"
                required
              />
            </div>

            <button className="company-btn">Qo'shish</button>
          </form>

          <h2 className="h1 mt-5">Komplekslar</h2>

          <div className="company-body pt-4 d-flex justify-content-between align-content-center flex-wrap">
            <table className="table table-primary table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th className="h6 fw-bold" scope="col">
                    Kompaniya nomi
                  </th>
                  <th className="h6 fw-bold" scope="col">
                    Komplex nomi
                  </th>
                  <th className="h6 fw-bold" scope="col">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {complex &&
                  complex.map((e, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td className="fw-normal">
                          {e.company_name ? (
                            e.company_name
                          ) : (
                            <p className="text-danger fw-bold">
                              Bu kompleksning kompaniyasi yopilgan
                            </p>
                          )}
                        </td>
                        <td className="fw-normal">{e.complex_name}</td>
                        <td>
                          <button
                            onClick={() => complexDelete(e.complex_id)}
                            className="complex-delete"
                          ></button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
