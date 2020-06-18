import { generateNumberRange } from '../storage';

const dayFullTime = document.querySelector('.time-of-day');
const timezone = document.querySelector('.calendar__timezone');

export default () => {
  timezone.textContent = new Date()
    .toString()
    .split(' ')[5]
    .slice(0, 6);
  const hourTimeOfDay = generateNumberRange(0, 23)
    .map(el => {
      if (el < 10) el = `0${el}`;
      return `
          <li class="hour-of-time" data-sector-time="${el}" data-time="${el}:00">${el}:00</li>
        `;
    })
    .join('');

  dayFullTime.innerHTML = hourTimeOfDay;
};
