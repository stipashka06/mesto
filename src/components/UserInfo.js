export default class UserInfo {
  constructor({ titleElement, subtitleElement }, selectors) {
    this._titleElement = document.querySelector(titleElement);
    this._subtitleElement = document.querySelector(subtitleElement);
    this._selectors = selectors;
    this._popupElementEdit = document.querySelector(this._selectors.popupElement);
    this._formEdit = this._popupElementEdit.querySelector(this._selectors.form);
    this._inputNameEdit = this._formEdit.querySelector(this._selectors.inputNamePopup);
    this._inputDescriptionEdit = this._formEdit.querySelector(this._selectors.inputDescriptionPopup);
  };

  getUserInfo() {
    return {
      username: this._titleElement.textContent,
      userinfo: this._subtitleElement.textContent
    };
  };

  setUserInfo = (data) => {
    this._inputNameEdit.value = data.username;
    this._inputDescriptionEdit.value = data.userinfo;
  };

  renderLoading(data) {
    super.renderLoading(data);
  };
};