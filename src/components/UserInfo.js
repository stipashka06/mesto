export default class UserInfo {
  constructor({ titleElement, subtitleElement }) {
    this._titleElement = document.querySelector(titleElement);
    this._subtitleElement = document.querySelector(subtitleElement);
  };

  getUserInfo() {
    return {
      username: this._titleElement.textContent,
      userinfo: this._subtitleElement.textContent
    };
  };

  renderLoading(data) {
    super.renderLoading(data);
  };
};