import { month } from '../storage.js';

const dateMonth = document.querySelector('.date__month');

export const renderCurrentMonth = () => {
  const arrDays = [...document.querySelectorAll('.week-day')];
  const arrMonth = [];

  arrDays.forEach(el => {
    arrMonth.push({
      month: el.dataset.weekMonth,
      year: el.dataset.weekYear,
    });
  });
  const newArr = [{
    month: arrMonth[0].month,
    year: arrMonth[0].year,
  },
  {
    month: arrMonth[arrMonth.length - 1].month,
    year: arrMonth[arrMonth.length - 1].year,
  },
  ];
  const starMonth = newArr[0].month;
  const startYear = newArr[0].year;
  const endMonth = newArr[1].month;
  const endYear = newArr[1].year;

  let correctDate = `${month[starMonth]} ${startYear} - ${month[endMonth]} ${endYear}`;

  if (starMonth === endMonth && startYear === endYear) {
    correctDate = `${month[starMonth]} ${startYear}`;
  } else if (startYear === endYear) {
    correctDate = `${month[starMonth]} - ${month[endMonth]} ${startYear}`;
  }

  dateMonth.textContent = correctDate;
};
