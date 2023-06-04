import { PopupWithForm } from './PopupWithForm.js';

function ConfirmDeletePopup({ card, isOpen, onClose, onSubmit, onLoading }) {
  function handleConfirmDelete(e) {
    e.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      name='popup-delete'
      title='Вы уверены?'
      text={onLoading? 'Удаляем...' : 'Удалить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleConfirmDelete}
    />
  );
}

export { ConfirmDeletePopup };
