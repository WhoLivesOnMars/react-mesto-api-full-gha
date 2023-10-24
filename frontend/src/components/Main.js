import { useContext } from 'react';
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
  const currentUser = useContext(CurrentUserContext);
  const cardsElements = cards.map((card) => (
    <li key={card._id}>
      <Card
        card={card}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete} 
      />
    </li>
  ))

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__edit-avatar-button" type="button" aria-label="Загрузить аватар" name="editNewAvatar" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля" />
          <div className="profile__avatar-blackout" />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile} />
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>  
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace} />
      </section>
      <section className="elements">
        <ul className="elements__cells">
          {cardsElements}
        </ul>
      </section>
    </main>
  )
}

export default Main;