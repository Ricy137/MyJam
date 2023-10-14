import React, { useState, useEffect, type ComponentProps } from "react";
import cx from "clsx";
import { Link, useLocation } from "react-router-dom";
import MyJam from "@assets/watermelon.png";
// import AuthConBtn from "@modules/AuthConBtn";
// import AnimatedLogo from "@modules/AnimatedLogo";
// import AddressBoard from "@modules/AddressBoard";
import Mobile from "./Mobile";
import "./index.css";

const NavLink: React.FC<ComponentProps<typeof Link> & { curPath: boolean }> = ({
  to,
  children,
  curPath,
}) => (
  <li
    className={cx(
      "navbar-link relative flex items-center px-14px h-full overflow-hidden",
      curPath && "border-b-1px border-b-solid border-#147240"
    )}
  >
    <Link
      className="flex items-center h-full text-#147240 decoration-none"
      to={to}
    >
      {children}
    </Link>
  </li>
);

const Navbar: React.FC = () => {
  const { pathname: curPath } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [curPath]);

  return (
    <header className="fixed left-0 top-0 flex flex-row justify-between w-full h-80px bg-#FF6B6B z-1000">
      <Mobile
        open={isMobileMenuOpen}
        curPath={curPath === "/" ? "plaza" : curPath}
      />
      <nav
        className={cx(
          "max-w-1920px mx-auto flex justify-between sm:justify-start items-center w-full h-80px px-32px"
        )}
      >
        <Link
          to="/"
          className="mr-auto sm:mr-40px flex flex-row items-center decoration-none"
        >
          <img src={MyJam} alt="myJam icon" className="w-34px h-34px mr-26px" />
          <div className="text-32px font-bold text-#ffffff">MyJam</div>
        </Link>
        <ul className="navbar-linkArea mr-auto display-none sm:flex h-full items-center text-16px font-semibold">
          <NavLink
            to="/plaza"
            curPath={curPath === "/" || curPath === "/plaza"}
          >
            Plaza
          </NavLink>
          <NavLink to="/create" curPath={curPath === "/create"}>
            Create
          </NavLink>
        </ul>
        <div className="flex flex-row justify-between items-center gap-x-8px">
          {/* <AuthConBtn>
            <AddressBoard />
          </AuthConBtn> */}
          <label
            className="burger-container ml-20px sm:display-none"
            htmlFor="burger-check"
          >
            <input
              className="burger-check"
              id="burger-check"
              type="checkbox"
              checked={isMobileMenuOpen}
              onChange={(e) => setIsMobileMenuOpen(e.target.checked)}
            />
            <span className="burger" />
          </label>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
