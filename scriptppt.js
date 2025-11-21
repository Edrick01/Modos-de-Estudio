const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");
const btn = document.querySelectorAll(".btn");
const opc = ["piedra", "papel", "tijeras"];
const res = document.querySelector(".resultados");
const estadisticas = document.querySelector("#estadisticas");
let numganadas = 0;
let numperdidas = 0;
let numempates = 0;
btn.forEach((boton) => {
  boton.addEventListener("click", function () {
    const opcUsuario = this.id;
    jugar(opcUsuario);
  });
});

function jugar(usuario) {
  const opcmachine = opc[Math.floor(Math.random() * 3)];
  res.style.display = "flex";
  mensaje.textContent = `Tu elegiste ${usuario}, la máquina eligió ${opcmachine}.`;

  if (usuario === opcmachine) {
    resultado.className = "empate";
    resultado.textContent = "Empate";
    numempates++;
  } else if (
    (usuario == "piedra" && opcmachine == "tijeras") ||
    (usuario == "papel" && opcmachine == "piedra") ||
    (usuario == "tijeras" && opcmachine == "papel")
  ) {
    resultado.className = "gana";
    resultado.textContent = "Ganaste";
    numganadas++;
  } else {
    resultado.className = "pierde";
    resultado.textContent = "Perdiste";
    numperdidas++;
  }
  estadisticas.textContent = `Ganadas: ${numganadas} | Perdidas: ${numperdidas} | Empates: ${numempates}`;
}
