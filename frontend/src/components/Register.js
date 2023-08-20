import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onSignUp }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    onSignUp(formValue.email, formValue.password);
  };

  return (
    <div className="auth">
      <form
        noValidate
        action=""
        className="popup__form"
        name="form-register"
        onSubmit={handleSubmit}
      >
        <h2 className="auth__title">Регистрация</h2>
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={formValue.email}
          autoComplete="off"
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          minLength="6"
          onChange={handleChange}
          value={formValue.password}
          autoComplete="off"
        />
        <button className="auth__btn" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <Link className="auth__link" to="/signin">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
};

export default Register;
