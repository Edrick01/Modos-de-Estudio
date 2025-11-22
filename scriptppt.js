const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");
const btn = document.querySelectorAll(".btn");
const opc = ["piedra", "papel", "tijeras"];
const res = document.querySelector(".resultados");
const estadisticas = document.querySelector("#estadisticas");
let numganadas = Number(localStorage.getItem("pptGanadas")) || 0;
let numperdidas = Number(localStorage.getItem("pptPerdidas")) || 0;
let numempates = Number(localStorage.getItem("pptEmpates")) || 0;
if (numganadas > 0 || numperdidas > 0 || numempates > 0) {
  res.style.display = "flex";
  mensaje.style.display = "none";
  estadisticas.textContent = `Ganadas: ${numganadas} | Perdidas: ${numperdidas} | Empates: ${numempates}`;
}

btn.forEach((boton) => {
  boton.addEventListener("click", function () {
    const opcUsuario = this.id;
    jugar(opcUsuario);
  });
});

function jugar(usuario) {
  const opcmachine = opc[Math.floor(Math.random() * 3)];
  res.style.display = "flex";
  mensaje.style.display = "flex";
  mensaje.textContent = `Tu elegiste ${usuario}, la máquina eligió ${opcmachine}.`;

  if (usuario === opcmachine) {
    resultado.className = "empate";
    resultado.textContent = "Empate";
    numempates++;
    localStorage.setItem("pptEmpates", numempates);
  } else if (
    (usuario == "piedra" && opcmachine == "tijeras") ||
    (usuario == "papel" && opcmachine == "piedra") ||
    (usuario == "tijeras" && opcmachine == "papel")
  ) {
    resultado.className = "gana";
    resultado.textContent = "Ganaste";
    numganadas++;
    localStorage.setItem("pptGanadas", numganadas);
  } else {
    resultado.className = "pierde";
    resultado.textContent = "Perdiste";
    numperdidas++;
    localStorage.setItem("pptPerdidas", numperdidas);
  }
  estadisticas.textContent = `Ganadas: ${numganadas} | Perdidas: ${numperdidas} | Empates: ${numempates}`;
}
document.querySelector("#resetLeaderboard").addEventListener("click", () => {
  localStorage.clear();
  numganadas = 0;
  numperdidas = 0;
  numempates = 0;
  estadisticas.textContent = `Ganadas: ${numganadas} | Perdidas: ${numperdidas} | Empates: ${numempates}`;
});
