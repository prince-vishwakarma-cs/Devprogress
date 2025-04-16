# DevProgress

**DevProgress** is a comprehensive web application designed to track and visualize a developer's progress across various competitive programming platforms. It offers an intuitive interface and real-time data fetching to provide users with up-to-date statistics and insights.

## 🌐 Live Demo

Access the live application here: [devprogress.netlify.app](https://devprogress.netlify.app)

## 📁 Project Structure

```
DevProgress/
├── client/   # Frontend built with React and Tailwind CSS
└── server/   # Backend powered by Node.js and Express.js
```

## 🚀 Features

- **User Authentication**: Secure login and registration system.
- **Platform Integration**: Fetches and displays user data from platforms like LeetCode, Codeforces, CodeChef, and GeeksforGeeks.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Real-time Updates**: Utilizes APIs to provide the latest user statistics.
- **User Dashboard**: Centralized view of all platform statistics and progress.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **APIs**: Integration with third-party APIs for data fetching

## 📦 Installation

### Prerequisites

- Node.js (v14 or above)
- MongoDB instance (local or cloud-based)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/prince-vishwakarma-cs/Devprogress.git
   cd Devprogress
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the `server` directory and add the following:

   ```env
PORT=4000
MONGO_URI="your_mongodb_connection_string"
SECRET_KEY_TOKEN="your_jwt_secret"
CLOUD_NAME="your_cloudinary_cloud_name"
API_KEY="your_cloudinary_api_key"
API_SECRET="your_cloudinary_api_secret"
CLOUDINARY_FOLDER="DevProgress"
FRONTEND_URL="http://localhost:5173"

   ```

   Start the backend server:

   ```bash
   npm start
   ```

3. **Setup Frontend**

   Open a new terminal window:

   ```bash
   cd client
   npm install
   ```

   Create a `.env` file in the `client` directory and add:

   ```env
  VITE_LEET="https://leetcode-api.example.com"
VITE_SERVER="http://localhost:4000"

   ```

   Start the frontend development server:

   ```bash
   npm start
   ```

4. **Access the Application**

   Open your browser and navigate to `http://localhost:3000`

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📧 Contact

For any inquiries or feedback, please reach out to [emailaddress.prince@gmail.com].
