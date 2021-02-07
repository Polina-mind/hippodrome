import horses from "./horses.js";

const refs = {
  message: document.querySelector(".message"),
  startButton: document.querySelector('button[data-action="start"]'),
  clearButton: document.querySelector('button[data-action="stop"]'),
  rates: document.querySelector(".rates"),
  // tableResult: document.querySelector(".result-table"),
};

refs.startButton.addEventListener("click", onStartClick);
refs.clearButton.addEventListener("click", onClearButton);

let isOn = false;

function onStartClick() {
  if (isOn) {
    refs.message.insertAdjacentHTML(
      "beforeend",
      `<p class="text">Ожидайте окончания забега ;)</p>`
    );
    return;
  }

  refs.message.innerHTML = "";
  refs.rates.textContent = `Забег начался, ставки больше не принимаются!`;

  isOn = true;

  const run = (horse, idx) => {
    return new Promise((resolve) => {
      const time = getRandomTime(4000, 6500);

      setTimeout(() => {
        resolve({ idx, horse, time });
        refs.message.insertAdjacentHTML(
          "beforeend",
          `<p class="participants"> №${idx + 1} "${horse}" - ${(
            time / 1000
          ).toFixed(2)} секунд </br></p>`
        );
      }, time);
    });
  };

  const promises = horses.map(run);
  //   console.log(promises);

  Promise.all(promises)
    .then((results) => {
      isOn = false;
      console.table(results);

      results.map((result, idx) => {
        const { horse, time } = result;
      });
    })
    .catch(console.log);

  Promise.race(promises).then(({ horse, time }) => {
    refs.message.insertAdjacentHTML(
      "beforeend",
      `<p class="text">Победила лошадка <span class = "winner">"${horse}"</span>, финишировав за <span class = "winner">${(
        time / 1000
      ).toFixed(2)} секунд</span>!!!</p>`
    );

    refs.message.insertAdjacentHTML(
      "beforeend",
      `<p class="text">Результаты забега остальных участников:</p>`
    );
  });
}

function onClearButton() {
  if (!isOn) {
    refs.message.innerHTML = '<p class="text">Удачи в новом забеге :)</p>';

    refs.rates.textContent = `Делайте ставки!`;
    return;
  }
}

const getRandomTime = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
