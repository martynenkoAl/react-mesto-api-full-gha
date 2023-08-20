import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";
import { useContext } from "react";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-btn"
          type="button"
          onClick={onEditAvatar}
        >
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-btn"
            aria-label="Править"
            type="button"
            onClick={onEditProfile}
          />
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-btn"
          aria-label="Добавить"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__container">
          {cards.map((el) => {
            return (
              <li key={el._id}>
                <Card
                  card={el}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
