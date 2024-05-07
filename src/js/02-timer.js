import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minytesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timerId = null;

startBtn.disabled = true;
stopBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', startInterval);
    }
  },
};

const flatObj = flatpickr('#datetime-picker', options);

stopBtn.addEventListener('click', stopInterval);

function startInterval() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  timerId = setInterval(timer, 1000);
}

function timer() {
  const selectDate = flatObj.selectedDates[0];
  const timeLeft = selectDate.getTime() - Date.now();
  const userDate = convertMs(timeLeft);

  daysEl.textContent = userDate.days;
  hoursEl.textContent = userDate.hours;
  minytesEl.textContent = userDate.minutes;
  secondsEl.textContent = userDate.seconds;
}

function stopInterval() {
  clearInterval(timerId);

  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
