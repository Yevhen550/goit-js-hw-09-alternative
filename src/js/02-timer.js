import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// const inputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minytesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const currentDate = Date.now();

startBtn.disabled = true;
stopBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const focusDate = new Date(selectedDates[0]);
    const timeLeft = focusDate - currentDate;
    const userDate = convertMs(timeLeft);

    if (focusDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      daysEl.textContent = userDate.days;
      hoursEl.textContent = userDate.hours;
      minytesEl.textContent = userDate.minutes;
      secondsEl.textContent = userDate.seconds;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', startInterval);
stopBtn.addEventListener('click', stopInterval);

const timerId = setInterval(timer, 1000);
console.log(timerId);

function startInterval() {
  startBtn.disabled = false;
  stopBtn.disabled = false;
  console.log('lol');
}

function timer() {
  console.log('yes');
}

function stopInterval() {
  console.log('stop interval');
  clearInterval(timerId);
  stopBtn.disabled = true;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Notiflix.Notify.failure('Please choose a date in the future');
// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');
