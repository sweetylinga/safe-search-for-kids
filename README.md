# 🔍 Safe Search for Kids

A kid-friendly search platform that filters inappropriate content and provides safe educational resources for children.

## 🌐 Live Demo

https://safe-search-api.onrender.com

---

## ✨ Features

- 🛡️ AI-powered content moderation using OpenAI
- 👶 Safe search experience designed for children
- 🚫 Blocks inappropriate, explicit and harmful searches
- 📚 Returns educational resources for approved topics
- 🖼️ Displays kid-friendly images
- 🌍 Responsive web interface
- ⚡ Fast Express.js backend

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### APIs
- OpenAI Moderation API

### Deployment
- Render

---

## 📂 Project Structure

```
safe-search-for-kids/
│
├── public/
│   ├── images/
│   ├── index.html
│   ├── script.js
│   └── css/
│
├── server/
│   ├── app.js
│   └── safety-check.js
│
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/sweetylinga/safe-search-for-kids.git
```

### Install Dependencies

```bash
npm install
```

### Create .env

```env
OPENAI_API_KEY=your_openai_api_key
PORT=4000
```

### Run Project

```bash
npm start
```

Open:

```
http://localhost:4000
```

---

## 🔒 How it Works

1. User enters a search query.
2. Backend validates the request.
3. OpenAI Moderation API checks whether the query is safe.
4. If unsafe, the content is blocked.
5. If safe and available in the educational dataset, the application returns a kid-friendly educational resource.
6. Otherwise, the application informs the user that the page is under construction.

---

## 📸 Screenshots

### Home Page

- Search interface
- Kid-friendly design

### Search Result

- Educational image
- Safe website link

### Blocked Content

- Displays a blocked content warning for inappropriate searches.

---

## 📌 Future Enhancements

- Google Custom Search integration
- Voice Search
- Category filtering
- Search history
- Parent Dashboard
- User Authentication
- AI-generated educational summaries
- Multi-language support

---

## 👩‍💻 Author

**Linga Srilaxmi**

GitHub:
https://github.com/sweetylinga

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub!
