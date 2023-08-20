import React from "react";
import { useState } from "react";

const Login = ({ onSignIn }) => {
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
    onSignIn(formValue.email, formValue.password);
  };

  return (
    <div className="auth">
      <form
        noValidate
        action=""
        className="popup__form"
        name="form-login"
        onSubmit={handleSubmit}
      >
        <h2 className="auth__title">Вход</h2>
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={formValue.email}
          autoComplete="off"
        ></input>
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
        ></input>
        <button className="auth__btn" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
