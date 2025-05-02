let sentence = "";
let startTime;
const sentenceEl = document.getElementById("sentence");
const inputBox = document.getElementById("inputBox");
const resultsEl = document.getElementById("results");
const startBtn = document.getElementById("startBtn");

async function getSentence() {
  try {
    const res = await fetch('sentences.txt');
    const text = await res.text();
    const lines = text.trim().split('\n');
    return lines[Math.floor(Math.random() * lines.length)];
  } catch (err) {
    sentenceEl.innerText = "Error loading sentence file.";
    console.error(err);
    return "";
  }
}

function calculateResults(input) {
  const totalTime = (new Date() - startTime) / 1000;
  let correct = 0;
  for (let i = 0; i < sentence.length; i++) {
    if (input[i] === sentence[i]) correct++;
  }
  const accuracy = ((correct / sentence.length) * 100).toFixed(2);
  const wpm = ((input.length / 5) / (totalTime / 60)).toFixed(2);
  resultsEl.innerText = `Time: ${totalTime.toFixed(1)}s | Accuracy: ${accuracy}% | WPM: ${wpm}`;
}

startBtn.addEventListener("click", async () => {
  sentence = await getSentence();
  if (!sentence) return;
  sentenceEl.innerText = sentence;
  inputBox.disabled = false;
  inputBox.value = '';
  resultsEl.innerText = '';
  inputBox.focus();
  startTime = new Date();
});

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    calculateResults(inputBox.value.trim());
    inputBox.disabled = true;
  }
});