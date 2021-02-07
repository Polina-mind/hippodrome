import horses from "./horses.js";

const refs = {
  message: document.querySelector(".message"),
  startButton: document.querySelector('button[data-action="start"]'),
  clearButton: document.querySelector('button[data-action="stop"]'),
  tableResult: document.querySelector(".result-table"),
};

refs.startButton.addEventListener("click", onStartClick);
refs.clearButton.addEventListener("click", onClearButton);

let isOn = false;
// if (isOn) {
//   refs.message.classList.add("isVisible");
// } else {
//   refs.message.classList.remove("isVisible");
// }

function onStartClick() {
  if (isOn) {
    refs.message.insertAdjacentHTML(
      "beforeend",
      `<p class="text">Ожидайте окончания забега ;)</p>`
    );

    return;
  }

  isOn = true;

  refs.message.insertAdjacentHTML(
    "beforeend",
    `<p class="text">Забег начался, ставки больше не принимаются!</p>`
  );

  const run = (horse) => {
    return new Promise((resolve) => {
      const time = getRandomTime(2500, 5500);

      setTimeout(() => {
        resolve({ horse, time });
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
        refs.message.insertAdjacentHTML(
          "beforeend",
          `<p class="participants"> ${idx + 1}  ${horse} - ${time} мс </br></p>`
        );
      });
    })
    .catch(console.log);

  Promise.race(promises).then(({ horse, time }) => {
    refs.message.insertAdjacentHTML(
      "beforeend",
      `<p class="text">Забег окончен</p>`
    );
    refs.message.insertAdjacentHTML(
      "beforeend",
      `<p class="text">Победила лошадка <span class = "winner">"${horse}"</span>, финишировав за <span class = "winner">${time} милисекунд</span>!!!</p>`
    );

    refs.message.insertAdjacentHTML(
      "beforeend",
      `<p class="text">Результаты всех участников:</p>`
    );

    // refs.tableResult.classList.add("isVisible");
  });
}

function onClearButton() {
  if (!isOn) {
    // refs.tableResult.classList.remove("isVisible");
    refs.message.classList.add("isVisible");
    refs.message.innerHTML = '<p class="text">Удачи в новом забеге :)</p>';

    return;
  }
}

const getRandomTime = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
