import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const btnSubmit = document.querySelector('button');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

form.style.display = 'inline-grid';

//*****************==========================================================================
//*
//*  Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay)
//*  стільки разів, скільки ввели в поле amount.Під час кожного виклику передай їй
//*  номер промісу(position), що створюється, і затримку, враховуючи першу затримку(delay),
//*  введену користувачем, і крок(step).
//*
//*****************===========================================================================

btnSubmit.addEventListener('click', onSubmitBtn);

function onSubmitBtn(ev) {
  ev.preventDefault();

  if (delay.value === '' || step.value === '' || amount.value === '') {
    return Notiflix.Notify.warning('Please fill in all fields');
  } else if (+delay.value < 0 || +step.value < 0 || +amount.value <= 0) {
    return Notiflix.Notify.warning(
      `Numbers couldn't be negativ, amount field have to be more then 0`
    );
  }

  createPromise(1, delay.value)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

  let delayCount = +delay.value + +step.value;
  for (let i = 1; i < +amount.value; i += 1) {
    createPromise(i + 1, delayCount)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      );
    delayCount += +step.value;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setInterval(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}

//*==========================================================================================
//*
//*   Доповни код функції createPromise таким чином, щоб вона повертала один проміс,
//*  який виконується або відхиляється через delay часу.Значенням промісу повинен бути об'єкт,
//*  в якому будуть властивості position і delay зі значеннями однойменних параметрів.
//*  Використовуй початковий код функції для вибору того, що потрібно зробити з промісом
//*  - виконати або відхилити.
//*
//*===========================================================================================
