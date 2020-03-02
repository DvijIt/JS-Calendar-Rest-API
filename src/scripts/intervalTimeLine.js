console.log(count);
const getToday = () => {
  const arrDays = [...document.querySelectorAll(".week-day")];
  arrDays.forEach(el => {
    if (
      el.getAttribute("data-week-day") == new Date().getDate() &&
      el.getAttribute("data-week-month") == new Date().getMonth() &&
      el.getAttribute("data-week-year") == new Date().getFullYear()
    ) {
      console.dir(el);
      el.classList.add("get-today");

      el.innerHTML = `<span class="day-today">${new Date().getDate()}</span><div class="line-today"></div>`;
    }
  });
};
getToday();
const todayDayEl = document.querySelector(".line-today");
const showCurrentTime = () => {
  todayDayEl.style.top = `${count}px`;
  const countMinutesOfDay = () => {
    setInterval(() => {
      count += 1;
      todayDayEl.style.top = `${count}px`;
    }, 60000);
  };
  countMinutesOfDay();
};
showCurrentTime();
