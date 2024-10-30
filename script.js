const clickerEl = document.querySelector(".playarea__clicker");
const counterEl = document.querySelector(".counter__current");
const powerupsEl = document.querySelector(".powerups");

let counter = 9000;
// let counter = +localStorage.getItem("score");
counterEl.innerHTML = counter;

let clickValue = 1;
// превратите clickValue в функцию, которая будет на каждый клик
// пересчитывать значение стоимости клика из powerups
// найдите где встречается clickValue и добавьте к функции вызов

const powerups = [
  {
    title: "Powerup 1",
    price: function () {
      return calcPrice.call(this);
    },
    initialPrice: 100,
    amount: 0,
    profit: 0,
    value: 1,
    coef: 1.1,
    onclick: true,
  },
  {
    title: "Powerup 2",
    price: function () {
      return calcPrice.call(this);
    },
    initialPrice: 200,
    amount: 0,
    profit: 0,
    value: 2,
    coef: 1.2,
  },
  {
    title: "Powerup 3",
    price: function () {
      return calcPrice.call(this);
    },
    initialPrice: 300,
    amount: 0,
    profit: 0,
    value: 3,
    coef: 1.4,
  },
  {
    title: "Powerup 4",
    price: function () {
      return calcPrice.call(this);
    },
    initialPrice: 400,
    amount: 0,
    profit: 0,
    value: 4,
    coef: 1.5,
    onclick: true,
  },
  {
    title: "Powerup 5",
    price: function () {
      return calcPrice.call(this);
    },
    initialPrice: 500,
    amount: 0,
    profit: 0,
    value: 5,
    coef: 1.6,
  },
  {
    title: "Powerup 6",
    price: function () {
      return calcPrice.call(this);
    },
    initialPrice: 600,
    amount: 0,
    profit: 0,
    value: 6,
    coef: 1.7,
  },
];

function calcPrice() {
  if (this.amount <= 0) {
    return this.initialPrice;
  } else if (this.amount >= 1) {
    return Math.round(
      this.initialPrice + (this.initialPrice / this.coef) * this.amount
    );
  }
}

clickerEl.addEventListener("click", () => {
  counter += clickValue;
  counterEl.innerHTML = counter;
});

setInterval(() => {
  powerups.forEach((el) => (el.profit = el.amount * el.value));
  const profitPersec = powerups.reduce((acc, val) => (val.onclick ? acc : acc + val.profit), 0);
  // напишите код, чтобы в счетчик добавлялся посекундный профит
  // и обновите значение html элемента, который отвечает за счетчик
  localStorage.setItem("score", counter);
}, 1000);

const generatePowerUp = (powerup) => {
  return `<div class="powerup">
    <div class="powerup__title">${powerup.title}</div>
    <div class="powerup__price">${powerup.price()}</div>
    <div class="powerup__amount">${powerup.amount}</div>
    <div class="profit">
        <span class="profit__value">${powerup.profit}</span>
        <span class="profit__desc"> / s</span>
    </div>
</div>`;
};

const handleClick = (e) => {
  const clickedPowerup = e.target
    .closest(".powerup")
    .querySelector(".powerup__title").innerHTML;
  const selectedPowerup = powerups.find(
    (powerup) => clickedPowerup === powerup.title
  );
  buyPowerup(selectedPowerup);
};

const renderPowerups = () => {
  powerupsEl.innerHTML = powerups
    .map((powerup) => generatePowerUp(powerup))
    .join("");

  const powerupEls = Array.from(powerupsEl.children);
  powerupEls.forEach((el) => el.addEventListener("click", handleClick));
};

//

const buyPowerup = (powerup) => {
  if (counter >= powerup.price()) {
    counter -= powerup.price();
    powerup.amount++;
    renderPowerups();
    counterEl.innerHTML = counter;
  } else {
    alert("Not enough money");
  }
};

renderPowerups();

powerups.map((el, i) => {
  el.profit = el.value * el.amount;
});
counter += powerups.reduce((acc, val) => {
  return val.onclick ? acc : acc + val.profit;
}, 0);

counterEl.innerHTML = counter;
