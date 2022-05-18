import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector(".form"),
};

refs.form.addEventListener("submit", onSubmit);


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay); 

  });
 
}

function onSubmit(evt) {
  evt.preventDefault();
  console.log(evt.currentTarget.elements.amount.value);
  const firstDelay = Number(evt.currentTarget.elements.delay.value);
  const stepDelay = Number(evt.currentTarget.elements.step.value);
  const amountProm = Number(evt.currentTarget.elements.amount.value);
  
  // const firstDelay = Number(refs.form.delay.value);
  // const stepDelay = Number(refs.form.step.value);
  // const amountProm = Number(refs.form.amount.value);
  let numDelay = firstDelay;

   if (numDelay <= 0) {
    return
   };
   for (let i = 0; i < amountProm; i += 1){
     let numPosition = i + 1;
     numDelay += stepDelay;
       createPromise(numPosition, numDelay)
         .then(({ position, delay }) => {
           Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
         .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
         });
         
   }

}
