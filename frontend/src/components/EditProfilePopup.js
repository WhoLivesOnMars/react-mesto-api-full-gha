import { useEffect, useState, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('')

  useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
  }, [currentUser, isOpen]);


  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="editProfile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input 
          id="username-input"
          type="text"
          name="name"
          placeholder="Имя"
          className="popup__input edit-form__input edit-form__input_type_username"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="username-input-error popup__input-error" />
      </div>
      <div className="popup__field">
        <input 
          id="description-input"
          type="text"
          name="description"
          placeholder="О себе"
          className="popup__input edit-form__input edit-form__input_type_description"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="description-input-error popup__input-error" />
      </div>
    </PopupWithForm>
  ) 
}

export default EditProfilePopup;