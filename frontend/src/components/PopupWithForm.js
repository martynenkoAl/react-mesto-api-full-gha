import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({
  title,
  name,
  btntext,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <h3 className="popup__title">{title}</h3>
        <form
          action=""
          className="popup__form"
          name={`form-${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            aria-label="Отправить"
            className="popup__submit-btn"
          >
            {btntext}
          </button>
        </form>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
