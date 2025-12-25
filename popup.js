document.addEventListener("DOMContentLoaded", () => {
  const applyBtn = document.getElementById("apply");
  const copyBtn = document.getElementById("save"); // This is our copy button

  applyBtn.addEventListener("click", runTone);
  copyBtn.addEventListener("click", copyText);
});

async function copyText() {
  const outputEl = document.getElementById("output");
  const copyBtn = document.getElementById("save");
  
  if (!outputEl.value) return;

  try {
    // copy text to clipboard
    await navigator.clipboard.writeText(outputEl.value);
    
    // Provide visual feedback
    const originalText = copyBtn.innerText;
    copyBtn.innerText = "Copied!";
    copyBtn.style.background = "var(--success)"; // Uses the green color 
    
    // Change it back after 2 seconds
    setTimeout(() => {
      copyBtn.innerText = originalText;
      copyBtn.style.background = "var(--accent)"; // Back to blue
    }, 2000);
    
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
async function runTone() {
  const textEl = document.getElementById("text");
  const toneEl = document.querySelector('input[name="toneChoice"]:checked');
  const applyBtn = document.getElementById("apply"); // Select the button
  const outputEl = document.getElementById("output");

  if (!textEl.value || !toneEl) {
    alert("Please enter some text!");
    return;
  }

  // --- START LOADING STATE ---
  const originalBtnText = applyBtn.innerText;
  applyBtn.innerText = "Processing..."; 
  applyBtn.disabled = true; // Prevent double-clicks
  applyBtn.style.opacity = "0.7";
  applyBtn.style.cursor = "not-allowed";
  outputEl.value = "Refining..."; 

  try {
    const res = await fetch("http://127.0.0.1:5000/run", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: textEl.value, tone: toneEl.value })
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const data = await res.json();
    outputEl.value = data.result;

  } catch (error) {
    console.error("Fetch error:", error);
    outputEl.value = "Error: Check if the Python server is running.";
  } finally {
    // --- END LOADING STATE ---
    applyBtn.innerText = originalBtnText;
    applyBtn.disabled = false;
    applyBtn.style.opacity = "1";
    applyBtn.style.cursor = "pointer";
  }
}