# Daily DevOps Diary 🚀

> **Master DevOps. One post at a time.**

A full-stack web app that helps DevOps content creators publish one high-quality DevOps post every day with automated topic generation, post creation, tracking, and learning analytics.

## ✨ Features

- **🎯 Daily Topic Engine** — Auto-generates unique DevOps topics (no repeats in 30 days)
- **📝 Post Generator** — Creates complete posts: hook, explanation, code, use case, CTA, hashtags
- **📋 One-Click Copy** — Instantly copy posts for LinkedIn, Twitter, or any platform
- **📅 30-Day Tracker** — Calendar view with streak, status badges, and engagement metrics
- **📊 Learning Progression** — Category-wise progress bars + overall DevOps roadmap completion
- **🔐 JWT Auth** — Secure email/password authentication
- **🐳 Docker Ready** — Full Docker Compose setup + CI/CD pipeline

## 🛠 Tech Stack

| Layer          | Technology                    |
| -------------- | ----------------------------- |
| Frontend       | React 18, Vite, TailwindCSS   |
| Backend        | Node.js, Express              |
| Database       | PostgreSQL, Sequelize ORM     |
| Auth           | JWT + bcrypt                  |
| Infrastructure | Docker, Nginx, GitHub Actions |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 15+

### Local Development

```bash
# Clone
git clone https://github.com/your-username/daily-devops-diary.git
cd daily-devops-diary

# Backend
cd server
cp .env.example .env    # Edit with your DB credentials
npm install
npm run dev             # Starts on :5000

# Frontend (new terminal)
cd client
npm install
npm run dev             # Starts on :5173
```

### Docker (Recommended)

```bash
docker-compose up --build
# Frontend: http://localhost
# API: http://localhost:5000
```

## 📁 Project Structure

```
daily-devops-diary/
├── server/                 # Express API
│   ├── config/             # Database config
│   ├── middleware/          # JWT auth middleware
│   ├── models/             # Sequelize models
│   ├── routes/             # API route handlers
│   ├── seeds/              # Topic seed data (64 topics)
│   ├── services/           # Post generator engine
│   └── index.js            # Server entry point
├── client/                 # React SPA
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth context
│   │   ├── pages/          # Route pages
│   │   └── utils/          # API client
│   └── index.html
├── docker-compose.yml
├── Dockerfile.server
├── Dockerfile.client
└── .github/workflows/ci-cd.yml
```

## 📌 API Endpoints

| Method  | Endpoint                | Description              |
| ------- | ----------------------- | ------------------------ |
| POST    | `/api/auth/register`    | Register                 |
| POST    | `/api/auth/login`       | Login                    |
| GET/PUT | `/api/profile`          | User profile             |
| GET     | `/api/topics/daily`     | Today's topic            |
| POST    | `/api/posts/generate`   | Generate post            |
| GET     | `/api/posts`            | List posts               |
| PUT     | `/api/posts/:id`        | Update status/engagement |
| GET     | `/api/tracker/calendar` | 30-day calendar          |
| GET     | `/api/progress`         | Learning stats           |

## 🎯 Goal

Turn a DevOps learner into a consistent, visible, and credible DevOps content creator within **90 days**.

---

Built with 💚 for the DevOps community.
