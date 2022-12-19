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
  const [banks, setBanks] = useState([]);
  const [bankId, setBankId] = useState([]);
  const [roomsPrice, setRoomsPrice] = useState();

  const complexSelectRef = useRef();
  const roomsSelectRef = useRef();
  const contentWrapper = useRef();

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
      .then((data) => setRoomsId([data]));
  };

  const percentage = (e) => {
    fetch(`http://localhost:9090/banks/${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setBanks(data));
  };

  useEffect(() => {
    let roomPrice;

    roomsId.map((e) => {
      roomPrice = e.room_size * Number(e.room_price.replaceAll(" ", ""));
    });

    setRoomsPrice(roomPrice);

    const [firstBank] = banks.filter((e) => e.bank_give_money > roomPrice);

    setBankId([firstBank]);
  }, [banks]);

  return (
    <div className="wrapper-home">
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
            <select onChange={percentage} className="form-select">
              <option selected disabled hidden>
                Choose Mortage Duration
              </option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <div className="pt-5">
            {companyId.length > 0 &&
              companyId.map((e, i) => {
                return (
                  <div key={i}>
                    <img
                      className="company-img"
                      width="250"
                      height="150"
                      src={e.company_img_url}
                      alt=""
                    />
                  </div>
                );
              })}

            <div ref={contentWrapper} className="content-wrapper">
              {complexId.length > 0 &&
                complexId.map((e, i) => {
                  return (
                    <p className="complex-desc" key={i}>
                      {e.complex_name}
                    </p>
                  );
                })}

              {roomsId.length > 0 &&
                roomsId.map((e, i) => {
                  return (
                    <div className="rooms-wrapper pt-4 pb-4" key={i}>
                      <div>
                        <p className="rooms-desc">
                          Xona:{" "}
                          <span className="rooms-value">
                            {e.room_count} xona
                          </span>
                        </p>
                      </div>

                      <div>
                        <p className="rooms-desc">
                          Kattaligi:{" "}
                          <span className="rooms-value">{e.room_size} m²</span>
                        </p>
                      </div>

                      <div>
                        <p className="rooms-desc">
                          Narxi (1m²):{" "}
                          <span className="rooms-value">
                            {e.room_price} so'm
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div>
            {!bankId.includes(undefined) &&
              bankId.map((e, i) => {
                return (
                  <div key={i}>
                    <img
                      width="300"
                      height="220"
                      src="https://download.logo.wine/logo/Chase_Bank/Chase_Bank-Logo.wine.png"
                      alt="logo"
                    />

                    <h2 className="bank-heading mb-4">{e.bank_name}</h2>

                    <p className="bank-desc">
                      Bank pul berishi:{" "}
                      <span className="bank-span">
                        {e.bank_give_money} so'm
                      </span>
                    </p>
                    <p className="bank-desc">
                      To'lov muddati:{" "}
                      <span className="bank-span">{e.bank_money_term} yil</span>
                    </p>
                    <p className="bank-desc">
                      Boshlang'ich to'lov:{" "}
                      <span className="bank-span">{e.bank_percentage} %</span>
                    </p>
                  </div>
                );
              })}
          </div>

          <div>
            {!bankId.includes(undefined) &&
              bankId.map((e, i) => {
                return (
                  <div key={i} className="pt-5 mb-4">
                    <img
                      className="calc-img"
                      width="250"
                      height="150"
                      src="https://thumbs.dreamstime.com/b/error-word-inscription-concept-failure-mistake-205503351.jpg"
                      alt="logo"
                    />

                    <h2 className="bank-calc-heading">Kalkulator</h2>

                    <p className="bank-desc">
                      Uyning narxi:{" "}
                      <span className="bank-span">{roomsPrice} so'm</span>
                    </p>
                    <p className="bank-desc">
                      Boshlang'ich to'lov:{" "}
                      <span className="bank-span">
                        {(roomsPrice * e.bank_percentage) / 100} so'm
                      </span>
                    </p>
                    <p className="bank-desc">
                      Oylik to'lov:{" "}
                      <span className="bank-span">
                        {Math.ceil(
                          (roomsPrice -
                            (roomsPrice * e.bank_percentage) / 100) /
                            (12 * e.bank_money_term)
                        )}
                        so'm
                      </span>
                    </p>
                    <p className="bank-desc">
                      To'lov muddati:{" "}
                      <span className="bank-span">{e.bank_money_term} yil</span>
                    </p>

                    <p className="bank-desc">
                      Bank Xizmati:{" "}
                      <span className="bank-span">2 500 000 so'm</span>
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
