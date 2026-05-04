# 📳 VoiceMap — AI Emergency Assistant for Deaf-Blind Individuals

> **AI that speaks through touch. No one left behind.**

VoiceMap is an open-source, AI-powered emergency assistant built specifically for deaf-blind individuals. When a disaster strikes — flood, fire, earthquake, cyclone, or chemical hazard — deaf-blind people cannot hear sirens and cannot see visual warnings. VoiceMap bridges this gap by using **Gemma 4 AI** to process emergency alerts and deliver life-saving instructions through intelligent vibration patterns on any smartphone.

Built for the **[Gemma 4 Good Hackathon](https://www.kaggle.com/competitions/gemma-4-good-hackathon)** by Google DeepMind on Kaggle.

---

## 🌐 Live Demo

<div align="center">

### ✦ [https://voicemap.netlify.app](https://voicemap.netlify.app) ✦

**The fully deployed, AI-powered application is live and ready to test.**
Gemma 4 AI is connected. All features are active. No setup required.

> 👆 **Judges:** Click the link above to experience VoiceMap instantly in your browser.
> Tap **SIMULATE GOVERNMENT ALERT** for a guided demo in under 30 seconds.

</div>

---

## 🌍 The Problem

**36 million people worldwide are deaf-blind.**

During natural disasters, they face a unique and life-threatening communication barrier:

- ❌ Cannot hear sirens, alarms, or audio announcements
- ❌ Cannot see visual alerts, flashing lights, or text warnings
- ❌ Existing emergency systems completely ignore this population
- ❌ No AI-powered tactile communication solution existed — until now

The result is delayed response and a significantly higher risk of fatality during emergencies.

---

## 💡 The Solution

VoiceMap converts any emergency alert into a sequence of vibration patterns, delivered through the device the user already carries — their smartphone.

```
Emergency Alert (any language)
        ↓
  Gemma 4 AI Analysis
        ↓
  Danger Classification
  Survival Instructions
  Urgency Scoring
        ↓
  Vibration Patterns
  (delivered through touch)
        ↓
  Caregiver SMS Alert
```

Every instruction maps to a unique vibration intensity. A **CRITICAL** instruction vibrates with 5 rapid intense pulses. A **LOW** instruction vibrates with a single gentle pulse. The deaf-blind user learns to follow these patterns to safety — without sight or sound.

---

## ✨ Features

### 🧠 AI-Powered Analysis (Gemma 4)
- Classifies disaster type automatically (Flood, Fire, Earthquake, Cyclone, Chemical)
- Computes a danger score from 1–10
- Generates 4–6 prioritized survival instructions sorted by urgency
- Adapts language complexity for user profile (Adult, Elderly, Child, Group)
- Detects and processes input in any language

### 📳 Intelligent Vibration Engine
- Each instruction gets a unique vibration pattern based on urgency score
- Tap any single instruction card to vibrate just that instruction
- **Transmit All** button delivers the complete sequence automatically
- Real-time animated wave canvas and frequency bars visualize haptic output

| Urgency Score | Vibration Pattern |
|---|---|
| 10 (Maximum) | `500ms — 500ms — 500ms — 500ms — 500ms` |
| 9 (Critical) | `400ms — 400ms — 400ms — 400ms` |
| 8 (High) | `300ms — 300ms — 300ms` |
| 7 | `250ms — 250ms — 200ms` |
| 5 (Medium) | `200ms — 200ms` |
| 1–4 (Low) | `150ms — 150ms` |

### 🗣️ Voice Synthesis
- Reads every instruction aloud using the Web Speech API
- Supports all 12 languages with correct accent and voice matching
- Designed for caregivers and support workers nearby

### 🌐 Multilingual Support (12 Languages)
English · বাংলা (Bengali) · हिन्दी (Hindi) · Español · Français · العربية · 中文 · Português · Русский · Deutsch · 日本語 · 한국어

### 📴 100% Offline Capable
- When no internet is available, VoiceMap automatically switches to its built-in emergency database
- Pre-built instruction sets for all 5 disaster types
- Keyword detection supports English, Bengali, and Hindi input
- No data loss — the app always works

### 📱 Caregiver Alert System
- Enter a caregiver's phone number before analysis
- After AI generates instructions, VoiceMap prepares a pre-written SMS alert
- One tap opens the device's native SMS app with the message ready to send
- Message includes disaster type, danger level, and a direct call to action

### 📩 Simulate Government Alert (Demo Feature)
- Tap **SIMULATE GOVERNMENT ALERT** to receive a realistic incoming SMS overlay
- Simulates 5 real-world government alert formats (Flood, Fire, Earthquake, Cyclone, Chemical)
- One tap auto-fills the form and triggers full AI analysis — perfect for judges and demos

### 🔒 Secure API Architecture
- The Gemma 4 API key **never reaches the browser**
- All AI calls are proxied through a Netlify serverless function
- The key lives only as a server-side environment variable (`GEMMA_API_KEY`)

---

## 🗂️ Project Structure

```
VoiceMap/
├── index.html                  # Complete frontend (2,200+ lines)
│                               # HTML + CSS + JavaScript — no build tools
├── netlify.toml                # Redirects /api/analyze → Netlify function
├── netlify/
│   └── functions/
│       └── analyze.js          # Serverless API proxy for Gemma 4
├── LICENSE                     # MIT License
├── .gitignore                  # Protects .env and node_modules
└── README.md                   # This file
```

---

## 🚀 Deployment (Netlify — Recommended)

Netlify is the easiest way to deploy VoiceMap and the only way to use the live Gemma 4 AI (since the API key lives as a server-side environment variable).

### Step 1 — Fork or Clone the Repository

```bash
git clone https://github.com/sahidahammed11/voicemap.git
cd voicemap
```

### Step 2 — Get a Gemma 4 API Key

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Sign in with your Google account
3. Click **Get API Key** → **Create API key**
4. Copy the key — it looks like `AIzaSy...`

### Step 3 — Deploy to Netlify

**Option A: Deploy via Netlify Dashboard (Easiest)**

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **Add new site** → **Import an existing project**
3. Connect your GitHub account and select the VoiceMap repository
4. Leave all build settings blank (no build command needed)
5. Click **Deploy site**

**Option B: Deploy via Netlify CLI**

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Step 4 — Configure the API Key on Netlify

This is the most important step. Without this, the AI will not work.

1. In your Netlify dashboard, go to your VoiceMap site
2. Click **Site configuration** → **Environment variables**
3. Click **Add a variable**
4. Set the following:
   - **Key:** `GEMMA_API_KEY`
   - **Value:** Paste your Google AI Studio API key here
5. Click **Save**
6. Go to **Deploys** → click **Trigger deploy** → **Deploy site**

> ⚠️ **Important:** Never paste your API key directly into `index.html` or `analyze.js`. It must live only as a Netlify environment variable. The `.gitignore` already protects any `.env` file you create locally.

### Step 5 — Test Your Deployment

1. Open your Netlify site URL (e.g. `https://your-site.netlify.app`)
2. Click **ACTIVATE SYSTEM**
3. Select **🌊 FLOOD** as the emergency type
4. Click **⚡ ANALYZE EMERGENCY**
5. If the danger banner shows **✦ GEMMA 4 AI**, the API is connected and working
6. If it shows **📴 OFFLINE**, check that `GEMMA_API_KEY` is set correctly and redeploy

---

## 🖥️ Running Locally (Without API)

You can open VoiceMap directly in your browser without any server setup. The app will run in **offline mode** using the built-in emergency database.

```bash
# Just open the file
open index.html
# or
double-click index.html
```

> **Note:** Local mode does not connect to Gemma 4 AI because the API key cannot be safely used in a plain browser file. All core features including vibration, voice synthesis, multilingual support, and the simulate alert demo work fully in local mode.

To run locally **with** the Netlify function:

```bash
npm install -g netlify-cli
netlify dev
# Opens at http://localhost:8888
```

Then set your key in a local `.env` file:

```
GEMMA_API_KEY=your_key_here
```

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Pure HTML5, CSS3, JavaScript (ES2020) — no frameworks |
| AI Model | Gemma 4 (`gemma-4-31b-it`) via Google AI Studio |
| Backend | Netlify Serverless Functions (Node.js) |
| Vibration | Web Vibration API (`navigator.vibrate`) |
| Voice | Web Speech Synthesis API (`speechSynthesis`) |
| Animation | Canvas API + `requestAnimationFrame` |
| Fonts | Google Fonts — Bebas Neue, Rajdhani, JetBrains Mono |
| Deployment | Netlify (CDN + Functions) |

---

## 📱 How to Use

1. **Open the app** at [voicemap.netlify.app](https://voicemap.netlify.app) on any smartphone or desktop browser
2. **Tap SIMULATE GOVERNMENT ALERT** to see an incoming emergency alert (demo), or select a disaster type manually
3. **Choose your profile** — Adult, Elderly, Child, or Group
4. **Select a language** — the AI will output instructions in your chosen language
5. **Enter a caregiver phone number** (optional) to enable SMS alerts
6. **Tap ANALYZE EMERGENCY** — watch Gemma 4 process the alert in real time
7. **Follow the vibration instructions** — tap any card to feel that instruction, or tap TRANSMIT ALL for the full sequence
8. **Send the caregiver SMS** with one tap if a phone number was entered

---

## 🏆 Hackathon

VoiceMap was built for the **Gemma 4 Good Hackathon** hosted by Google DeepMind on Kaggle (April–May 2026).

**Prize tracks targeted:**
- 🥇 Main Track — Best overall impact and technical execution
- 🌍 Global Resilience — Offline-capable disaster emergency system
- 🌐 Digital Equity & Inclusivity — Multilingual, disability-focused technology

**Why VoiceMap stands out:**
- Solves a real, underserved, life-critical problem
- Uses Gemma 4 as a genuine AI decision engine — not just text summarization
- Works fully offline on any cheap smartphone
- Supports 12 languages including Bengali and Hindi
- Unique interaction model: AI communicating through touch

---

## 🤝 Contributing

Contributions are welcome and appreciated. Here are some ways you can help:

- 🐛 **Report bugs** by opening a GitHub Issue
- 🌐 **Add new languages** to the voice code map in `index.html`
- 📳 **Improve vibration patterns** for better tactile communication
- ♿ **Improve accessibility** for other disability categories
- 📖 **Translate the UI** into additional languages

To contribute:

```bash
git fork https://github.com/sahidahammed11/voicemap.git
git checkout -b feature/your-feature-name
# Make your changes
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 sahidahammed11

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

See the full [LICENSE](./LICENSE) file for details.

This open-source license means you are free to use, copy, modify, distribute, and build upon VoiceMap for any purpose — including commercial use — as long as the original copyright notice is preserved.

---

## 🙏 Acknowledgements

- **Google DeepMind** — for creating Gemma 4 and hosting the hackathon
- **Google AI Studio** — for providing free API access to Gemma models
- **Netlify** — for free serverless function hosting
- **The deaf-blind community** — whose daily reality inspired every design decision

---

<div align="center">

**🌐 Live Demo → [https://voicemap.netlify.app](https://voicemap.netlify.app)**

*VoiceMap is not just an app — it is a lifeline.*
*AI that speaks through touch. No one left behind.*

</div>
