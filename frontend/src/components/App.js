import { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from "../utils/Api.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import NavBar from './NavBar.js';
import InfoTooltip from './InfoTooltip.js'
import { register, authorize, checkToken } from '../utils/auth.js';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isInfoTooltipOpen , setInfoTooltipOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const resultTitle = isSuccess ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте еще раз.';


  useEffect(() => {
    if (loggedIn){
    Promise.all([api.getCurrentUser(), api.getCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }}, [loggedIn]);

  useEffect(() => {
    if (token) {
      checkToken()
      .then((res) => {
        if (res){
          setLoggedIn(true);
          setUserData({
            email: res.data.email
          });
          navigate("/", { replace: true })
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [token]);

  function signOut() {
    localStorage.removeItem('token')
    setLoggedIn(false);
    setUserData({ email: '' })
    navigate('/sign-in', {replace: true});
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true)
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleCardDelete(card) {
    api.deleteCards(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateUser(user) {
    api.setUserInfo({ item: user })
    .then((newUser) => {
      setCurrentUser(newUser)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(input) {
    api.setNewAvatar(input)
    .then((newAvatar) => {
      setCurrentUser(newAvatar)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlace(card) {
    api.addNewCard({ item: card })
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleRegister(email, password) {
    register(email, password)
    .then(() => {
      setSuccess(true);
      setInfoTooltipOpen(true);
      navigate('/sign-in', { replace: true });
    })
    .catch((err) => {
      console.log(err);
      setSuccess(false);
      setInfoTooltipOpen(true);
    })
  }

  function handleLogin(email, password) {
    authorize(email, password)
    .then((res) => {
      setUserData(email);
      if (res.token) {
        setLoggedIn(true);
        navigate('/', { replace: true })
      };
    })
    .catch((err) => {
      console.log(err);
      setSuccess(false);
      setInfoTooltipOpen(true);
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header>
          <NavBar
            email={userData.email}
            signOut={signOut}
            loggedIn={loggedIn}
          />
        </Header>
        <Routes>
          <Route 
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onClose={closeAllPopups}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                loggedIn={loggedIn}
              />
            } />
          <Route 
            path="/sign-up"
            element={
              <Register
                onRegister={handleRegister}
              />}
          />
          <Route 
            path="/sign-in"
            element={
              <Login
                onLogin={handleLogin}
              />}
          />
          <Route
            path="/"
            element={
              loggedIn ? <Navigate to="/" replace /> : <Navigate to="sign-in" replace />
            }
          />
        </Routes>
        {loggedIn && <Footer loggedIn={loggedIn} />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          name={'info-tool'}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          title={resultTitle}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;