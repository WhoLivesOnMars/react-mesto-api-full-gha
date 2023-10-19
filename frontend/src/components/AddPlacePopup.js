import { useEffect, useState } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [ name, setName ] = useState('');
  const [ link, setLink ] = useState('');
  
  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);


  function handlePlaceNameChange(e) {
    setName(e.target.value);
  }

  function handlePlaceLinkChange(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
  
    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      name="addPlace"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleAddPlaceSubmit}
    >
      <div className="popup__field">
        <input  
          id="title-input"
          type="text"
          name="name"
          placeholder="Название"
          className="popup__input item-form__input item-form__input_type_title"
          required
          minLength="2"
          maxLength="30" 
          value={name}
          onChange={handlePlaceNameChange}
        />
        <span className="title-input-error popup__input-error" />
      </div>
      <div className="popup__field">
        <input  
          id="link-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__input item-form__input item-form__input_type_link"
          required 
          value={link}
          onChange={handlePlaceLinkChange}
        />
        <span className="link-input-error popup__input-error" />
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;