import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // React Component
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Layout = () => {
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    setHamburgerMenuOpen(!hamburgerMenuOpen);
  };
  return (
    <div>
      <div className="nav-bar">
        <FontAwesomeIcon
          className="nav-hamburger"
          icon={faBars}
          size="2x"
          onClick={toggleMenu}
        />
        <FontAwesomeIcon icon={faPencil} size="2x" />
        <div>Office Supplies</div>
        <div className="nav-categories">
          <a
            href="notebooks"
            className={
              location.pathname === "/notebooks"
                ? "page-nav__link active"
                : "page-nav__link"
            }
          >
            notebooks
          </a>
          <a
            href="pencils"
            className={
              location.pathname === "/pencils"
                ? "page-nav__link active"
                : "page-nav__link"
            }
          >
            pencils
          </a>
          <a
            href="scissors"
            className={
              location.pathname === "/scissors"
                ? "page-nav__link active"
                : "page-nav__link"
            }
          >
            scissors
          </a>
        </div>
        <div className="nav-sign-in">
          <a href="sign-in">Sign-in</a>
        </div>
      </div>

      <Outlet />

      <footer className="footer">
        <FontAwesomeIcon icon={faPencil} size="2x" />
      </footer>
      <div
        className={hamburgerMenuOpen ? "overlay" : "overlay hidden"}
        id="overlay"
        onClick={toggleMenu}
      ></div>
      <div
        className={
          hamburgerMenuOpen ? "hamburger-menu" : "hamburger-menu hidden"
        }
      >
        <ul className="hamburger-menu-list">
          <FontAwesomeIcon icon={faClose} onClick={toggleMenu} />
          <li>Overview</li>
          <li
            className={
              location.pathname === "/pencils"
                ? "hamburger_link active"
                : "hamburger_link"
            }
          >
            <a href="pencils">Pencils</a>
          </li>
          <li
            className={
              location.pathname === "/scissors"
                ? "hamburger_link active"
                : "hamburger_link"
            }
          >
            <a href="scissors">Scissors</a>
          </li>
          <li
            className={
              location.pathname === "/notebooks"
                ? "hamburger_link active"
                : "hamburger_link"
            }
          >
            <a href="notebooks">Notebooks</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Layout;
