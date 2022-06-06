import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <ul className="nav bg-dark d-flex justify-content-between">
      <Link aria-current="page" href="/">
        <a className="nav-link text-light logo">MERN CAMP</a>
      </Link>
      <Link aria-current="page" href="/register">
        <a className="nav-link text-light">Register</a>
      </Link>
      <Link aria-current="page" href="/login">
        <a className="nav-link text-light ">Login</a>
      </Link>
    </ul>
  );
};

export default Nav;
