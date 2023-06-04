import correct from '../images/correct.svg';
import error from '../images/error.svg';

function InfoTooltip({ isOpen, isConfirmStatus, onClose }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button 
          className='popup__close' 
          type='button' 
          onClick={onClose} 
          aria-label='Кнопка закрытия'
        />
        <img
          className='popup__reg-pic'
          src={isConfirmStatus ? correct : error}
          alt={
            isConfirmStatus
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте еще раз'
          }
        />

        <h3 className='popup__reg-title'>
          {isConfirmStatus
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте еще ращ'}
        </h3>
      </div>
    </div>
  );
}

export { InfoTooltip };
