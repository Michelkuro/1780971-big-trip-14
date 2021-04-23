import PointView from '../view/point';
import PointEditingFormView from '../view/form-editing-point';
import {render, RenderPosition, remove, replace} from '../utils';


export default class Point {
  constructor(pointsContainerComponent, changeData) {
    this._pointsContainerComponent = pointsContainerComponent;
    this._pointComponent = null;
    this._prevPointComponent = this._pointComponent;
    this._prevPointComponent = this._pointEditComponent;
    this._pointEditComponent = null;
    this._changeData = changeData;
    this._replaceCardToForm = this._replaceCardToForm.bind(this);
    this._replaceFormToCard = this._replaceFormToCard.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;
    this._prevPointComponent = this._pointComponent;
    this._prevPointEditComponent = this._pointEditComponent;
    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditingFormView(point);
    render(this._pointsContainerComponent, this._pointComponent, RenderPosition.BEFOREEND);
    this._pointComponent.setEditClickHandler(this._replaceCardToForm);
    this._pointEditComponent.setEditSubmitHandler(this._replaceFormToCard);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    if (this._prevPointComponent === null) {
      render(this._pointsContainerComponent, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }
    remove(this._prevPointComponent);
    remove(this._prevPointEditComponent);
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointComponent);
  }

  _replaceFormToCard() {
    replace(this._pointComponent, this._pointEditComponent);
  }
}
