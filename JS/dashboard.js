document.addEventListener("DOMContentLoaded", () => {
  const lessonsContainer = document.getElementById("lessons");
  const xpText = document.getElementById("xp");
  const xpTotal = document.getElementById("xp-total");
  const xpBar = document.getElementById("xp-bar");
  const goalBar = document.getElementById("goal-bar");
  const dailyProgress = document.getElementById("daily-progress");
  const completedCount = document.getElementById("completed-count");
  const achievementsBox = document.getElementById("achievements");
  const themeToggle = document.getElementById("theme-toggle");

  const TOTAL_LESSONS = 10;
  const XP_PER_LESSON = 100;
  const GOAL_TOTAL = 10;
  let xp = 0;
  let completedLessons = 0;
  let goalProgress = 0;
  let firstAchievementGiven = false;

  // Generar lecciones
  for (let i = 1; i <= TOTAL_LESSONS; i++) {
    const lesson = document.createElement("div");
    lesson.classList.add("lesson");
    if (i === 1) {
      lesson.classList.add("active");
      lesson.innerHTML = `<div class="circle">${i}</div><span class="status">¡Nueva!</span>`;
    } else {
      lesson.classList.add("locked");
      lesson.innerHTML = `<div class="circle">${i}</div>`;
    }
    lesson.dataset.index = i;
    lessonsContainer.appendChild(lesson);
  }

  // Manejar clics en lecciones
  lessonsContainer.addEventListener("click", (e) => {
    const lesson = e.target.closest(".lesson");
    if (!lesson || lesson.classList.contains("locked") || lesson.classList.contains("completed")) return;

    const index = parseInt(lesson.dataset.index);

    // Marcar como completada
    lesson.classList.remove("active");
    lesson.classList.add("completed");
    lesson.querySelector(".status")?.remove();

    xp += XP_PER_LESSON;
    completedLessons++;
    goalProgress++;

    // Actualizar progreso visual
    xpText.textContent = xp;
    xpTotal.textContent = `${xp} XP`;
    xpBar.style.width = `${Math.min(xp / (TOTAL_LESSONS * XP_PER_LESSON) * 100, 100)}%`;
    goalBar.style.width = `${Math.min(goalProgress / GOAL_TOTAL * 100, 100)}%`;
    dailyProgress.textContent = goalProgress;
    completedCount.textContent = completedLessons;

    // Desbloquear siguiente lección
    const nextLesson = lessonsContainer.querySelector(`.lesson[data-index='${index + 1}']`);
    if (nextLesson && nextLesson.classList.contains("locked")) {
      nextLesson.classList.remove("locked");
      nextLesson.classList.add("active");
      nextLesson.innerHTML += `<span class="status">¡Nueva!</span>`;
    }

    // Agregar logro si es la primera completada
  if (!firstAchievementGiven) {
  const badge = document.createElement("div");
  badge.classList.add("icon");
  badge.textContent = "🏅";
  achievementsBox.appendChild(badge);
  firstAchievementGiven = true;

  // Mostrar notificación estilo Xbox
  const popup = document.getElementById("achievement-popup");
const sound = document.getElementById("achievement-sound");

popup.classList.add("show");
sound.currentTime = 0;
sound.play();

setTimeout(() => {
  popup.classList.remove("show");
}, 4000);
}

  });

  // Tema claro/oscuro
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
});
