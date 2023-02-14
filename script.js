const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev");
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dataInput = document.querySelector(".date-input");
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
const months = [ "January","February","March","April","May","June","July","August", "September","October","November","December",
];

function initCalendar() {
  const firstday = new Date(year, month, 1);
  const lastday = new Date(year, month + 1, 0);
  const preLastday = new Date(year, month, 0);
  const prevDays = preLastday.getDate();
  const lastDate = lastday.getDate();
  const day = firstday.getDay();
  const nextDays = 7 - lastday.getDay() - 1;
  date.innerHTML = months[month] + " " + year;
  let days = "";
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    daysContainer.innerHTML = days;
  }
  for (let i = 1; i <= lastDate; i++) {
    if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
      days += `<div class="day today">${i}</div>`;
    } 
    else {
      days += `<div class="day">${i}</div>`;
    }
  }
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
}

initCalendar();
function preMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", preMonth);
next.addEventListener("click", nextMonth);
todayBtn.addEventListener("click", () => {
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dataInput.addEventListener("input", (e) => {
  dataInput.value = dataInput.value.replace(/[^0-9/]/g, "");
  if (dataInput.value.length === 2) {
    dataInput.value += "/";
  }
  if (dataInput.value.length > 7) {
    dataInput.value = dataInput.value.slice(0, 7);
  }
  if (e.inputType === "deletedContentbackward") {
    if (dataInput.value.length === 3) {
      dataInput.value = dataInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  const dateArr = dataInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}
