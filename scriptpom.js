const minutosenpantalla = document.getElementById("minutos");
const segundosenpantalla = document.getElementById("segundos");
const btnIniciar = document.getElementById("iniciar");
const btnPausa = document.getElementById("pausa");
const btnReiniciar = document.getElementById("reiniciar");

let mensaje = document.getElementById("msj");

let tiemporestante = 10;
let intervalo = null;

let termino = false;

function actualizarpantalla() {
  const minutos = Math.floor(tiemporestante / 60);

  const segundos = tiemporestante % 60;

  const mintext = minutos < 10 ? "0" + minutos : minutos;
  const segtext = segundos < 10 ? "0" + segundos : segundos;

  minutosenpantalla.textContent = mintext;
  segundosenpantalla.textContent = segtext;

  document.title = `${mintext}:${segtext} - Pomodoro`;
}

function iniciartemporizador() {
  if (intervalo) return;

  btnIniciar.style.display = "none";
  btnPausa.style.display = "block";

  intervalo = setInterval(() => {
    tiemporestante--;
    actualizarpantalla();
    console.log(tiemporestante);
    if (tiemporestante == 0) {
      clearInterval(intervalo);
      intervalo = null;
      mensaje.style.display = "block";
      mensaje.textContent = "Descansa, el tiempo se acabó";
      btnPausa.style.display = "none";
      termino = true;
    }
  }, 1000);
}

function pausartemporizador() {
  clearInterval(intervalo);
  intervalo = null;
  btnPausa.style.display = "none";
  btnIniciar.style.display = "block";
}

function reiniciartemporizador() {
  pausartemporizador();
  tiemporestante = 10;
  actualizarpantalla();
  if (termino) mensaje.style.display = "none";
}

btnIniciar.addEventListener("click", iniciartemporizador);
btnPausa.addEventListener("click", pausartemporizador);
btnReiniciar.addEventListener("click", reiniciartemporizador);

actualizarpantalla();
