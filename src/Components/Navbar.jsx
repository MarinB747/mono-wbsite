import React from "react";
import { Link } from "react-router-dom";
import "./Components.css";
export default function Navbar() {
  return (
    <div className="navbar">
      <Link className="navbar__title" to="/">
        VEHICLE STORE
      </Link>
      <div className="navbar__links">
        <Link className="navbar__links--item" to="/">
          Home
        </Link>
        <Link className="navbar__links--item" to="/store">
          Store
        </Link>
        <Link className="navbar__links--item" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}
