import Abstract from './abstract';

const createPointsContainerTemplate = () => {
  return `<ul class='trip-events__list'>
          </ul>`;
};

export default class PointsContainer extends Abstract{
  getTemplate(){
    return createPointsContainerTemplate();
  }
}
