import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onButtonClick);

function onButtonClick(evt) {
  evt.preventDefault();

  const userDelay = Number(evt.currentTarget.delay.value);
  const userStep = Number(evt.currentTarget.step.value);
  const userAmount = Number(evt.currentTarget.amount.value);

  
  for (let i = 1; i <= userAmount; i += 1) {
    
    let position = i;
    let delay = userDelay + userStep * (position - 1);
    
    createPromise(position, delay)
      .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }).catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
    } 
  }

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({position: position, delay: delay});
  } else {
      reject({position: position, delay: delay});
  }
    }, delay)
  })
}


