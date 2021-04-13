import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRandomDate = () => {
  const maxDaysGap = 31;
  const daysGap = getRandomInteger(1, maxDaysGap);
  return dayjs().add(daysGap, 'day').format('MMM D');
};

const generateRandomEvent = () => {
  const iconEvent = ['/img/icons/taxi.png', '/img/icons/bus.png', '/img/icons/train.png', '/img/icons/ship.png', '/img/icons/transport.png', '/img/icons/drive.png', '/img/icons/flight.png', '/img/icons/check-in.png', '/img/icons/sightseeing.png', '/img/icons/restaurant.png'];
  const typeEvent = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
  const randomEvent = getRandomInteger(0, typeEvent.length - 1);
  return {
    typeEvent: typeEvent[randomEvent],
    iconEvent: iconEvent[randomEvent],
  };
};

const generateRandomCityName = () => {
  const cityNames = ['Barcelona', 'Madrid', 'Valencia', 'Sevilla', 'Toledo'];
  return cityNames[getRandomInteger(0, cityNames.length - 1)];
};

const generateRandomOffer = () => {
  const offers = ['Switch to comfort', 'Add luggage', 'Add meal', 'Choose seats', 'Travel by train', 'Add breakfast', 'Book tickets', 'Lunch in city', 'Rent a car'];
  const offer = {};
  for (let i = 0; i < getRandomInteger(0, offers.length - 1); i++) {
    offer[i] = {
      title: offers[getRandomInteger(0, offers.length - 1)],
      price: getRandomInteger(20, 200),
    };
  }
  return offer;
};

const getRandomDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  ];
  const description = [];
  for (let i = 0; i < getRandomInteger(1, descriptions.length - 1); i++) {
    description.push(descriptions[getRandomInteger(0, descriptions.length - 1)]);
  }
  return description.join();
};

const generateRandomTime = () => {
  const timeFrom = new Date;
  timeFrom.setHours(getRandomInteger(0, 23));
  timeFrom.setMinutes(getRandomInteger(0, 59));
  const timeTo = new Date;
  timeTo.setHours(getRandomInteger(0, 23));
  timeTo.setMinutes(getRandomInteger(0, 59));
  if (timeFrom > timeTo) {
    timeTo.setDate(timeFrom.getDate() + getRandomInteger(1, 2));
  }
  const timeDiff = timeTo - timeFrom;
  const timeConversion = (t) => {

    const minutes = (t / (1000 * 60)).toFixed(1);

    const hours = (t / (1000 * 60 * 60)).toFixed(1);

    const days = (t / (1000 * 60 * 60 * 24)).toFixed(1);

    if (minutes < 60) {
      return minutes + ' M';
    } else if (hours < 24) {
      return hours + ' H';
    } else {
      return days + ' D';
    }
  };

  return [`${timeFrom.getHours()}:${timeFrom.getMinutes()}`, `${timeTo.getHours()}:${timeTo.getMinutes()}`, timeConversion(timeDiff)];
};

export const generatePoint = () => {
  const getEvent = generateRandomEvent();
  return {
    date: generateRandomDate(),
    timeStart: generateRandomTime()[0],
    timeFinish: generateRandomTime()[1],
    timeDifference: generateRandomTime()[2],
    eventType: getEvent.typeEvent,
    eventIcon: getEvent.iconEvent,
    cityName: generateRandomCityName(),
    price: `€ ${getRandomInteger(20, 200)}`,
    additionalOptions: generateRandomOffer(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    description: getRandomDescription(),
  };
};
