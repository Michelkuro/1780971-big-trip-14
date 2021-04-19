import SiteMenuView from './view/menu';
import InformationAboutTripView from './view/information-about-trip';
import FiltersView from './view/filters';
import SortView from './view/sort';
import {createPointsContainerTemplate} from './view/points-container';
import PointView from './view/point';
import PointsCreationFormView from './view/form-creation-point';
import {generatePoint} from './mock/point';
import {renderTemplate, renderElement, RenderPosition} from './utils.js';

const POINT_COUNT = 3;

const points = new Array(POINT_COUNT + 1).fill().map(generatePoint);

const MainElement = document.querySelector('.trip-main'),
  MainContentContainer = document.querySelector('.page-main'),
  NavigationContainer = MainElement.querySelector('.trip-controls__navigation'),
  FiltersContainer = MainElement.querySelector('.trip-controls__filters'),
  ContentContainer = MainContentContainer.querySelector('.trip-events');

renderElement(NavigationContainer, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(MainElement, new InformationAboutTripView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(FiltersContainer, new FiltersView().getElement(), RenderPosition.BEFOREEND);
renderElement(ContentContainer, new SortView().getElement(), RenderPosition.BEFOREEND);
renderTemplate(ContentContainer, createPointsContainerTemplate(), 'beforeend');

const PointsContainer = MainContentContainer.querySelector('.trip-events__list');

for (let i = 0; i < POINT_COUNT; i++) {
  renderElement(PointsContainer, new PointView(points[i]).getElement(), RenderPosition.BEFOREEND);
}
renderElement(PointsContainer, new PointsCreationFormView(points[points.length - 1]).getElement(), RenderPosition.AFTERBEGIN);
