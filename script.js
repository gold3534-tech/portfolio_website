const boot = document.querySelector("[data-boot]");
const startButton = document.querySelector("[data-start]");
const tiltTarget = document.querySelector("[data-tilt]");

const closeBoot = () => {
  boot?.classList.add("is-hidden");
};

startButton?.addEventListener("click", closeBoot);
window.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    closeBoot();
  }
});

setTimeout(() => {
  if (!boot?.classList.contains("is-hidden")) {
    closeBoot();
  }
}, 4200);

window.addEventListener("mousemove", (event) => {
  if (!tiltTarget || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  tiltTarget.style.setProperty("--rx", `${y * -4}deg`);
  tiltTarget.style.setProperty("--ry", `${x * 5}deg`);
});
