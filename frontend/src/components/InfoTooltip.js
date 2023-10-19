import success from '../images/success.svg';
import error from '../images/error.svg';
import { useEffect } from 'react';

function InfoTooltip({ isOpen, onClose, isSuccess, name, title }) {
  const image = isSuccess ? success : error;

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
  }, [isOpen]);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleOverlayClose}>
      <div className="popup__container popup__container_type_result">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose} />
        <img className="popup__result-ind" src={image} alt="Отображение результата регистрации" />
        <h3 className="popup__title popup__title_result">{title}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;