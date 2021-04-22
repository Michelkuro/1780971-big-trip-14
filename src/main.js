import SiteMenuView from './view/menu';
import InformationAboutTripView from './view/information-about-trip';
import FiltersView from './view/filters';
import {RenderPosition, points, render} from './utils.js';
import BoardPresenter from './presenter/board';


const MainElement = document.querySelector('.trip-main'), // header
  MainContentContainer = document.querySelectorAll('.page-body__container')[1], // главная обертка доски
  NavigationContainer = MainElement.querySelector('.trip-controls__navigation'), // навигация table stats
  FiltersContainer = MainElement.querySelector('.trip-controls__filters'); //фильтры

render(NavigationContainer, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(MainElement, new InformationAboutTripView().getElement(), RenderPosition.AFTERBEGIN);
render(FiltersContainer, new FiltersView().getElement(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(MainContentContainer);
boardPresenter.init(points);

// render(PointsContainer.getElement(), new PointsCreationFormView(points[points.length - 1]).getElement(), RenderPosition.AFTERBEGIN); //рендер формы добавления нового point
