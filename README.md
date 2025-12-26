# Echo: AI Message Refiner
Bridge the gap between raw thought and polished communication

<p align="left">
  <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  <img src="https://img.shields.io/badge/AI-GPT--4o-blue" />
  <img src="https://img.shields.io/badge/Framework-Flask-lightgrey" />
  <img src="https://img.shields.io/badge/Chrome-Extension-orange" />
</p>

**Echo** is a sophisticated message-refining browser extension that acts as a garnish for your messages. It transforms raw thoughts into polished communication, ensuring your English is perfectly suited for the recipient.

---

## ✨ Key Highlights

- **Voice-to-Tone Dictation:** Integrated Web Speech API allows for hands-free drafting. Speak your messy thoughts, and Echo transcribes and refines them in one go.
- **Garnish Effect:** Reflects your thoughts back in three distinct, curated tones which reflect you and not AI.
- **Context-Aware:** Not just a grammar checker; it "re-draws" sentences for impact.
- **Seamless Workflow:** One-click copy to clipboard with instant visual confirmation.
- **Modern UI:** Built with a SaaS-inspired grid layout and haptic-style feedback.

---

## 🎨 Tone Profiles

| Tone | Emoji | Best For |
| :--- | :--- | :--- |
| **Polite** | 🌿 | Sensitive requests, feedback, or soft inquiries. |
| **Formal** | 💼 | Executive emails, LinkedIn outreach, and reporting. |
| **Informal**| 🤝 | Slack/Discord chats and friendly quick-responses. |

---

## 🛠️ Technical Implementation

### Backend Architecture
Built with **Python & Flask**, the backend serves as a secure bridge to **GitHub Models (GPT-4o)**. This ensures that API keys remain protected and never reach the client-side extension.

### Frontend Experience
A lightweight **ES6+ JavaScript** core manages asynchronous states, providing a "Processing..." indicator during AI inference and a "Copied! ✨" state for the clipboard.
Web Speech API: Leveraged for real-time, cloud-based voice transcription.
CSS3 Animations: Custom @keyframes used to create a "Sonar Pulse" effect, providing non-intrusive haptic-style visual feedback during active recording.
SVG Architecture: Transitioned from bitmap emojis to vector graphics (SVGs) to ensure UI consistency and crispness across high-DPI displays.

---

## ⚙️ Setup Instructions

### 1. Authentication
1. Generate a **Fine-grained Personal Access Token** on GitHub.
2. Under **Permissions**, select **Account Permissions** > **Models** > **Read-only**.
3. Create a `.env` file in the root:
   ```env
   GITHUB_TOKEN=your_pat_token_here
### 2. Local Installation 
1. Clone the repository 
    ```
    git clone https://github.com/tanyaaggarwal08/echo-message-refiner.git
    cd echo-message-refiner
2. Install dependencies 
    ``` 
    pip install -r requirements.txt
### 3. Execution 
1. Run the backend server in terminal
    ```
    python app.py
2. After running the above command, it will create __pycache__ file in the directly. Delete that manually as it will interfere with extension loading on browser
3. Chrome Extension Activation

    1. Open chrome://extensions/
    2. Enable Developer Mode (top right)
    3. Click Load Unpacked
    4. Select the project folder

## 📂 Project Structure 
   
    .
    ├── app.py              # Flask server handling API routing
    ├── tone_suggester.py   # AI prompt logic & model integration
    ├── manifest.json       # Chrome extension configuration
    ├── main.html           # SaaS-inspired UI
    ├── popup.js            # Frontend logic & Clipboard API
    ├── popup.css           # Custom component styling
    ├── .env                # API Keys (excluded from Git)
    └── README.md           # Project documentation

## 🔧 Troubleshooting

3. Port 5000 Conflict (macOS)
Disable AirPlay Receiver in System Settings, or change the port in app.py to 5001.

4. CORS Error
Ensure flask-cors is installed and properly initialized in app.py.

