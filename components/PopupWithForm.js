import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super({ popupSelector });
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitButton = this._form.querySelector('.popup__submit');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const formData = this._getInputValues();
            this._handleFormSubmit(formData);
            this.close();
            this._form.reset();
        });
    }

    _getInputValues() {
        const values = {};
        this._inputList.forEach(input => {
            values[input.name] = input.value;
        });
        return values;
    }


}
export default PopupWithForm;
