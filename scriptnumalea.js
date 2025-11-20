const enviarBtn = document.querySelector(".guessSubmit");
const Numingresado = document.querySelector(".guessField");
const mensaje = document.querySelector("#mensaje");
const cajamensaje = document.querySelector(".resultados");
const numeroAleatorio = Math.floor(Math.random() * 100) + 1;

console.log("Número aleatorio (para pruebas):", numeroAleatorio);
enviarBtn.addEventListener("click", function () {
  const NumUsuario = Number(Numingresado.value);
  cajamensaje.style.display = "block";
  if (NumUsuario === numeroAleatorio) {
    cajamensaje.className = "gana";
    mensaje.textContent = "¡Felicidades! ¡Has adivinado el número!";
  } else if (NumUsuario < numeroAleatorio) {
    cajamensaje.className = "pierde";
    mensaje.textContent = "Demasiado bajo. Intenta de nuevo.";
  } else if (NumUsuario > numeroAleatorio) {
    cajamensaje.className = "pierde";
    mensaje.textContent = "Demasiado alto. Intenta de nuevo.";
  }

  Numingresado.value = "";
  Numingresado.focus();
});
