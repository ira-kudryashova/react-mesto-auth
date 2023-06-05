import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import '../index.css';

import { Header } from './Header.js';
import { Main } from './Main.js';
import { Footer } from './Footer.js';
import { Login } from './Login.js';
import { InfoTooltip } from './InfoTooltip.js';
import { Register } from './Register.js';

import { ProtectedRoute } from './ProtectedRoute.js';

import { ImagePopup } from './ImagePopup.js';

import { AppContext } from '../contexts/AppContext.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { ConfirmDeletePopup } from './ConfirmDeletePopup.js';

import { api } from '../utils/Api.js';
import { auth } from '../utils/Auth.js';

function App() {
  /** стейты */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({}); /** создаем переменную состояния, отвечающую за данные пользователя из апи. Стейт данных текущего пользователя*/
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false); /** переменная для отслеживания состояния загрузки во время ожидания ответа от сервера */

  const [loggedIn, setLoggedIn] = useState(false);
  const [authEmail, setAuthEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([currentUser, initialCards]) => {
        setCurrentUser(currentUser);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem('jwy');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setAuthEmail(res.data.email);
          navigate('/')
        })
        .carch((err) => {
          console.log(err)
        })
    }
  }, [navigate])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteClick(card) {
    setDeletedCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  /** обработчик лайка на карточках */
  function handleCardLike(card) {
    /** снова проверяем, есть ли уже лайк на карточке */
    const isLiked = card.likes.some(
      (i) => i._id === currentUser._id
    );
    /** запрос в апи и получение новых данных карточки */
    api
      .toggleLikeCard(
        card._id,
        !isLiked
      )
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /** универсальная функция, которая принимает функцию запроса */
  function handleSubmit(request) {
    /** изменяем текст кнопки до вызова запроса */
    setIsLoading(true);
    request()
      /** закрывать попап нужно только в `then` */
      .then(closeAllPopups)
      /** в каждом запросе ловим ошибку */
      /** console.error обычно используется для логирования ошибок, если никакой другой обработки ошибки нет */
      .catch(console.error)
      /** в каждом запросе в `finally` возвращаем обратно начальный текст кнопки */
      .finally(() => setIsLoading(false));
  }

  /** обработчик удаления карточки */
  function handleCardDelete(card) {
    function makeRequest() {
      return api.removeCardApi(card._id).then(() => {setCards((cards) => cards.filter((c) => c._id !== card._id))
    })}
    handleSubmit(makeRequest);
  }

  /** обработчик редактирования данных пользователя */
  function handleUpdateUser(inputValues) {
    function makeRequest()  {
      return api.editUserInfo(inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  /** обработчик редактирования аватара пользователя */
  function handleUpdateAvatar(inputValues) {
    function makeRequest() {
      return api.editUserAvatar(inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  
  /** обработчик добавления новой карточки */
  function handleAddPlaceSubmit(inputValues) {
    function makeRequest() {
      return api.addCards(inputValues).then((newCard) => {
        setCards([newCard,...cards,]);
      })}
    handleSubmit(makeRequest)  
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setLoggedIn(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err)
        setLoggedIn(false)
      })
      .finally(() => {
        setIsInfoTooltipOpen(true)
      })
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.data.token)
        setLoggedIn(true)
        setAuthEmail(email)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        setLoggedIn(true)
        setIsInfoTooltipOpen(true)
        setLoggedIn(false)
      })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    SecurityPolicyViolationEvent('')
    navigate('/sign-in')
  }

  /** закрытие всех попап */
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setDeletedCard({});
    setSelectedCard({});
  }

  return (
    <AppContext.Provider value = {{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='root'>
          <Header email={authEmail} onSignOut={handleSignOut} />

          <Routes>
            <Route path='/'
              element={
                <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDeleteClick={handleDeleteClick}
                onConfirmDelete={handleDeleteClick} />
              } 
            />

            <Route 
              path='/sign-in'
              element={
                <Login 
                navigate={navigate}
                loggedIn={setLoggedIn}
                onLogin={handleLogin}
              />}
            />

            <Route 
              path='/sign-up'
              element={
                <Register
                navigate={navigate}
                onRegister={handleRegister}
              />}
            />
          </Routes>

          {/* {loggedIn && <Footer />} */}
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen} //TODO: добавить ux и оверлей лдя всех попап
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading}
          />

          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            card={deletedCard}
            onSubmit={handleCardDelete}
            onLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          />

          <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip 
            isOpen={isInfoTooltipOpen}
            isConfirmStatus={loggedIn}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
