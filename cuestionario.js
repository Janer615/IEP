const opcionesContainer = document.getElementById('opciones');
const pregunta = document.getElementById('pregunta');
const boton = document.getElementById('continuar');
const progressBar = document.getElementById('progressBar');
const toggleBtn = document.getElementById('toggleTheme');

let paso = 0;

const preguntas = [
  {
    texto: '¿Por qué quieres aprender esta materia?',
    opciones: [
      'Impulsar mis estudios',
      'Ejercitar mi mente',
      'Prepararme para viajar',
      'Conectarme con personas',
      'Para divertirme',
      'Impulsar mi carrera profesional'
    ]
  },
  {
    texto: '¿Cuánto tiempo piensas dedicarle a la semana?',
    opciones: [
      '1-2 horas',
      '3-5 horas',
      '6-8 horas',
      'Más de 8 horas'
    ]
  },
  {
    texto: '¿Tienes conocimientos previos?',
    opciones: [
      'Sí, tengo experiencia',
      'Algo, pero quiero mejorar',
      'No, soy principiante'
    ]
  }
];

function cargarPregunta(index) {
  const p = preguntas[index];
  pregunta.textContent = p.texto;
  opcionesContainer.innerHTML = '';

  p.opciones.forEach(op => {
    const div = document.createElement('div');
    div.classList.add('option');
    div.innerHTML = `<img src="icons/estudios.png" alt=""><span>${op}</span>`;
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
    window.location.href = "final.html";
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
