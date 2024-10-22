let gameSeq = [];
let userSeq = [];

let btnsArr = ["blue", "red", "orange", "yellow"];

let started = false;
let level = 0;
let highScore = 0;

let hiScore = document.querySelector("#hi");
let score = document.querySelector("#sc");
let info = document.querySelector(".bottom-card");
let btns = document.querySelectorAll(".btn");

function addBtnListeners() {
  btns.forEach((btn) => {
    btn.addEventListener("click", btnPress);
  });
}

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;

    levelUp();
    addBtnListeners();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  score.innerText = `Score: ${level}`;
  info.innerText = "Game Started!";

  let ranIdx = Math.floor(Math.random() * 4);
  let ranColor = btnsArr[ranIdx];
  let ranBtn = document.querySelector(`.${ranColor}`);

  gameSeq.push(ranColor);
  console.log(`GameSeq - ${gameSeq}`);
  btnFlash(ranBtn);
}

function checkAns(idx) {
  if (gameSeq[idx] == userSeq[idx]) {
    info.classList.add("right");
    info.classList.add("flash");
    setTimeout(() => {
      info.classList.remove("right");
      info.classList.remove("flash");
    }, 300);
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    info.classList.add("wrong");
    info.classList.add("flash");
    setTimeout(() => {
      info.classList.remove("wrong");
      info.classList.remove("flash");
    }, 300);
    info.innerText = `Oops! Game Over! Press any key to start again 😊`;
    console.log(level);
    if (level > highScore) {
      highScore = level;
      hiScore.innerText = `High Score: ${highScore}`;
    }
    reset();
  }
}

function btnFlash(btn) {
  btn.classList.add("flash");

  setTimeout(() => {
    btn.classList.remove("flash");
  }, 400);
}

function btnPress() {
  btnFlash(this);

  let color = this.getAttribute("id");
  userSeq.push(color);
  console.log(`UserSeq - ${userSeq}`);

  checkAns(userSeq.length - 1);
}

function removeBtnListeners() {
  btns.forEach((btn) => {
    btn.removeEventListener("click", btnPress);
  });
}

function reset() {
  started = false;
  gameSeq = [];
  uesrSeq = [];
  level = 0;
  removeBtnListeners();
}
