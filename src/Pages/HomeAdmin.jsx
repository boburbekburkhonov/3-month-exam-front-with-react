import React, { useEffect, useState } from "react";
import "./Home.css";

const HomeAdmin = () => {
  const [company, setCompany] = useState([]);
  const [complex, setComplex] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9090/company")
      .then((res) => res.json())
      .then((data) => setCompany(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:9090/complex")
      .then((res) => res.json())
      .then((data) => setComplex(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:9090/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:9090/banks")
      .then((res) => res.json())
      .then((data) => setBanks(data));
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="welcome">
          <div className="content rounded-3 p-3">
            <h1 className="fs-3 fw-bold">Hello Welcome to Admin Page.</h1>
          </div>
        </div>
      </div>

      <div className="block">
        <p>sayt test rejimida ishlamoqda!</p>
      </div>

      <div className="ps-4 wrapper">
        <div className="statis-wrapper">
          <h2 className="statis-heading">Jami kompaniyalar</h2>
          <p className="statis-desc">{company.length} ta</p>

          <img
            className="statis-img"
            width="50"
            height="50"
            src="https://cdn-icons-png.flaticon.com/128/7730/7730177.png"
            alt=""
          />
        </div>

        <div className="statis-wrapper">
          <h2 className="statis-heading">Jami komplekslar</h2>
          <p className="statis-desc">{complex.length} ta</p>

          <img
            className="statis-img"
            width="50"
            height="50"
            src="https://cdn-icons-png.flaticon.com/128/7730/7730177.png"
            alt=""
          />
        </div>

        <div className="statis-wrapper">
          <h2 className="statis-heading">Jami xonalar</h2>
          <p className="statis-desc">{rooms.length} ta</p>

          <img
            className="statis-img"
            width="50"
            height="50"
            src="https://cdn-icons-png.flaticon.com/128/7730/7730177.png"
            alt=""
          />
        </div>

        <div className="statis-wrapper">
          <h2 className="statis-heading">Jami banklar</h2>
          <p className="statis-desc">{banks.length} ta</p>

          <img
            className="statis-img"
            width="50"
            height="50"
            src="https://cdn-icons-png.flaticon.com/128/7730/7730177.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default HomeAdmin;
