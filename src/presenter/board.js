import SortView from '../view/sort';
import PointsContainerView from '../view/points-container';
import BoardView from '../view/board';
import {render, RenderPosition} from '../utils.js';
import NoPointsView from '../view/no-points';
import PointPresenter from './point';
import {updateItem} from '../utils';

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._pointsContainerComponent = new PointsContainerView();
    this._noPoints = new NoPointsView();
    this._pointPresenter = {};

    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init(boardPoints) {
    if (boardPoints) {
      this._boardPoints = boardPoints.slice();
    }
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._pointsContainerComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsContainerComponent, this._handlePointChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(from, to) {
    this._boardPoints.slice(from, to).forEach((point) => {
      this._renderPoint(point);
    });
  }

  _renderNoPoints() {
    render(this._boardComponent, this._noPoints, RenderPosition.AFTERBEGIN);
  }

  _handlePointChange(updatedTask) {
    this._boardPoints = updateItem(this._boardPoints, updatedTask);
    this._pointPresenter[updatedTask.id].init(updatedTask);
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
