document.addEventListener("DOMContentLoaded", () => {
  const applyBtn = document.getElementById("apply");
  const copyBtn = document.getElementById("save");
  const micBtn = document.getElementById("micBtn");
  const textEl = document.getElementById("text");

  // --- 1. EVENT LISTENERS ---
  applyBtn.addEventListener("click", runTone);
  copyBtn.addEventListener("click", copyText);

  // --- 2. HIDE MIC WHEN TYPING ---
  // This makes the UI clean by removing the mic once the user starts typing manually
  textEl.addEventListener("input", () => {
    if (textEl.value.trim().length > 0) {
      micBtn.classList.add("mic-hidden");
    } else {
      micBtn.classList.remove("mic-hidden");
    }
  });

  // --- 3. SPEECH RECOGNITION LOGIC ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    micBtn.addEventListener("click", () => {
      recognition.start();
    });

    recognition.onstart = () => {
      micBtn.classList.add("recording");
      // document.getElementById("micIcon").innerText = "🛑";
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      textEl.value = transcript;

      // Manually trigger the 'input' event so the logic 
      // knows to hide the mic now that text exists
      textEl.dispatchEvent(new Event('input'));
    };

    recognition.onerror = (event) => {
      console.error("Speech error: ", event.error);
      resetMicUI();
    };

    recognition.onend = () => {
      resetMicUI();
    };

    function resetMicUI() {
      micBtn.classList.remove("recording");
      // document.getElementById("micIcon").innerText = "🎤";
    }
  } else {
    // Hide mic button if browser doesn't support Web Speech API
    micBtn.style.display = 'none';
    console.warn("Speech Recognition not supported in this browser.");
  }
});

// --- 4. TONE REFINEMENT FUNCTION ---
async function runTone() {
  const textEl = document.getElementById("text");
  const toneEl = document.querySelector('input[name="toneChoice"]:checked');
  const applyBtn = document.getElementById("apply");
  const outputEl = document.getElementById("output");

  if (!textEl.value || !toneEl) {
    alert("Please enter some text!");
    return;
  }

  // Loading State
  const originalBtnText = applyBtn.innerText;
  applyBtn.innerText = "Processing...";
  applyBtn.disabled = true;
  applyBtn.style.opacity = "0.7";
  applyBtn.style.cursor = "not-allowed";
  outputEl.value = "Refining...";

  try {
    const res = await fetch("https://echo-backend-jet.vercel.app/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: textEl.value, tone: toneEl.value })
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const data = await res.json();
    outputEl.value = data.result;

  } catch (error) {
    console.error("Fetch error:", error);
    outputEl.value = "Error: Make sure the server is awake (Render free tier may take a moment).";
  } finally {
    applyBtn.innerText = originalBtnText;
    applyBtn.disabled = false;
    applyBtn.style.opacity = "1";
    applyBtn.style.cursor = "pointer";
  }
}

// --- 5. COPY TO CLIPBOARD FUNCTION ---
async function copyText() {
  const outputEl = document.getElementById("output");
  const copyBtn = document.getElementById("save");

  if (!outputEl.value) return;

  try {
    await navigator.clipboard.writeText(outputEl.value);

    const originalText = copyBtn.innerText;
    copyBtn.innerText = "Copied!";
    copyBtn.style.background = "var(--success)";

    setTimeout(() => {
      copyBtn.innerText = originalText;
      copyBtn.style.background = ""; // Resets to default CSS color
    }, 2000);

  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}