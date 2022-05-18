import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  btnStart: document.querySelector("[data-start]"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

refs.btnStart.disabled = true;
let isActiv = false;
let selectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
  
    if (selectedDates[0] < options.defaultDate) {
    Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      refs.btnStart.disabled = false;
      selectedDate = selectedDates[0] - options.defaultDate;

    }
 
  },

};

function onStart() {
    
  if (isActiv) {
    return
  };
  isActiv = true;
  
  setInterval(() => {
    if (selectedDate <= 0) {
      refs.days.textContent = "00";
      refs.hours.textContent = "00";
      refs.minutes.textContent = "00";
      refs.seconds.textContent = "00";
      return
    };
    console.log(selectedDate)
      refs.btnStart.disabled = true;
      const deltaTime = selectedDate -=1000;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;

      },1000);
}
  
  
refs.btnStart.addEventListener("click", onStart);


flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2,"0")
};




// const timer = {
//   start() {
//    const startTime = Date.now();
//     setInterval(() => {
//       const curretTime = Date.now();
//       const deltaTime = curretTime - startTime;
//       const {days, hours, minutes, seconds} = convertMs(deltaTime);
//       console.log(`${days}:${hours}:${minutes}:${seconds}`);
//       refs.minutes.textContent = minutes;
//       refs.seconds.textContent = seconds;
//       },1000);
//   }
    
// };
// refs.btnStart.addEventListener("click", timer.start);

