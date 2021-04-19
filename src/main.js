import SiteMenuView from './view/menu';
import InformationAboutTripView from './view/information-about-trip';
import FiltersView from './view/filters';
import SortView from './view/sort';
import PointsContainerView from './view/points-container';
import PointView from './view/point';
import PointsCreationFormView from './view/form-creation-point';
import PointEditingFormView from './view/form-editing-point';
import {generatePoint} from './mock/point';
import {render, RenderPosition} from './utils.js';

const POINT_COUNT = 3;

const points = new Array(POINT_COUNT + 1).fill().map(generatePoint);

const MainElement = document.querySelector('.trip-main'),
  MainContentContainer = document.querySelector('.page-main'),
  NavigationContainer = MainElement.querySelector('.trip-controls__navigation'),
  FiltersContainer = MainElement.querySelector('.trip-controls__filters'),
  ContentContainer = MainContentContainer.querySelector('.trip-events'),
  PointsContainer = new PointsContainerView();

const renderPoint = (container, point, position) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditingFormView(point);
  const replaceCardToForm = () => {
    container.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };
  const replaceFormToCard = () => {
    container.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };
  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', ()=>{
    replaceCardToForm();
  });
  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt)=>{
    evt.preventDefault();
    replaceFormToCard();
  });
  render(container, pointComponent.getElement(), position);
};

render(NavigationContainer, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(MainElement, new InformationAboutTripView().getElement(), RenderPosition.AFTERBEGIN);
render(FiltersContainer, new FiltersView().getElement(), RenderPosition.BEFOREEND);
render(ContentContainer, new SortView().getElement(), RenderPosition.BEFOREEND);
render(ContentContainer, PointsContainer.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < POINT_COUNT; i++) {
  renderPoint(PointsContainer.getElement(), points[i], RenderPosition.BEFOREEND);
}

render(PointsContainer.getElement(), new PointsCreationFormView(points[points.length - 1]).getElement(), RenderPosition.AFTERBEGIN);
