import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const User = () => {
  const [companyId, setCompanyId] = useState([]);
  const [company, setCompany] = useState([]);
  const [complexGet, setComplexGet] = useState();
  const [complexId, setComplexId] = useState([]);
  const [complex, setComplex] = useState([]);
  const [roomsGet, setRoomsGet] = useState();
  const [roomsId, setRoomsId] = useState([]);
  const [rooms, setRooms] = useState([]);

  const complexSelectRef = useRef();
  const roomsSelectRef = useRef();

  // GET COMPANY
  useEffect(() => {
    fetch("http://localhost:9090/company")
      .then((res) => res.json())
      .then((data) => setCompany(data));
  }, []);

  // GET COMPLEX BY COMPANY_ID
  const getComplex = (e) => {
    complexSelectRef.current.insertAdjacentHTML(
      "beforeend",
      `<option selected hidden>Choose Complex</option>`
    );
    roomsSelectRef.current.insertAdjacentHTML(
      "beforeend",
      `<option selected hidden>Choose number of rooms</option>`
    );

    setComplexGet(e.target.value);

    fetch(`http://localhost:9090/company/${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setCompanyId(data));
  };
  // GET COMPLEX
  useEffect(() => {
    fetch(`http://localhost:9090/complex/company/${complexGet}`)
      .then((res) => res.json())
      .then((data) => setComplex(data));
  }, [complexGet]);

  // GET ROOMS
  const getRooms = (e) => {
    setRoomsGet(e.target.value);

    fetch(`http://localhost:9090/complex/${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setComplexId(data));
  };

  // GET ROOMS BY COMPLEX_ID
  useEffect(() => {
    fetch(`http://localhost:9090/rooms/complex/${roomsGet}`)
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, [roomsGet]);

  const roomsById = (e) => {
    fetch(`http://localhost:9090/rooms/${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setRoomsId(data));
  };

  console.log(companyId, complexId, roomsId);
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <a href="#">
            <img
              width="440"
              height="240"
              className="home-logo"
              src="https://cutewallpaper.org/24/house-logo-png/logo-f06fa-home-0308f-png-2586f-free-b0761-transparent-98563-png-bb38f-logos.png"
              alt=""
            />
          </a>

          <a
            className="text-decoration-none d-flex justify-content-between align-items-center"
            href="#"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2337/2337619.png"
              alt="admin"
              width="35"
              height="35"
            />

            <Link
              to="/login"
              className="home-admin-heading text-decoration-none"
            >
              Admin
            </Link>
          </a>
        </div>

        <div className="d-flex justify-content-between align-items-center  pt-5">
          <div className="mw-25">
            <h2 className="mb-4">Choose Company:</h2>
            <select
              name="company"
              onChange={getComplex}
              className="form-select"
            >
              <option selected disabled hidden>
                Choose Company
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

          <div className="mw-25">
            <h2 className="mb-4">Choose Complex:</h2>
            <select
              ref={complexSelectRef}
              onChange={getRooms}
              className="form-select"
            >
              <option selected disabled hidden>
                Choose Complex
              </option>
              {complex.length > 0 &&
                complex.map((e, i) => {
                  return (
                    <option key={i} value={e.complex_id}>
                      {e.complex_name}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="mw-25">
            <h2 className="mb-4">Choose Rooms:</h2>
            <select
              ref={roomsSelectRef}
              onChange={roomsById}
              className="form-select"
            >
              <option selected disabled hidden>
                Choose number of Rooms
              </option>
              {rooms.length > 0 &&
                rooms.map((e, i) => {
                  return (
                    <option key={i} value={e.room_id}>
                      {e.room_count}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="mw-25">
            <h2 className="mb-4">Choose Mortage Duration:</h2>
            <select disabled className="form-select">
              <option selected disabled hidden>
                Choose Mortage Duration
              </option>
              <option value="">5</option>
              <option value="">10</option>
              <option value="">15</option>
            </select>
          </div>
        </div>

        <div className="pt-5">
          <h1 className="text-center">Content</h1>
        </div>
      </div>
    </div>
  );
};

export default User;
