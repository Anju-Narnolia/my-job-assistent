# AI Job Assistant Chat Bot

A sophisticated full-stack AI chat application designed to assist with job applications, HR screenings, and technical interviews. The application features a personalized AI assistant that represents Anju Narnolia, a Computer Science student, and provides intelligent responses based on her profile, experience, and achievements.

## 🚀 Features

### Core Functionality
- **Multi-AI Provider Support**: Switch between Google Gemini, OpenAI GPT, DeepSeek AI, and Claude AI
- **Date-based Chat History**: Organize conversations by date with intuitive navigation
- **Real-time Messaging**: Instant AI responses with markdown support
- **User Authentication**: Secure login/register system with JWT tokens
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Toggle between themes with persistent preferences

### Advanced Features
- **Smart Date Navigation**: Auto-loads today's messages, shows "Today", "Yesterday", etc.
- **Message Persistence**: All conversations are saved and retrievable by date
- **Animated UI**: Smooth transitions and hover effects using Framer Motion
- **Loading States**: Visual feedback during AI processing and data fetching
- **Error Handling**: Graceful error management with user-friendly messages

## 🏗️ Architecture

### Frontend (React + Vite)
- **React 19** with modern hooks and functional components
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Markdown** for rich text rendering

### Backend (Node.js + Express)
- **Express.js** REST API server
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests

### AI Integration
- **Google Gemini** (Gemini 1.5 Flash)
- **OpenAI** (GPT-4o-mini)
- **DeepSeek AI**
- **Anthropic Claude**

## 📁 Project Structure

```
my-job-assistent/
├── backend/
│   ├── assistant/           # AI provider implementations
│   │   ├── googleai.js     # Google Gemini integration
│   │   ├── openai.js       # OpenAI integration
│   │   ├── deepseekai.js  # DeepSeek AI integration
│   │   └── claudeai.js     # Claude AI integration
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   ├── userController.js  # User authentication
│   │   └── chatController.js # Chat management
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── models/
│   │   ├── user.js         # User schema
│   │   └── chat.js         # Chat/message schema
│   ├── routes/
│   │   ├── useroute.js     # User routes
│   │   ├── chatRoutes.js   # Chat routes
│   │   └── aiRoutes.js     # AI provider routes
│   ├── prompt.js           # System prompt configuration
│   └── server.js          # Express server setup
├── client/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Chat.jsx    # Main chat interface
│   │   │   ├── Dashboard.jsx # Main dashboard
│   │   │   ├── Sidebar.jsx  # Navigation sidebar
│   │   │   └── sidebar-context.js # Sidebar context
│   │   ├── page/
│   │   │   ├── Demo.jsx    # Main chat page
│   │   │   ├── Login.jsx   # Login page
│   │   │   └── Register.jsx # Registration page
│   │   ├── redux/
│   │   │   ├── authSlice.js # Authentication state
│   │   │   └── store.js    # Redux store
│   │   ├── loader/
│   │   │   └── Loader.jsx  # Loading component
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- API keys for AI providers (optional, defaults available)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   PORT=5000
   Mongo_DB_URI=mongodb://localhost:27017
   JWT_Tokens=your_jwt_secret_key
   
   # AI Provider API Keys (optional)
   VITE_GOGGLE_AI_API_KEY=your_google_ai_key
   VITE_OPEN_AI_API_KEY=your_openai_key
   VITE_DEEPSEEK_API_KEY=your_deepseek_key
   VITE_CLAUDE_API_KEY=your_claude_key
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Usage

### Getting Started
1. **Register/Login**: Create an account or login with existing credentials
2. **Select AI Provider**: Choose from Google Gemini, OpenAI, DeepSeek, or Claude
3. **Start Chatting**: Begin conversations with the AI assistant
4. **Navigate History**: Use the sidebar to switch between different dates
5. **Toggle Theme**: Switch between light and dark modes

### Key Features Usage

#### Date-based Navigation
- **Today's Messages**: Automatically loads current date conversations
- **Historical Chats**: Click on any date in sidebar to view past conversations
- **Smart Formatting**: Dates display as "Today", "Yesterday", "Dec 15", etc.

#### AI Provider Switching
- **Real-time Switching**: Change AI providers without losing conversation context
- **Provider-specific Responses**: Each AI has unique response styles and capabilities
- **Fallback Handling**: Graceful error handling if a provider is unavailable

#### Message Management
- **Auto-scroll**: Messages automatically scroll to show latest content
- **Markdown Support**: Rich text formatting in AI responses
- **Message Persistence**: All conversations saved by date
- **Loading Indicators**: Visual feedback during AI processing

## 🔧 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/getuser` - Get user profile

### Chat Management
- `POST /api/chat/save` - Save a message
- `GET /api/chat/dates/:userId` - Get all chat dates for user
- `GET /api/chat/:userId/:date` - Get messages for specific date

### AI Integration
- `POST /api/ai/chat` - Send message to AI provider

## 🎨 UI Components

### Main Components
- **Dashboard**: Main interface with provider selection and theme toggle
- **Chat**: Message display with markdown rendering and auto-scroll
- **Sidebar**: Date navigation with animated transitions
- **Login/Register**: Authentication forms with validation

### Design Features
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: Framer Motion powered transitions
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **CORS Protection**: Configured for secure cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Secure error messages without sensitive data exposure

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB instance
2. Configure environment variables in production
3. Deploy to platforms like Heroku, Railway, or DigitalOcean
4. Ensure CORS is configured for your frontend domain

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages
3. Configure environment variables for API endpoints
4. Update CORS settings in backend if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Anju Narnolia**
- Portfolio: [anju-narnolia.netlify.app](https://anju-narnolia.netlify.app/)
- LinkedIn: [linkedin.com/in/anju-narnolia](https://www.linkedin.com/in/anju-narnolia-/)
- GitHub: [github.com/Anju-Narnolia](https://github.com/Anju-Narnolia)

## 🙏 Acknowledgments

- AI providers: Google, OpenAI, DeepSeek, Anthropic
- UI libraries: React, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js, MongoDB
- Icons: Tabler Icons

---

**Note**: This application is designed as a job assistance tool and represents the professional profile of Anju Narnolia. The AI responses are tailored to provide relevant information for job applications, HR screenings, and technical interviews.
