function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const refs = {
    btnStart: document.querySelector("[data-start]"),
    btnStop: document.querySelector("[data-stop]"),
}

let timerId = null;
refs.btnStop.disabled = true;
 
function changeColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}


refs.btnStart.addEventListener("click", () => {
    timerId = setInterval(() => changeColor(), 1000);
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
});

refs.btnStop.addEventListener("click", () => {
    clearInterval(timerId);
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
});