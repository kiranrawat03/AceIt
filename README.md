# AceIt - AI Interview Coach 🎯

AceIt is a high-performance, frontend-only **AI Interview Simulator** built with React. It provides a realistic, stress-free environment for candidates to practice technical and behavioral interviews.

## ✨ Features

- **🤖 Intelligent Simulation**:  
  - Simulates a real interviewer with context-aware typing delays (1.5s).
  - Provides instant feedback formatting using Markdown.

- **🎙️ Voice Mode**:
  - **Speech-to-Text**: Speak your answers directly using the microphone.
  - **Text-to-Speech**: Hear the AI read questions aloud.

- **📚 Diverse Templates**:
  - **Frontend Developer**: React, CSS, and Performance questions.
  - **Backend Engineer**: API design, databases, and scaling.
  - **System Design**: Architecture challenges (e.g., Design Bit.ly).
  - **Behavioral**: STAR method practice.
  - **Product Manager**: Product sense and strategy.
  - **Marketing Manager**: GTM and growth strategy.

- **⏱️ Response Timer**:  
  - Automatically tracks your answer duration to help you master the "2-minute rule".

- **💾 Persistent Sessions**:
  - Your progress is saved automatically to `localStorage`. Refresh without losing context.
  - **Export to HTML**: Download your chat transcript to review later.

- **🎨 Premium UI**:
  - Dark/Light mode support.
  - Smooth animations (Framer Motion).
  - Responsive design for mobile and desktop.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: CSS Modules + Global Variables (Deep Indigo/Emerald Theme)
- **State**: Context API (`ChatContext`)
- **Speech**: Web Speech API (Native browser support)
- **Icons**: Lucide React

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/kiranrawat03/AceIt.git
    cd AceIt
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit `http://localhost:5173`

## 🔮 Future Enhancements (Planned)

- [ ] PDF Result Export
- [ ] Custom Prompt Builder
- [ ] User Login / Cloud Sync

---

© 2026 AceIt Coach
