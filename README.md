# Micro_Frontend_Chat_Email - Proof of Concept with React and Vite 🚀

This project demonstrates a **Micro-Frontend Architecture** using React and Vite. It consists of three applications:

- **Host Application** 🏠: Main wrapper that integrates all micro-frontends.
- **Chat Application** 💬: A standalone React application for chat functionality.
- **Email Application** 📧: A standalone React application for email functionality.

The goal of this Proof of Concept (POC) is to show how micro-frontends can be integrated in a scalable and maintainable way using **React**, **Vite**, and **Concurrently** for development.

## Table of Contents 📑

- [Installation](#installation)
- [Scripts](#scripts)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)

## Installation 📥

To set up the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sohit-mishra/Micro_Frontend_Chat_Email.git
   cd Micro_Frontend_Chat_Email
   ```

## 2. Install all dependencies for the root project and sub-applications 📥

Run the following command to install dependencies for the **root project** and all **micro-frontends** (`Host_Main`, `Remote_Chat`, `Remote_Email`):

```bash
npm run install-all
```

## Scripts 🛠️

This project includes a few useful scripts to make development and deployment easier:

### `npm run install-all` 📦

This command installs dependencies for the **root project** and all the micro-frontends:

- `Host_Main` 🏠
- `Remote_Chat` 💬
- `Remote_Email` 📧

## Environment Variables 🌱

To configure the environment variables for each micro-frontend, you need to set the following in their respective `.env` files.

### Remote Chat 🗨️ (in the `.env` file in the `Remote_Chat` directory)

Create a `.env` file in the `Remote_Chat` directory with the following content:
I am Using Talk js 

```env
VITE_TALKJS_APP_ID=YOUR_TALKJS_APP_ID
VITE_TALKJS_CONVERSATION_ID=YOUR_CONVERSATION_ID
VITE_TALKJS_USER_ID=YOUR_USER_ID
VITE_TALKJS_AUTH_TOKEN=YOUR_AUTH_TOKEN
```

### Remote Email 📧 (in the `.env` file in the `Remote_Email` directory)

Create a `.env` file in the `Remote_Email` directory with the following content:
```
VITE_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_USER_ID=YOUR_EMAILJS_USER_ID
```

### `npm start` ▶️

This command starts all the applications in **development mode** using Vite. It runs the following concurrently:

- Host Application (`Host_Main`) 🏠
- Chat Application (`Remote_Chat`) 💬
- Email Application (`Remote_Email`) 📧

### `npm run dev` 💻🔄

This script is triggered by `npm start` and runs all three applications in **development mode** using `concurrently`.

## Development 💡

Once you've installed the dependencies, run the following command to start the development server for all applications:

```bash
npm start
```

This will launch all micro-frontends (`Host_Main`, `Remote_Chat`, `Remote_Email`) in parallel, each running their own Vite server. 🚀

You can now access the applications at their respective URLs:

- `Host_Main` 🏠: `http://localhost:5000` (or the port Vite assigns)
- `Remote_Chat` 💬: `http://localhost:5001`
- `Remote_Email` 📧: `http://localhost:5002`


This will generate **production-ready builds** for the **Host Application** (`Host_Main`), **Chat Application** (`Remote_Chat`), and **Email Application** (`Remote_Email`). ⚡📦

## Technologies Used ⚙️

- **React** ⚛️: JavaScript library for building user interfaces.
- **Vite** ⚡: Next-generation, fast, and lightweight build tool for frontend development.
- **Concurrently** 🔄: A Node.js package that helps you run multiple commands concurrently.
- **Webpack (optional)** 🛠️: You may choose to use this for additional configurations.
- **TalkJS** 💬: A real-time chat API for building chat functionalities.
- **EmailJS** 📧: A service for sending emails via JavaScript.

## 🤝 Like This Project? Connect With Me!

If you like this project and want to create more Telegram bots, feel free to connect with me on LinkedIn:  
🔗 [Your LinkedIn Profile](https://www.linkedin.com/in/sohitmishra/) 💼
