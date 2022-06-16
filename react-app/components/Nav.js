import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Nav = () => {
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  console.log("current => ", current);

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };
  return (
    <ul className="nav bg-dark d-flex justify-content-between">
      <Link aria-current="page" href="/">
        <a className="nav-link text-light logo">MERN CAMP</a>
      </Link>

      {state === null ? (
        <>
          <Link aria-current="page" href="/register">
            <a
              className={`nav-link text-light ${
                current === "/register" && "active"
              }`}
            >
              Register
            </a>
          </Link>
          <Link aria-current="page" href="/login">
            <a
              className={`nav-link text-light ${
                current === "/login" && "active"
              }`}
            >
              Login
            </a>
          </Link>
        </>
      ) : (
        <>
          <Link aria-current="page" href="/user/dashboard">
            <a
              className={`nav-link text-light ${
                current === "/user/dashboard" && "active"
              }`}
            >
              {state && state.user && state.user.name}
            </a>
          </Link>
          <a onClick={logout} className="nav-link text-light ">
            Logout
          </a>
        </>
      )}
    </ul>
  );
};

export default Nav;
