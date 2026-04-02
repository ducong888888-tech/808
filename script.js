const quotes = [
  "夜深了，把白天没来得及放下的事，先轻轻放在门外。",
  "你不用现在就想明白一切，月光会替你保留答案。",
  "今晚先好好呼吸，明天的路会在天亮后慢慢清晰。",
  "如果情绪有重量，就让这片夜色帮你分担一半。",
  "把手机放下三分钟，听听心跳，它其实一直在安慰你。",
];

const quoteEl = document.getElementById("quote");
const nextBtn = document.getElementById("nextBtn");

const fadeInClass = "is-visible";
const fadeOutClass = "is-leaving";
const fadeOutDurationMs = 420;

let currentIndex = Math.floor(Math.random() * quotes.length);

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

if (quoteEl && nextBtn) {
  renderQuote(currentIndex);
  nextBtn.addEventListener("click", showNextQuote);
}
