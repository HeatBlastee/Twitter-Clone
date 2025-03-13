# Twitter Clone (MERN Stack)

## 🚀 Introduction
This is a full-stack Twitter clone built using the **MERN (MongoDB, Express, React, Node.js) stack**. It allows users to sign up, post tweets, like and retweet posts, follow other users, and engage in real-time interactions.

## 🛠 Tech Stack
- **Frontend:** React, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token), bcrypt
- **Storage:** Cloudinary (for profile images)
- **Deployment:** Render / Vercel / Netlify

## ✨ Features
- 🔐 User Authentication (Signup, Login, Logout)
- 📝 Create, Edit, and Delete Tweets
- ❤️ Like and Retweet Tweets
- 👥 Follow/Unfollow Users
- 🏠 User Profile with Bio and Posts
- 📸 Profile & Cover Image Upload
- 🔎 Search Users and Tweets
- 📩 Real-time Notifications & Messages (Optional via Socket.IO)

## 📂 Folder Structure
```
📦 twitter-clone
├── 📂 client  # React frontend
│   ├── src
│   │   ├── components  # Reusable UI components
│   │   ├── pages       # App pages
│   │   ├── store       # Redux store setup
│   │   ├── api         # API calls
│   │   ├── utils       # Utility functions
│   │   ├── assets      # Images, icons, styles
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│
├── 📂 server  # Node.js backend
│   ├── models  # Mongoose models
│   ├── routes  # Express routes
│   ├── controllers  # Route handlers
│   ├── middleware  # Auth & error handling
│   ├── config  # Database & env setup
│   ├── utils  # Helper functions
│   ├── index.js  # Server entry point
│   ├── package.json
│
├── .gitignore
├── README.md
```

## 🛠 Installation
### 1️⃣ Clone the repository
```sh
git clone https://github.com/yourusername/twitter-clone.git
cd twitter-clone
```

### 2️⃣ Set up the backend (server)
```sh
cd server
npm install
```
Create a `.env` file in the **server** folder and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Run the backend:
```sh
npm start
```

### 3️⃣ Set up the frontend (client)
```sh
cd ../client
npm install
npm run dev
```

## 🚀 Usage
1. Visit `http://localhost:5173` for the frontend.
2. Register or log in to your account.
3. Create, like, and retweet posts.
4. Follow users and update your profile.

## 🔗 API Endpoints
| Method | Endpoint          | Description           |
|--------|------------------|-----------------------|
| POST   | `/api/auth/signup`  | Register a new user  |
| POST   | `/api/auth/login`   | Login user          |
| GET    | `/api/tweets`       | Fetch all tweets    |
| POST   | `/api/tweets`       | Create a tweet      |
| PUT    | `/api/tweets/:id/like` | Like a tweet  |
| POST   | `/api/users/:id/follow` | Follow a user |

## 📦 Deployment
- **Frontend:** Deploy on **Vercel/Netlify**
- **Backend:** Deploy on **Render/VPS**
- **Database:** MongoDB Atlas

## 🤝 Contributing
Feel free to open issues and submit pull requests! 🚀


---
Made with ❤️ by Mann Patel

