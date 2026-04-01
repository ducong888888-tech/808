const quotes = [
  "你已经很努力了，可以慢一点。",
  "今天先把自己照顾好，其他事明天再说。",
  "不必每一步都完美，走着走着也会有答案。",
  "允许自己偶尔脆弱，这也是一种温柔的勇敢。",
  "把心放轻一点，夜晚会替你收好疲惫。",
];

const quoteEl = document.getElementById("quote");
const randomIndex = Math.floor(Math.random() * quotes.length);
quoteEl.textContent = quotes[randomIndex];
