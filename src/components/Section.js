export default class Section {
  constructor(containerSelector, renderer) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  addItem(data) {
    this._container.prepend(data);
  };

  renderItems(items) {
    items.forEach((data) => {
      this._renderer(data);
    });
  };
};