import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise
    .then((delay) => {
      iziToast.success({
        title: '✅ Fulfilled',
        message: `Promise fulfilled in ${delay}ms`,
        position: 'topRight',
        transitionIn: 'fadeInRight',
        timeout: 5000,
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Promise rejected in ${delay}ms`,
        position: 'topRight',
        transitionIn: 'fadeInRight',
        timeout: 5000,
      });
    });
};

