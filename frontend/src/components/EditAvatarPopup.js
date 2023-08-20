import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, isLoading, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatarform"
      btntext={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          id="avatar-input"
          type="url"
          name="avatarpicture"
          placeholder="Ссылка на аватар"
          className="popup__text popup__text_type_avatar"
          required
          ref={avatarRef}
        />
        <span className="popup__text-error_avatarpicture popup__text-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
