const opcionesContainer = document.getElementById('opciones');
const pregunta = document.getElementById('pregunta');
const boton = document.getElementById('continuar');
const toggleBtn = document.getElementById('toggleTheme');

let paso = 0;

const preguntas = [
  {
    texto: '¿Qué te parece si nos registramos?',
    opciones: [
      '¡SEGURO!',
    ]
  },
];

function cargarPregunta(index) {
  const p = preguntas[index];
  pregunta.textContent = p.texto;
  opcionesContainer.innerHTML = '';

  p.opciones.forEach(op => {
    const div = document.createElement('div');
    div.classList.add('option');
    div.innerHTML = `<span>${op}</span>`;
    opcionesContainer.appendChild(div);

    div.addEventListener('click', () => {
      document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
      div.classList.add('selected');
      boton.disabled = false;
      boton.classList.add('enabled');
    });
  });
}

boton.addEventListener('click', () => {
  paso++;
  if (paso < preguntas.length) {
    cargarPregunta(paso);
    boton.disabled = true;
    boton.classList.remove('enabled');
    actualizarProgreso();
  } else {
    window.location.href = "registro.html";
  }
});

function actualizarProgreso() {
  const porcentaje = ((paso) / preguntas.length) * 100;
  progressBar.style.width = porcentaje + '%';
}

// Tema claro/oscuro
function cargarTema() {
  const tema = localStorage.getItem("tema");
  if (tema === "claro") {
    document.body.classList.add("light");
    toggleBtn.textContent = "🌞";
  }
}

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle("light");
  const esClaro = document.body.classList.contains("light");
  toggleBtn.textContent = esClaro ? "🌞" : "🌙";
  localStorage.setItem("tema", esClaro ? "claro" : "oscuro");
});

cargarPregunta(paso);
cargarTema();
