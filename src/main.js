import {createSiteMenuTemplate} from './view/menu';
import {createInformationAboutTripTemplate} from './view/information-about-trip';
import {createFiltersTemplate} from './view/filters';
import {createSortTemplate} from './view/sort';
import {createPointsContainerTemplate} from './view/points-container';
import {createPointTemplate} from './view/point';
import {createPointsCreationFormTemplate} from './view/form-creation-point';
import './mock/point.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const MainElement = document.querySelector('.trip-main'),
  MainContentContainer = document.querySelector('.page-main'),
  NavigationContainer = MainElement.querySelector('.trip-controls__navigation'),
  FiltersContainer = MainElement.querySelector('.trip-controls__filters'),
  ContentContainer = MainContentContainer.querySelector('.trip-events');

render(NavigationContainer, createSiteMenuTemplate(), 'beforeend');
render(MainElement, createInformationAboutTripTemplate(), 'afterbegin');
render(FiltersContainer, createFiltersTemplate(), 'beforeend');
render(ContentContainer, createSortTemplate(), 'beforeend');
render(ContentContainer, createPointsContainerTemplate(), 'beforeend');

const PointsContainer = MainContentContainer.querySelector('.trip-events__list');

for (let i = 0; i < 3; i++) {
  render(PointsContainer, createPointTemplate(), 'beforeend');
}
render(PointsContainer, createPointsCreationFormTemplate(), 'afterbegin');
