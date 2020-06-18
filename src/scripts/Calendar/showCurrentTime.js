function createLineElem() {
  const divLine = document.createElement('div');
  divLine.classList.add('line-today');
  return divLine;
}

export default function () {
  const currentColumnDay = document.querySelector(`[data-set-year="${new Date().getFullYear()}"][data-set-month="${new Date().getMonth()}"][data-set-day="${new Date().getDate()}"]`);

  if (currentColumnDay !== null) {
    const lineTimeElem = createLineElem();
    currentColumnDay.appendChild(lineTimeElem);
    const todayDayElem = document.querySelector('.line-today');
    let count = new Date().getHours() * 60 + new Date().getMinutes();
    todayDayElem.style.top = `${count}px`;
    const intervalCounter = setInterval(() => {
      todayDayElem.style.top = `${count}px`;
      count += 1;
    }, 5000);
  } else {
    clearInterval(intervalCounter);
  }
}
