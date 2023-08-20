import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="user"
      btntext={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="username-input"
          type="text"
          name="username"
          placeholder="Имя"
          className="popup__text popup__text_type_username"
          minLength={2}
          maxLength={40}
          value={name || ""}
          required
          onChange={handleChangeName}
        />
        <span className="popup__text-error_username popup__text-error" />
      </label>
      <label className="popup__field">
        <input
          id="job-input"
          type="text"
          name="job"
          placeholder="О себе"
          className="popup__text popup__text_type_job"
          minLength={2}
          maxLength={200}
          value={description || ""}
          required
          onChange={handleChangeDescription}
        />
        <span className="popup__text-error_job popup__text-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
