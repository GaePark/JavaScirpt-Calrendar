let date = new Date();
const today = new Date();
const datesWrap = document.getElementById("dates");

const renderCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  document.getElementById("year-month").innerText = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  if (PLDay < 6) {
    for (i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);

  dates.map((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    const dateSpan = createDate(date, condition);

    if (
      today.getMonth() === viewMonth &&
      today.getFullYear() === viewYear &&
      condition === "this" &&
      date === today.getDate(0)
    ) {
      dateSpan.className = "today";
    }
  });

  console.log(today.getDate(0));
};

const createDate = (date, condition) => {
  const dateDiv = document.createElement("div");
  dateDiv.className = "date";

  const dateSpan = document.createElement("span");
  dateSpan.className = condition;
  dateSpan.textContent = date;

  dateDiv.append(dateSpan);

  datesWrap.append(dateDiv);

  return dateSpan;
};

const prevMonth = () => {
  datesWrap.innerHTML = "";
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};

const todayMonth = () => {
  datesWrap.innerHTML = "";
  date = new Date();
  renderCalendar();
};

const nextMonth = () => {
  datesWrap.innerHTML = "";
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

renderCalendar();
