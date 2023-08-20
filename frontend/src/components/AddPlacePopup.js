import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";

function AddPlacePopup({ onClose, onAddPlace, isLoading, isOpen, onClick }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="cards"
      btntext={isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onClick={onClick}
    >
      <label className="popup__field">
        <input
          id="place-input"
          type="text"
          name="place"
          placeholder="Название"
          className="popup__text popup__text_type_place"
          minLength={2}
          maxLength={30}
          required
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__text-error_place popup__text-error" />
      </label>
      <label className="popup__field">
        <input
          id="link-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__text popup__text_type_link"
          required
          value={link}
          onChange={handleChangeLink}
        />
        <span className="popup__text-error_link popup__text-error" />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
