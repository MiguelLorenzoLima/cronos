let isRunnig = false;

self.onmessage = function (event) {
  if(isRunnig) return; // se o running for falso, ele não entra no return

  isRunnig = true; // agora o runnig vai rodar
  
  const state = event.data;
  const { activeTask, secondsRemaining } = state;
  const endDate = activeTask.startDate + secondsRemaining * 1000;

    const now = Date.now();
    let countDownSeconds = Math.ceil((endDate - now) / 1000); //ceil arredonda para cima

  function tick() {
    self.postMessage(countDownSeconds);

    const now = Date.now();
    countDownSeconds = Math.floor((endDate - now) / 1000);//floor arredonda para baixo

    setTimeout(tick, 1000); // vai ficar contando segundo por segundo
  }
  tick();
};