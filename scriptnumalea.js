const enviarBtn = document.querySelector(".guessSubmit");
const Numingresado = document.querySelector(".guessField");
const mensaje = document.querySelector("#mensaje");
const cajamensaje = document.querySelector(".resultados");
const flechaDown = document.getElementById("felcha-down");
const flechaUp = document.getElementById("felcha-up");

let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let resetbtn = document.querySelector("#resetButton");
console.log("Número aleatorio (para pruebas):", numeroAleatorio);

enviarBtn.addEventListener("click", function () {
  const NumUsuario = Number(Numingresado.value);

  cajamensaje.style.display = "block";

  flechaDown.style.display = "none";
  flechaUp.style.display = "none";

  if (NumUsuario === numeroAleatorio) {
    cajamensaje.className = "gana";
    mensaje.textContent = "¡Felicidades! ¡Has adivinado el número!";
    Gameover();
  } else if (NumUsuario < numeroAleatorio) {
    cajamensaje.className = "pierde";
    mensaje.textContent = "Demasiado bajo";
    flechaDown.style.display = "inline";
  } else if (NumUsuario > numeroAleatorio) {
    cajamensaje.className = "pierde";
    mensaje.textContent = "Demasiado alto";
    flechaUp.style.display = "inline";
  }

  Numingresado.value = "";
  Numingresado.focus();
});

function Gameover() {
  Numingresado.disabled = true;
  enviarBtn.disabled = true;
  enviarBtn.style.display = "none";
  resetbtn.style.display = "inline";
  resetbtn.addEventListener("click", reset);
}

function reset() {
  numeroAleatorio = Math.floor(Math.random() * 100) + 1;
  console.log("Número aleatorio (para pruebas):", numeroAleatorio);
  cajamensaje.style.display = "none";
  flechaDown.style.display = "none";
  flechaUp.style.display = "none";
  mensaje.textContent = "";

  Numingresado.disabled = false;
  enviarBtn.disabled = false;
  Numingresado.value = "";
  Numingresado.focus();

  resetbtn.style.display = "none";
}
