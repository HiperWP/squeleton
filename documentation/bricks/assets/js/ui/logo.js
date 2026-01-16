/**
 * Hacker Logo Effect
 * Cool text scrambling animation for the Squeleton2Bricks logo
 */

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

export function initializeLogoEffect() {
  const codeHeading = document.querySelector(".code-heading");

  if (!codeHeading) {
    console.warn("Code heading element not found");
    return;
  }

  codeHeading.addEventListener("mouseover", (event) => {
    const hackText = event.currentTarget.querySelector('.hack-text');

    if (!hackText) {
      console.warn("Hack text element not found");
      return;
    }

    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      hackText.innerText = hackText.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return hackText.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= hackText.dataset.value.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  });

  // Optional: Add click effect for extra interactivity
  codeHeading.addEventListener("click", (event) => {
    const hackText = event.currentTarget.querySelector('.hack-text');

    if (!hackText) return;

    // Quick flash effect
    hackText.style.color = 'var(--accent-primary)';
    setTimeout(() => {
      hackText.style.color = '';
    }, 150);
  });
}
