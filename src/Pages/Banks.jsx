import React, { useEffect, useState } from "react";
import "../Admin.css";
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

  const [state, setState] = useState(1);
  const [banks, setBanks] = useState([]);

  // GET BANKS
  useEffect(() => {
    fetch("http://localhost:9090/banks")
      .then((res) => res.json())
      .then((data) => setBanks(data));
  }, [state]);

  const createBank = (e) => {
    e.preventDefault();

    const { name, money, term, percentage } = e.target;

    fetch("http://localhost:9090/banks/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        access_token: token,
      },

      body: JSON.stringify({
        name: name.value,
        money: money.value,
        term: term.value,
        percentage: percentage.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 201) {
          setState(state + 1);
        } else {
          alert(data.message);
        }
      });

    name.value = "";
    money.value = "";
    percentage.value = "";
  };

  const deleteBank = (e) => {
    fetch(`http://localhost:9090/banks/delete/${e}`, {
      method: "DELETE",
      headers: {
        access_token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) setState(state + 1);
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
          <h2 className="h1">Yangi bank qo'shish</h2>

          <form
            className="d-flex justify-content-between align-items-center flex-wrap mt-4"
            onSubmit={createBank}
          >
            <div>
              <span className="company-span">Bank nomi</span>
              <input
                className="form-control mt-3"
                type="text"
                placeholder="Bank nomi..."
                name="name"
                required
              />
            </div>

            <div>
              <span className="company-span">Bank qancha bera oladi</span>
              <input
                className="form-control mt-3"
                type="number"
                placeholder="Bank qancha bera oladi..."
                name="money"
                required
              />
            </div>

            <div>
              <span className="company-span">Muddati</span>
              <select name="term" className="form-select mt-3">
                <option selected disabled hidden>
                  Choose term
                </option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>

            <div>
              <span className="company-span">Foiz stavkasi</span>
              <input
                className="form-control mt-3"
                type="number"
                placeholder="Foiz stavkasi..."
                name="percentage"
                required
              />
            </div>

            <button className="company-btn">Qo'shish</button>
          </form>

          <h2 className="h1 mt-5">Banklar</h2>

          <div className="company-body pt-4 d-flex justify-content-between align-content-center flex-wrap">
            <table className="table table-primary table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th className="h6 fw-bold" scope="col">
                    Bank nomi
                  </th>
                  <th className="h6 fw-bold" scope="col">
                    Qancha berishi
                  </th>
                  <th className="h6 fw-bold" scope="col">
                    Muddati
                  </th>
                  <th className="h6 fw-bold" scope="col">
                    Foiz stavkasi
                  </th>
                  <th className="h6 fw-bold" scope="col">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {banks &&
                  banks.map((e, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td className="fw-normal">{e.bank_name}</td>
                        <td className="fw-normal">{e.bank_give_money} sum</td>
                        <td className="fw-normal">{e.bank_money_term} yil</td>
                        <td className="fw-normal">{e.bank_percentage} %</td>
                        <td>
                          <button
                            onClick={() => deleteBank(e.bank_id)}
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
