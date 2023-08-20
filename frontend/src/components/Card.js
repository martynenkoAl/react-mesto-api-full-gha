import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-btn ${
    isLiked && "element__like-btn_active"
  }`;
  const cardDeleteButtonClassName = `element__delete-btn ${
    isOwn && "element__delete-btn_active"
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__picture"
        onClick={handleCardClick}
      />
      <div className="element__info">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__likes">
          <button
            type="button"
            aria-label="Нравится"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <h2 className="element__likescount">{card.likes.length}</h2>
        </div>
      </div>

      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
      />
    </div>
  );
}

export default Card;
