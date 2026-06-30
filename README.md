# Safe Surfing System for Kids 👶🌐

A kid-friendly safe search platform that filters out inappropriate, explicit, and violent content to provide a secure online experience for children.

---

## 🚀 Features

- Blocks explicit and adult content from search results
- Blurs NSFW or violent images
- Frontend and backend integrated using Node.js, Express, and HTML/CSS/JS
- Safe Search powered by content filtering and moderation

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/safe-surfing-system.git
cd safe-surfing-system

#2.Install dependencies
npm install

#3.Create a .env file
You must create your own .env file in the root directory with the following variables:
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
MONGODB_URI=your_mongodb_connection_string

#4. Start the server
npm start

Or, if you're using nodemon:
Copy code
npx nodemon server.js

#project structure
safe-surfing-system/
│
├── public/              # Static assets (CSS, JS, Images)
├── views/               # HTML Templates (EJS or static HTML)
├── routes/              # Route handling (if any)
├── server.js            # Main backend logic
├── .env                 # (Should NOT be committed)
├── .gitignore
└── package.json

🧠 How It Works
Filters search queries through a blocklist and OpenAI moderation API

Uses image analysis to detect and blur NSFW/violent content

Designed with safety and speed in mind for child users


🛡️ Security & Safety
No explicit words are stored in source code

.env protects sensitive API keys

Kid-safe and privacy-respecting filtering logic
