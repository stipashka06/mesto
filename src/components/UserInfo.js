import { titleElement, subtitleElement } from '../scripts/index.js';

export default class UserInfo {
  constructor({ titleElement, subtitleElement }) {
    this._titleElement = titleElement;
    this._subtitleElement = subtitleElement;
  };

  getUserInfo() {
    return {
      username: titleElement.textContent,
      userinfo: subtitleElement.textContent
    };
  };

  setUserInfo(evt) {
    titleElement.textContent = evt.username;
    subtitleElement.textContent = evt.userinfo;
  };
};