Echo: AI Message Refiner

<p align="left">
  <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  <img src="https://img.shields.io/badge/AI-GPT--4o-blue" />
  <img src="https://img.shields.io/badge/Framework-Flask-lightgrey" />
  <img src="https://img.shields.io/badge/Chrome-Extension-orange" />
</p>

**Echo** is a sophisticated message-refining browser extension that acts as a garnish for your messages. It transforms raw drafts (text as well as speech) into polished communication, ensuring your English is sharp, clear, and perfectly suited for the recipient.

---

## ✨ Key Features

- **Voice-to-Refined-Text:** Capture user input via voice and refine the spoken message into the selected tone in real-time.
- **Garnish Effect:** The Garnish Effect: Echo doesn't rewrite your message from scratch; it "garnishes" it. By preserving your core intent and personal vocabulary, the AI adjusts the tone while ensuring the final message still sounds like you—just the best version of you.
- **Seamless Workflow:** One-click copy to clipboard with instant visual confirmation.

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
1. Port 5000 Conflict (macOS)
Disable AirPlay Receiver in System Settings, or change the port in app.py to 5001.

2. CORS Error
Ensure flask-cors is installed and properly initialized in app.py.

