# LearnFlow - An AI-Powered Learning Platform

This project is a full-stack platform that enables users to learn new subjects through interaction with an AI model. Users can select categories and sub-categories, send prompts, and receive tailored lessons in return. The system saves each user's learning history and also includes a dashboard for general platform administration.

---

## 📁 Project Structure

The project follows a standard full-stack architecture for maintainability and scalability.  

- **Backend:** .NET application utilizing a 3-Layer Architecture (API, Business Logic, Data Access)  
- **Frontend:** Component-based React application using Redux for state management and a dedicated service for handling API communication  

This structure ensures the application is well-organized and robust.

---

## 🛠️ Technologies Used

### 🔙 Backend
- **Language:** C# on .NET 8  
- **Architecture:** 3-Layer Architecture (API, BL, DAL)  
- **Database:** SQL Server (via Entity Framework Core)  
- **AI Communication:** OpenAI API  
- **Dependency Management:** NuGet  

### 🔜 Frontend
- **Framework:** React 19  
- **State Management:** Redux Toolkit  
- **UI Library:** Material-UI (MUI)  
- **Styling:** Styled Components & CSS Modules  
- **Routing:** React Router  
- **Server Communication:** fetch API (via Redux Thunk)  
- **Build Tool:** Vite  

---

## ⚙️ Setup Instructions

### 📌 Prerequisites
- .NET 8 SDK  
- Node.js (version 18 or higher)  
- SQL Server LocalDB (typically installed with Visual Studio)  

### 🔧 Installation

#### Backend:
1. Open the solution file:  
   `backend/Learning_Platform/Learning_Platform.sln` in Visual Studio.
2. Restore NuGet packages (if not restored automatically):  
   ```bash
   dotnet restore
   ```

#### Frontend:
1. In a separate terminal, navigate to the frontend directory:  
   ```bash
   cd frontend
   ```
2. Install npm packages:  
   ```bash
   npm install
   ```

---

## 🧪 Sample `.env` / Configuration

Configuration is managed in the backend using the `appsettings.json` file.

### 🔐 Example `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "AdminPassword": "123456789",
  "OpenAI": {
    "ApiKey": "sk-proj-YOUR-API-KEY-HERE"
  },
  "ConnectionStrings": {
    "LearningPlatform": "Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\YOUR\PATH\TO\backend\Learning_Platform\Dal\database\LearningPlatformData.mdf;Integrated Security=True;Timeout=30"
  }
}
```

### 📝 Configuration Notes:
1. **`AdminPassword`**: Replace with a strong, secret password.  
2. **`OpenAI.ApiKey`**: Replace with your actual OpenAI API key.  
3. **`ConnectionStrings.LearningPlatform`**: Update with the **absolute path** to your local `.mdf` file.

---

## 🚀 How to Run Locally

### ▶️ Running the Backend Server
- **Via Visual Studio:**  
  Open the solution and press `F5`.

- **Via Terminal:**  
  Navigate to the API project directory:  
  ```bash
  cd backend/Learning_Platform/Learning_Platform
  dotnet run
  ```

  Server runs on:
  - `http://localhost:5091`
  - `https://localhost:7240`

---

### ▶️ Running the Frontend Application
1. Ensure that `src/api.js` points to: `http://localhost:5091`
2. Navigate to the frontend directory:  
   ```bash
   cd frontend
   ```
3. Start the development server:  
   ```bash
   npm run dev
   ```
4. Open the browser at the shown address (usually `http://localhost:5173`)

---

## 📌 Assumptions Made

- The app is intended for **educational/demonstration** use.  
- Uses **SQL Server LocalDB** locally.  
- The `AdminPassword` should be changed before production use.  
- The OpenAI API key is a placeholder and must be replaced.

---

✅ **Enjoy using LearnFlow!**
