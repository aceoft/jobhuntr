# JobHuntr

A lightweight job application tracker built with the MERN stack.

JobHuntr helps you track companies, applications, and your progress through the hiring pipeline.

I'm building this project to get exposure to a new stack to broaden my skillset as I search for a new job.

It is a work in progress, so there will be unfinished sections and rough edges.

---

## ✨ Features (Current)

- View list of companies
- Create new companies
- Create outreach on companies
- Create outreach events/thread
- Backend API with Express + MongoDB
- Clean service-layer architecture
- React frontend with Vite

---

## 🚧 Planned Features

- Track job applications per company
- Application status pipeline (Saved → Applied → Interview → Offer → Rejected)
- Interview tracking
- Follow-up reminders
- Notes and activity history

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript

---

## 📁 Project Structure

```
jobhuntr/
├── client/        # React frontend
├── server/        # Express + Mongo backend
├── shared/        # Common typescript that can be shared between client/server
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/aceoft/jobhuntr.git
cd jobhuntr
```

---

### 2. Install npm packages

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URI_DEV=mongodb://localhost:27017/jobhuntr
MONGO_URI_PROD=mongodb://localhost:27017/jobhuntr
```

Build the shared package:

```bash
cd shared
npm run build
```

Start the server:

```bash
cd server
npm run dev
```

Server runs on:

```
http://localhost:3000
```

---

### 3. Setup the client

```bash
cd client
npm run dev
```

Client runs on:

```
http://localhost:5173 (or next available port)
```

---

## 🧠 Design Notes

- Uses a service layer to encapsulate business logic
- MongoDB documents are modeled using a hybrid approach:
  - Separate collections for shared entities (e.g. companies)
  - Embedded data for application-specific details (notes, status history, interviews)
- Keeps architecture intentionally lightweight to avoid premature complexity

---

## 🧪 Testing (Planned)

- Service-layer integration tests using a disposable MongoDB instance
- Likely using mongodb-memory-server or Testcontainers

---

## 📌 Roadmap

- [ ] Dashboard view
- [ ] Search and filtering

---

## 🤝 Contributing

This is currently a personal project, but ideas and feedback are always welcome.

---

## 📄 License

TBD
