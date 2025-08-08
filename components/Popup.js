class Popup{

    constructor({ popupSelector}) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClick = this._handleOverlayClick.bind(this);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClick(event) {
        if (event.target === this._popupElement || event.target === this._closeButton) {
            this.close();
        }
    }

    open() {
        this._popupElement.classList.add('popup_visible');
        document.addEventListener('keydown', this._handleEscClose);
        this._popupElement.addEventListener('click', this._handleOverlayClick);
    }

    close() {
        this._popupElement.classList.remove('popup_visible');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupElement.removeEventListener('click', this._handleOverlayClick);
    }
}
export default Popup;