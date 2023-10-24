import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `elements__like-button ${isLiked && 'elements__like-button_active'}` 
  );;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="elements__cell">
      <img className="elements__item" src={card.link} alt={`Фото ${card.name}`} onClick={handleClick} />
      {isOwn && <button className="elements__delete-button" type="button" name="deleteButton" aria-label="Удалить карточку" onClick={handleDeleteClick} />}
      <div className="elements__description">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-container">
          <button className={cardLikeButtonClassName} type="button" name="reactionButton" aria-label="Поставить лайк" onClick={handleLikeClick} />
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;