import { useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen])

  return (
    <PopupWithForm
      name="editAvatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      userForm="avatarForm"
      onSubmit={handleSubmit}
    >  
      <div className="popup__field">
        <input 
          id="avatar-input"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_input_link"
          required
          ref={avatarRef}
        />
        <span className="avatar-input-error popup__input-error" />
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;