import React from "react";
import pass from "../images/pass.png";
import fail from "../images/fail.png";
import { usePopupClose } from "../hooks/usePopupClose";

function InfoTooltip({ onClose, isOpen, isSuccess }) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_info ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_info">
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
        />
        <img
          className="popup__icon"
          src={isSuccess ? pass : fail}
          alt="Результат регистрации"
        />
        <h2 className="popup__title popup__title_info">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
