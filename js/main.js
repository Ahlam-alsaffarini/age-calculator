setTimeout(() => {
  document.querySelector("body").style.opacity = "1";
}, 500);

// valid age input
// select input day
let birthDay = document.querySelector("input#Day");
let birthMonth = document.querySelector("input#Month");
let birthYear = document.querySelector("input#Year");
// select label for each input
let dayLabel = document.querySelector("label[for=Day]");
let monthLabel = document.querySelector("label[for=Month]");
let yearLabel = document.querySelector("label[for=Year]");
// the invalid status
let invalidDay = document.querySelector("span#invalid-day");
let invalidMonth = document.querySelector("span#invalid-month");
let invalidYear = document.querySelector("span#invalid-year");
// reg
var validDayRegex = /\b([1-9]|[12][0-9]|3[01])\b/g;
var validMonthRegex = /\b([1-9]|[1][0-2])\b/g;
var validYearRegex = /^(19[0-9]\d|20[0-4]\d|2023)$/g;
// for day
function validDay() {
  if (!birthDay.value.match(validDayRegex) || parseInt(birthDay.value) < 0) {
    invalidStyle(invalidDay, birthDay, dayLabel);
    return false;
  }
  //valid days in each month
  let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let daysOfMonth = months[birthMonth.value - 1];
  if (daysOfMonth < birthDay.value) {
    invalidStyle(invalidDay, birthDay, dayLabel);
    return false;
  }
  //true
  validStyle(invalidDay, birthDay, dayLabel);
  return true;
}
// for month
function validMonth() {
  if (
    !birthMonth.value.match(validMonthRegex) ||
    parseInt(birthMonth.value) < 0
  ) {
    invalidStyle(invalidMonth, birthMonth, monthLabel);
    return false;
  }
  validStyle(invalidMonth, birthMonth, monthLabel);
  return true;
}
// for year
function validYear() {
  if (!birthYear.value.match(validYearRegex) || parseInt(birthYear.value) < 0) {
    invalidStyle(invalidYear, birthYear, yearLabel);
    return false;
  }
  validStyle(invalidYear, birthYear, yearLabel);
  return true;
}
// style invalid
function invalidStyle(invalid, date, label) {
  invalid.innerHTML = `must be a valid ${label.innerHTML}`;
  invalid.style.opacity = "1";
  invalid.style.bottom = "-32px";
  invalid.style.trnasition = "0.5s";
  date.style.borderColor = "var(--Light-red)";
  label.style.color = "var(--Light-red)";
}
// return everything as it was
function validStyle(invalid, date, label) {
  invalid.innerHTML = " ";
  invalid.style.bottom = "0";
  invalid.style.opacity = "0";
  date.style.borderColor = "var(--Purple)";
  label.style.color = "inherit";
}
//aniamtion
const Spinning = [
  { transform: "rotate(0) " },
  { transform: "rotate(360deg) " },
];

const Timing = {
  duration: 500,
  iterations: 1,
};

// calc the age
document.querySelector(".middle .submit").addEventListener("click", (ele) => {
  if (validDay() && validMonth() && validYear()) {
    ele.srcElement.animate(Spinning, Timing);
    setTimeout(function () {
      // select the date of now
      let now = new Date();
      let currentDay = now.getDate();
      let currentMonth = now.getMonth() + 1;
      let currentYear = now.getFullYear();
      // years
      let yearAge = currentYear - birthYear.value;
      // months
      if (currentMonth >= birthMonth.value) {
        // months when current month is greater
        var monthAge = currentMonth - birthMonth.value;
      } else {
        yearAge--;
        var monthAge = 12 + currentMonth - birthMonth.value;
      }
      // days
      if (currentDay >= birthDay.value)
        // days when the current date is greater
        var dateAge = currentDay - birthDay.value;
      else {
        monthAge--;
        var dateAge = 31 + currentDay - birthDay.value;
      }

      document.querySelector(".day-result h1 span").innerHTML = `${dateAge}`;
      document.querySelector(".month-result h1 span").innerHTML = `${monthAge}`;
      document.querySelector(".year-result h1 span").innerHTML = `${yearAge}`;
    }, 500);
  } else {
    ele.preventDefault();
  }
});
