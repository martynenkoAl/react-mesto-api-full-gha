import headerLogo from "../../src/images/logo.svg";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

function Header({ onSignOut, userEmail }) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Место" className="header__logo" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__box">
              <p className="header__email">{userEmail}</p>
              <Link
                className="header__exit-btn"
                onClick={onSignOut}
                to="/signin"
                replace
              >
                Выйти
              </Link>
            </div>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <Link className="header__link" to="/signup" replace>
              Регистрация
            </Link>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <Link className="header__link" to="/signin" replace>
              Войти
            </Link>
          }
        ></Route>
      </Routes>
    </header>
  );
}

export default Header;
