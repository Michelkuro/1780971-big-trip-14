import {createElement} from '../utils';

const createPointsContainerTemplate = () => {
  return `<ul class='trip-events__list'>
          </ul>`;
};

export default class PointsContainer {
  constructor(){
    this._element = null;
  }
  getTemplate(){
    return createPointsContainerTemplate();
  }
  getElement(){
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement(){
    this._element = null;
  }
}
