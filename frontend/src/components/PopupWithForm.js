import { useEffect } from 'react';

function PopupWithForm({ isOpen, onClose, name, title, buttonText, children, userForm, onSubmit }) {
    
  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      onClose();
    }
  };

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        onClose();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return(
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClose}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose} />
        <form className="popup__content" method="post" name={userForm} onSubmit={onSubmit}>
          <h3 className="popup__title">{`${title}`}</h3>
          <fieldset className="popup__fieldset">
            {children}
            <button className="popup__save-button" type="submit" name="saveButton">{`${buttonText}`}</button>
          </fieldset>
        </form>
      </div>
    </div>
  )  
}

export default PopupWithForm;