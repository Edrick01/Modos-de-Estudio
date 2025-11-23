// 1. SELECCIONAMOS LOS ELEMENTOS DEL DOM
const tablero = document.getElementById("game-board");
const vecesGanadasSpan = document.querySelector("#vecesgan");
const parejasEncSpan = document.querySelector("#parejasenc"); // Corregido para apuntar al span
const resetButton = document.querySelector("#resetButton");

// 2. VARIABLES GLOBALES
const emojis = [
  "😊",
  "😊",
  "🚗",
  "🚗",
  "🍎",
  "🍎",
  "⚽",
  "⚽",
  "🐶",
  "🐶",
  "🌟",
  "🌟",
];
let firstCard = null;
let secondCard = null;
let parejasEncontradas = 0;
const totalParejas = emojis.length / 2;
let bloqueoTablero = false; // Variable extra para evitar clicks rápidos

// 3. CARGAR DATOS DE LOCALSTORAGE
let ganadas = Number(localStorage.getItem("NumGanadas")) || 0;

// Inicializamos el texto de ganadas al cargar
if (vecesGanadasSpan && ganadas) {
  vecesGanadasSpan.textContent = `Has ganado: ${ganadas} veces`;
}

// 4. FUNCIÓN PRINCIPAL: INICIAR EL TABLERO
function iniciarTablero() {
  // A. Limpiamos el tablero y variables
  tablero.innerHTML = "";
  firstCard = null;
  secondCard = null;
  parejasEncontradas = 0;
  bloqueoTablero = false;

  // B. Actualizamos textos
  if (parejasEncSpan) parejasEncSpan.textContent = "Parejas encontradas: 0";

  // C. Barajamos los emojis
  emojis.sort(() => Math.random() - 0.5);

  // D. Creamos las cartas (Estructura 3D)
  emojis.forEach((emoji) => {
    // Contenedor (Sándwich)
    const cartaContenedor = document.createElement("div");
    cartaContenedor.classList.add("carta-contenedor");
    cartaContenedor.dataset.valor = emoji;

    // Cara Frente (?)
    const caraFrente = document.createElement("div");
    caraFrente.classList.add("cara", "frente");
    caraFrente.textContent = "?";

    // Cara Dorso (Emoji)
    const caraDorso = document.createElement("div");
    caraDorso.classList.add("cara", "dorso");
    caraDorso.textContent = emoji;

    // Armar la carta
    cartaContenedor.appendChild(caraFrente);
    cartaContenedor.appendChild(caraDorso);

    // Evento Click
    cartaContenedor.addEventListener("click", voltearCarta);

    // Agregar al tablero
    tablero.appendChild(cartaContenedor);
  });
}

// Arrancamos el juego la primera vez
iniciarTablero();

// 5. LÓGICA DE VOLTEAR
function voltearCarta() {
  // Si el tablero está bloqueado (esperando setTimeout) o si clickeas la misma carta... no hagas nada
  if (bloqueoTablero) return;
  if (this === firstCard) return;
  if (this.classList.contains("volteada")) return;

  // Volteamos la carta (CSS hace el giro)
  this.classList.add("volteada");

  if (!firstCard) {
    // Es la primera carta
    firstCard = this;
  } else {
    // Es la segunda carta
    secondCard = this;
    checarPareja();
  }
}

// 6. LÓGICA DE COMPARAR
function checarPareja() {
  // Coinciden?
  if (firstCard.dataset.valor === secondCard.dataset.valor) {
    disableCards(); // Se quedan volteadas
  } else {
    unflipCards(); // Se regresan
  }
}

function disableCards() {
  // Quitamos los eventos de click para que ya no interactúen
  firstCard.removeEventListener("click", voltearCarta);
  secondCard.removeEventListener("click", voltearCarta);

  // Sumamos puntos
  parejasEncontradas++;
  if (parejasEncSpan)
    parejasEncSpan.textContent = `Parejas encontradas: ${parejasEncontradas}`;

  resetBoard(); // Limpiamos variables firstCard/secondCard

  // Verificamos si ganó
  if (parejasEncontradas === totalParejas) {
    juegoGanado();
  }
}

function unflipCards() {
  bloqueoTablero = true; // Bloqueamos para que no den click a una tercera

  setTimeout(() => {
    firstCard.classList.remove("volteada");
    secondCard.classList.remove("volteada");
    resetBoard(); // Desbloqueamos
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  bloqueoTablero = false;
}

// 7. LÓGICA DE VICTORIA
function juegoGanado() {
  ganadas++;
  localStorage.setItem("NumGanadas", ganadas);

  if (vecesGanadasSpan)
    vecesGanadasSpan.textContent = `Has ganado: ${ganadas} veces`;
  if (parejasEncSpan) parejasEncSpan.textContent = "¡GANASTE! 🎉";

  // Mostrar botón de reinicio
  resetButton.style.display = "block";
}

// 8. RESETEAR JUEGO (Botón)
resetButton.addEventListener("click", () => {
  resetButton.style.display = "none";
  iniciarTablero();
});
