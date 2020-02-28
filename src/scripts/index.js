import {
  renderCalendalBlock
} from "./renderBloks.js";
import {
  eventsMonth
} from './renderDays.js'
document.addEventListener("DOMContentLoaded", function() {
  const timezone = document.querySelector(".timeline__timezone");
  const month = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ];

  timezone.textContent = new Date()
    .toString()
    .split(" ")[5]
    .slice(0, 6);

  const dateMonth = document.querySelector(".date__month");

  dateMonth.textContent = month[new Date().getMonth()];
  renderCalendalBlock()
  eventsMonth()

});
