import {createSiteMenuTemplate} from './view/menu';
import {createInformationAboutTripTemplate} from './view/information-about-trip';
import {createFiltersTemplate} from './view/filters';
import {createSortTemplate} from './view/sort';
import {createPointsContainerTemplate} from './view/points-container';
import {createPointTemplate} from './view/point';
import {createPointsCreationFormTemplate} from './view/form-creation-point';
import {generatePoint} from './mock/point';
import {renderTemplate} from './utils.js';

const POINT_COUNT = 3;

const points = new Array(POINT_COUNT + 1).fill().map(generatePoint);

const MainElement = document.querySelector('.trip-main'),
  MainContentContainer = document.querySelector('.page-main'),
  NavigationContainer = MainElement.querySelector('.trip-controls__navigation'),
  FiltersContainer = MainElement.querySelector('.trip-controls__filters'),
  ContentContainer = MainContentContainer.querySelector('.trip-events');

renderTemplate(NavigationContainer, createSiteMenuTemplate(), 'beforeend');
renderTemplate(MainElement, createInformationAboutTripTemplate(), 'afterbegin');
renderTemplate(FiltersContainer, createFiltersTemplate(), 'beforeend');
renderTemplate(ContentContainer, createSortTemplate(), 'beforeend');
renderTemplate(ContentContainer, createPointsContainerTemplate(), 'beforeend');

const PointsContainer = MainContentContainer.querySelector('.trip-events__list');

for (let i = 0; i < POINT_COUNT; i++) {
  renderTemplate(PointsContainer, createPointTemplate(points[i]), 'beforeend');
}
renderTemplate(PointsContainer, createPointsCreationFormTemplate(points[points.length - 1]), 'afterbegin');
