const mensaje =
document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");
const btn  = document.querySelectorAll(".btn");
const opc=["piedra", "papel", "tijeras"];
btn.forEach(boton => {
  boton.addEventListener("click", function() {
    const opcUsuario=this.id;
    jugar(opcUsuario);
  });
});

function jugar(usuario) {
  const opcmachine = opc[Math.floor(Math.random()*3)];
  mensaje.textContent = `Tu elegiste ${usuario}, la máquina eligió ${opcmachine}.`;
  if (usuario === opcmachine) {
    resultado.textContent = "Empate";
  }
  else if (usuario=="piedra" && opcmachine=="tijeras" || usuario=="papel" && opcmachine=="piedra" || usuario=="tijeras" && opcmachine=="papel") {
    resultado.textContent = "Ganaste";
  }
  else {
    resultado.textContent = "Perdiste";
  }
}




