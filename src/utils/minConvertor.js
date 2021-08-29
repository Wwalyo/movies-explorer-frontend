export function minConvertor(duration) {
  const hour = Math.floor(duration/60);
  const min = Math.floor(duration-hour*60);
  if (min > 0) { 
    return hour + 'ч ' + min + 'мин';
  } else {
    return hour + 'ч';
  }
};

