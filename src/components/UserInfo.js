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

  setUserInfo(data) {
    this._titleElement.textContent = data.username;
    this._subtitleElement.textContent = data.userinfo;
  };
};