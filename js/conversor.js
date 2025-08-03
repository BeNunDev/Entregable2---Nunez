const USD = 1000;
const EUR = 1100;

const form = document.getElementById("form-conversor");
const montoInput = document.getElementById("monto");
const monedaSelect = document.getElementById("moneda");
const resultadoDiv = document.getElementById("resultado");
const historialUl = document.getElementById("historial");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const montoARS = parseFloat(montoInput.value);
  const moneda = monedaSelect.value;

  if (isNaN(montoARS) || montoARS <= 0 || moneda === "") {
    resultadoDiv.textContent =
      "Por favor, ingresá un monto válido y seleccioná una moneda.";
    return;
  }

  let resultado = 0;
  if (moneda === "USD") {
    resultado = montoARS / USD;
  } else if (moneda === "EUR") {
    resultado = montoARS / EUR;
  }

  const conversion = {
    fecha: new Date().toLocaleString(),
    montoARS,
    moneda,
    resultado: resultado.toFixed(2),
  };

  mostrarResultado(conversion);
  guardarEnHistorial(conversion);
  mostrarHistorial();
});

function mostrarResultado(conversion) {
  resultadoDiv.textContent = `El equivalente de ${conversion.montoARS} ARS en ${conversion.moneda} es aproximadamente ${conversion.resultado} ${conversion.moneda}`;
}

function guardarEnHistorial(conversion) {
  let historial =
    JSON.parse(localStorage.getItem("historialConversiones")) || [];
  historial.push(conversion);
  localStorage.setItem("historialConversiones", JSON.stringify(historial));
}

function mostrarHistorial() {
  historialUl.innerHTML = "";
  const historial =
    JSON.parse(localStorage.getItem("historialConversiones")) || [];

  historial.forEach((conv) => {
    const li = document.createElement("li");
    li.textContent = `[${conv.fecha}] ${conv.montoARS} ARS => ${conv.resultado} ${conv.moneda}`;
    historialUl.appendChild(li);
  });
}

// Mostrar historial al cargar la página
mostrarHistorial();
