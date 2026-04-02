const quoteMap = {
  lateNight: [
    "夜深了，把白天没来得及放下的事，先轻轻放在门外。",
    "你不用现在就想明白一切，月光会替你保留答案。",
    "今晚先好好呼吸，明天的路会在天亮后慢慢清晰。",
    "如果情绪有重量，就让这片夜色帮你分担一半。",
    "把手机放下三分钟，听听心跳，它其实一直在安慰你。",
  ],
  work: [
    "今天完成一件小事，也是在认真推进生活。",
    "别急着追赶所有进度，稳稳做完眼前这一步就很好。",
    "你不是效率机器，留一点空白，反而更有力量。",
    "工作是长跑，不必每一天都冲刺到极限。",
    "先把最重要的事做好，剩下的交给节奏。",
  ],
  self: [
    "你值得被温柔对待，首先来自你自己。",
    "允许自己慢下来，不代表你在后退。",
    "真正的自律，也包含对自己的体谅。",
    "你可以不完美，但依然完整而珍贵。",
    "每天和自己站在同一边，已经很了不起。",
  ],
};

const quoteEl = document.getElementById("quote");
const nextBtn = document.getElementById("nextBtn");
const categorySwitch = document.getElementById("categorySwitch");
const categoryButtons = Array.from(
  categorySwitch.querySelectorAll(".category-btn")
);

const fadeInClass = "is-visible";
const fadeOutClass = "is-leaving";
const fadeOutDurationMs = 380;

let currentCategory = "lateNight";
let currentIndex = Math.floor(Math.random() * quoteMap[currentCategory].length);

function getCurrentQuotes() {
  return quoteMap[currentCategory];
}

function renderQuote(index) {
  quoteEl.textContent = getCurrentQuotes()[index];
  quoteEl.classList.remove(fadeOutClass);
  quoteEl.classList.remove(fadeInClass);
  requestAnimationFrame(() => {
    quoteEl.classList.add(fadeInClass);
  });
}

function pickNextIndex() {
  const quotes = getCurrentQuotes();
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

function setActiveCategoryButton() {
  categoryButtons.forEach((button) => {
    const isActive = button.dataset.category === currentCategory;
    button.classList.toggle("is-active", isActive);
  });
}

function switchCategory(category) {
  if (!quoteMap[category] || category === currentCategory) {
    return;
  }

  currentCategory = category;
  currentIndex = Math.floor(Math.random() * getCurrentQuotes().length);
  setActiveCategoryButton();
  renderQuote(currentIndex);
}

categorySwitch.addEventListener("click", (event) => {
  const button = event.target.closest(".category-btn");
  if (!button) {
    return;
  }
  switchCategory(button.dataset.category);
});

nextBtn.addEventListener("click", showNextQuote);
renderQuote(currentIndex);
