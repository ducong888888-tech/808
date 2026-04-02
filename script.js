const quotes = [
  "你已经很努力了，可以慢一点。",
  "今天先把自己照顾好，其他事明天再说。",
  "不必每一步都完美，走着走着也会有答案。",
  "允许自己偶尔脆弱，这也是一种温柔的勇敢。",
  "把心放轻一点，夜晚会替你收好疲惫。",
];

const quoteEl = document.getElementById("quote");
const nextBtn = document.getElementById("nextBtn");
let currentIndex = Math.floor(Math.random() * quotes.length);
const fadeInClass = "is-visible";
const fadeOutClass = "is-leaving";
const fadeOutDurationMs = 380;

function renderQuote(index) {
  quoteEl.textContent = quotes[index];
  quoteEl.classList.remove(fadeOutClass);
  quoteEl.classList.remove(fadeInClass);
  requestAnimationFrame(() => {
    quoteEl.classList.add(fadeInClass);
  });
}

function pickNextIndex() {
  if (quotes.length <= 1) {
    return currentIndex;
  }

  let nextIndex = currentIndex;
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * quotes.length);
  }
  return nextIndex;
}

function showNextQuote() {
  nextBtn.disabled = true;
  quoteEl.classList.remove(fadeInClass);
  quoteEl.classList.add(fadeOutClass);

  window.setTimeout(() => {
    currentIndex = pickNextIndex();
    renderQuote(currentIndex);
    nextBtn.disabled = false;
  }, fadeOutDurationMs);
}

renderQuote(currentIndex);

nextBtn.addEventListener("click", showNextQuote);
