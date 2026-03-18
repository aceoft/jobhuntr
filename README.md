# JobHuntr

A lightweight job application tracker built with the MERN stack.

JobHuntr helps you track companies, applications, and your progress through the hiring pipeline without the overhead of spreadsheets or bloated tools.

---

## ✨ Features (Current)

- View list of companies
- Backend API with Express + MongoDB
- Clean service-layer architecture
- React frontend with Vite

---

## 🚧 Planned Features

- Create and manage companies
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
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/jobhuntr.git
cd jobhuntr
```

---

### 2. Setup the server

```bash
cd server
npm install
```

Create a `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/jobhuntr
```

Start the server:

```bash
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
npm install
npm run dev
```

Client runs on:

```
http://localhost:5173 (or next available port)
```

---

## 🔌 API

### Get Companies

```
GET /api/companies
```

Returns:

```json
[
	{
		"_id": "...",
		"name": "Microsoft",
		"careersUrl": "https://careers.microsoft.com/...",
		"active": true
	}
]
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

- [ ] Add create/edit company UI
- [ ] Add applications collection + API
- [ ] Dashboard view
- [ ] Search and filtering
- [ ] Authentication (optional)

---

## 🤝 Contributing

This is currently a personal project, but ideas and feedback are always welcome.

---

## 📄 License

TBD
