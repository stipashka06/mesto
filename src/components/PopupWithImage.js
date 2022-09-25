import Popup from './Popup.js';
import { imgPopupElement, titlePopupElement } from '../scripts/index.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
  };

  openImage(name, link) {
    titlePopupElement.textContent = name;
    imgPopupElement.src = link;
    imgPopupElement.alt = name;

    super.open();
  };
};