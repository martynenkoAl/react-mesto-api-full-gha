import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/api";
import * as auth from "../utils/auth.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [headerEmail, setHeaderEmail] = useState("");
  const navigate = useNavigate();

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  }

  function handleUpdateUser(info) {
    setIsLoading(true);
    api
      .setUserInfo(info)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .setAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfo(), api.getInitialCards()])
        .then(([user, card]) => {
          setCurrentUser(user);
          setCards(card);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((data) => {
          setLoggedIn(true);
          setHeaderEmail(data.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    } else {
      setLoggedIn(false);
    }
  }, [navigate]);

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setHeaderEmail("");
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  }

  function handleSignUp(email, password) {
    auth
      .register(email, password)
      .then((data) => {
        setIsInfoTooltipSuccess(true);
        navigate("/signin", { replace: true });
      })
      .catch((error) => {
        setIsInfoTooltipSuccess(false);
        console.log(`Ошибка: ${error}`);
      })
      .finally(() => {
        setIsInfoPopupOpen(true);
      });
  }

  function handleSignIn(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        setIsInfoTooltipSuccess(false);
        setIsInfoPopupOpen(true);
        console.log(`Ошибка: ${error}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page__container">
          <Header userEmail={headerEmail} onSignOut={handleSignOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onEditProfile={setIsEditProfilePopupOpen}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/signup"
              element={<Register onSignUp={handleSignUp} />}
            />
            <Route path="/signin" element={<Login onSignIn={handleSignIn} />} />
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
            isLoading={isLoading}
            isOpen={isAddPlacePopupOpen}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isSuccess={isInfoTooltipSuccess}
            onClose={closeAllPopups}
            isOpen={isInfoPopupOpen}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
