import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    inputEl: document.querySelector('#datetime-picker'),
    buttonEl: document.querySelector('button'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
}

const { inputEl, buttonEl, daysEl, hoursEl, minutesEl, secondsEl } = refs;

buttonEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedTimeId = selectedDates[0].getTime();
        localStorage.setItem('userTime', selectedTimeId);
        buttonEl.disabled = false;
        
        if (selectedDates[0] < options.defaultDate) {
            buttonEl.disabled = true;
            Notify.failure('Please choose a date in the future');
        }
        
        buttonEl.addEventListener('click', onStart);
    },
};

flatpickr(inputEl, options);

function onStart() {

    buttonEl.disabled = true;
    inputEl.disabled = true;

    const timerId = setInterval(() => {
        
        const currentTimeId = new Date().getTime();
        const userTimeId = localStorage.getItem('userTime');
        let differenceTime = userTimeId - currentTimeId;
        
        const { days, hours, minutes, seconds } = convertMs(differenceTime);

        daysEl.textContent = addLeadingZero(days);
        hoursEl.textContent = addLeadingZero(hours);
        minutesEl.textContent = addLeadingZero(minutes);
        secondsEl.textContent = addLeadingZero(seconds);

        if (differenceTime <= 1000) {
            clearInterval(timerId);
            Notify.success('FINISHED!');
        }
    }, 1000)
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

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
