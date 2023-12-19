const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
    lives: document.querySelector('#lives'),
  },
  values: {
    timerId: null,
    countDownTimerId: setInterval(countDown, 1000),
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    lives: 3,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  if (state.values.currentTime === 0 || state.values.lives === 0) {
    endGame();
  }
}

function playSound(sound) {
  let audio = new Audio(`./src/audios/${sound}.mp3`);
  audio.volume = 0.4;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove('enemy');
  });
  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add('enemy');
  state.values.hitPosition = randomSquare.id;
}

function addListenerToHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound('boing');
      } else {
        playSound('invalid');
        state.values.lives--;
        state.view.lives.textContent = state.values.lives;
      }
    });
  });
}

function endGame() {
  alert('Game Over! O seu resultado foi: ' + state.values.result);
  resetGame();
}

function resetGame() {
  clearInterval(state.values.countDownTimerId);
  clearInterval(state.actions.timerId);

  // Resetar valores iniciais
  state.values.currentTime = 60;
  state.values.lives = 3;
  state.values.result = 0;

  // Atualizar elementos no DOM
  state.view.timeLeft.textContent = state.values.currentTime;
  state.view.lives.textContent = state.values.lives;
  state.view.score.textContent = state.values.result;

  // Reiniciar temporizadores
  state.values.countDownTimerId = setInterval(countDown, 1000);
  state.actions.timerId = setInterval(randomSquare, 1000);
}

function main() {
  addListenerToHitBox();
}

main();
