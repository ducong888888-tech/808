const quotes = [
  "夜深了，把白天没来得及放下的事，先轻轻放在门外。",
  "你不用现在就想明白一切，月光会替你保留答案。",
  "今晚先好好呼吸，明天的路会在天亮后慢慢清晰。",
  "如果情绪有重量，就让这片夜色帮你分担一半。",
  "把手机放下三分钟，听听心跳，它其实一直在安慰你。",
];

const fallbackQuote = "今夜先照顾好自己，答案会在天亮后出现。";
const displayQuotes = quotes.length > 0 ? quotes : [fallbackQuote];

const quoteEl = document.getElementById("quote");
const nextBtn = document.getElementById("nextBtn");
const copyBtn = document.getElementById("copyBtn");

const fadeInClass = "is-visible";
const fadeOutClass = "is-leaving";
const fadeOutDurationMs = 420;
const copySuccessDurationMs = 1200;
const copyDefaultLabel = "复制文案";
const copySuccessLabel = "已复制";

let copyResetTimerId = null;

let currentIndex = Math.floor(Math.random() * displayQuotes.length);

function renderQuote(index, { animate } = { animate: true }) {
  quoteEl.textContent = displayQuotes[index];
  quoteEl.classList.remove(fadeOutClass);

  if (!animate) {
    quoteEl.classList.remove(fadeInClass);
    return;
  }

  quoteEl.classList.remove(fadeInClass);
  requestAnimationFrame(() => {
    quoteEl.classList.add(fadeInClass);
  });
}

function pickNextIndex() {
  if (displayQuotes.length <= 1) {
    return currentIndex;
  }

  let nextIndex = currentIndex;
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * displayQuotes.length);
  }

  return nextIndex;
}

function showNextQuote() {
  if (!quoteEl || !nextBtn) {
    return;
  }

  nextBtn.disabled = true;
  quoteEl.classList.remove(fadeInClass);
  quoteEl.classList.add(fadeOutClass);

  window.setTimeout(() => {
    currentIndex = pickNextIndex();
    renderQuote(currentIndex, { animate: true });
    nextBtn.disabled = false;
  }, fadeOutDurationMs);
}

function initQuote() {
  if (!quoteEl) {
    return;
  }

  renderQuote(currentIndex, { animate: false });

  if (nextBtn) {
    nextBtn.addEventListener("click", showNextQuote);
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", copyCurrentQuote);
  }
}

async function copyCurrentQuote() {
  if (!quoteEl || !copyBtn) {
    return;
  }

  const text = quoteEl.textContent?.trim();
  if (!text) {
    return;
  }

  try {
    await writeToClipboard(text);
    copyBtn.textContent = copySuccessLabel;

    if (copyResetTimerId !== null) {
      window.clearTimeout(copyResetTimerId);
    }

    copyResetTimerId = window.setTimeout(() => {
      copyBtn.textContent = copyDefaultLabel;
      copyResetTimerId = null;
    }, copySuccessDurationMs);
  } catch {
    // ignore copy errors to avoid interrupting reading flow
  }
}

async function writeToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helperTextArea = document.createElement("textarea");
  helperTextArea.value = text;
  helperTextArea.setAttribute("readonly", "");
  helperTextArea.style.position = "fixed";
  helperTextArea.style.opacity = "0";
  helperTextArea.style.pointerEvents = "none";

  document.body.appendChild(helperTextArea);
  helperTextArea.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(helperTextArea);

  if (!copied) {
    throw new Error("copy-failed");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQuote);
} else {
  initQuote();
}
