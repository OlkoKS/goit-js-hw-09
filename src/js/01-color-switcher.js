const refs = {
    startBtnEl: document.querySelector('[data-start]'),
    stopBtnEl: document.querySelector('[data-stop]'),
}

refs.stopBtnEl.setAttribute('disabled', true);
refs.startBtnEl.addEventListener('click', onStart);

function onStart() {
    document.body.style.backgroundColor = getRandomHexColor();
    refs.startBtnEl.setAttribute('disabled', true);
    refs.stopBtnEl.removeAttribute('disabled');
    refs.stopBtnEl.addEventListener('click', onStop);

    const colorSwitcher = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)

    function onStop() {
        clearInterval(colorSwitcher);
        refs.stopBtnEl.setAttribute('disabled', true);
        refs.startBtnEl.removeAttribute('disabled');
}
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
