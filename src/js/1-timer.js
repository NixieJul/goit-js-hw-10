'use strict'

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (selectedDate <= new Date) {
          startBtn.disabled = true;
          iziToast.error({
            message: 'Please choose a date in the future',
            position: 'center'
          });
      }
      else {
          userSelectedDate = selectedDate;
          startBtn.disabled = false;
      }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', handleStart);

function handleStart(event) {
    event.preventDefault;
    startBtn.disabled = true;
    input.disabled = true;
    
    const intervalID = setInterval(() => {
        const dateNow = Date.now();
        const difference = userSelectedDate - dateNow;

        if (difference <= 0) {
            clearInterval(intervalID);
            startBtn.disabled = false;
            input.disabled = false;

            days.innerHTML = '00';
            hours.innerHTML = '00';
            minutes.innerHTML = '00';
            seconds.innerHTML = '00';

            return;
        }
        const timeLeft = convertMs(difference);

        const day = pad(timeLeft.days);
        const hour = pad(timeLeft.hours);
        const minute = pad(timeLeft.minutes);
        const second = pad(timeLeft.seconds);

        days.innerHTML = day;
        hours.innerHTML = hour;
        minutes.innerHTML = minute;
        seconds.innerHTML = second;
    }, 1000);
}



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function pad(value) {
  return String(value).padStart(2, '0');
}