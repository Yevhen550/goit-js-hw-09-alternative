import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const btnSubmit = document.querySelector('button');
const delayInput = document.querySelector('[name="delay"]');
const stepDelayInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');

//*****************==========================================================================
//*
//*  Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay)
//*  стільки разів, скільки ввели в поле amount.Під час кожного виклику передай їй
//*  номер промісу(position), що створюється, і затримку, враховуючи першу затримку(delay),
//*  введену користувачем, і крок(step).
//*
//*****************===========================================================================

form.addEventListener('submit', createPromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setInterval(() => {
      if (shouldResolve) {
        resolve('✅ Fulfilled');
      } else {
        reject('❌ Rejected');
      }
    }, delay);
  });
}

createPromise(2, 1500)
  .then(res => console.log(res))
  .catch(rej => console.log(rej));

// console.log('%c color:red', 'color:red; font-size:30px;');

//*==========================================================================================
//*
//*   Доповни код функції createPromise таким чином, щоб вона повертала один проміс,
//*  який виконується або відхиляється через delay часу.Значенням промісу повинен бути об'єкт,
//*  в якому будуть властивості position і delay зі значеннями однойменних параметрів.
//*  Використовуй початковий код функції для вибору того, що потрібно зробити з промісом
//*  - виконати або відхилити.
//*
//*===========================================================================================
// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.info('Cogito ergo sum');
