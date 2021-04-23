import SortView from '../view/sort';
import PointsContainerView from '../view/points-container';
import PointView from '../view/point';
import PointEditingFormView from '../view/form-editing-point';
import BoardView from '../view/board';
import {render, RenderPosition} from '../utils.js';
import NoPointsView from '../view/no-points';

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._pointsContainerComponent = new PointsContainerView();
    this._noPoints = new NoPointsView();
  }

  init(boardPoints) {
    if (boardPoints) {
      this._boardPoints = boardPoints.slice();
    }
    render(this._boardContainer, this._boardComponent.getElement(), RenderPosition.BEFOREEND);
    render(this._boardComponent.getElement(), this._pointsContainerComponent.getElement(), RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardComponent.getElement(), this._sortComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointComponent = new PointView(point);
    const pointEditComponent = new PointEditingFormView();

    const replaceCardToForm = () => {
      this._pointsContainerComponent.getElement().replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
    };
    const replaceFormToCard = () => {
      this._pointsContainerComponent.getElement().replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
    };
    pointComponent.setEditClickHandler(replaceCardToForm);
    pointEditComponent.setEditSubmitHandler(replaceFormToCard);
    render(this._pointsContainerComponent.getElement(), pointComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderPoints(from, to) {
    this._boardPoints.slice(from, to).forEach((point) => {
      this._renderPoint(point);
    });
  }

  _renderNoPoints(){
    render(this._boardComponent.getElement(), this._noPoints.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderBoard() {
    if (this._boardPoints.length === 0) {
      this._renderNoPoints();
      return;
    }
    this._renderSort();
    this._renderPoints();
  }
}
