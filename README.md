# 💰 MoneyManager

A full-stack personal finance management web application built with **Spring Boot** (backend) and **React + Vite** (frontend). Track your income, expenses, and categories with real-time charts, Excel exports, and email reports — all behind a secure JWT-based authentication system.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure Sign Up / Sign In with JWT tokens and Spring Security |
| 📊 **Dashboard** | Real-time overview — total balance, income, expenses + recent transactions |
| 💵 **Income Management** | Add, view, delete income entries with category linking |
| 💸 **Expense Management** | Add, view, delete expense entries with category linking |
| 🏷️ **Custom Categories** | Create emoji-tagged categories (income/expense type) |
| 🔍 **Advanced Filtering** | Filter transactions by date range and category |
| 📈 **Visual Charts** | Pie & line charts powered by Recharts |
| 📥 **Excel Export** | Download income/expense reports as `.xlsx` files |
| 📧 **Email Reports** | Send income/expense summaries directly to your email |
| 👤 **Profile Management** | Profile photo upload and user details |

---

## 🛠️ Tech Stack

### 🔙 Backend
| Technology | Purpose |
|---|---|
| **Spring Boot 4** | Core framework (Java 21) |
| **Spring Security** | Authentication & authorization |
| **JWT (JJWT 0.11.5)** | Stateless token-based auth |
| **Spring Data JPA** | ORM & database layer |
| **MySQL** | Relational database |
| **Apache POI** | Excel report generation |
| **Spring Mail** | Email report delivery |
| **Lombok** | Reduces boilerplate code |
| **Maven** | Build & dependency management |
| **Docker** | Containerization support |

### 🔜 Frontend
| Technology | Purpose |
|---|---|
| **React 18 + Vite** | UI framework & build tool |
| **TailwindCSS v4** | Utility-first styling |
| **React Router DOM** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Recharts** | Data visualization (charts) |
| **Lucide React** | Icon library |
| **React Hot Toast** | Notifications/toasts |
| **Emoji Picker React** | Emoji selector for categories |
| **Moment.js** | Date formatting |
| **Google Fonts (Outfit)** | Premium typography |

---

## 📁 Project Structure

```
moneymanager/
├── src/                              # Spring Boot backend
│   └── main/java/com/shantanu/moneymanager/
│       ├── config/                   # Security configuration (CORS, filters)
│       ├── controller/               # REST API controllers
│       │   ├── AuthController        # /auth/login, /auth/signup
│       │   ├── DashboardController   # /dashboard
│       │   ├── IncomeController      # /income CRUD + export
│       │   ├── ExpenseController     # /expense CRUD + export
│       │   ├── CategoryController    # /category CRUD
│       │   ├── FilterController      # /filter by date/category
│       │   ├── HealthController      # /health check
│       │   └── ProfileController     # /profile management
│       ├── dto/                      # Data Transfer Objects
│       ├── entity/                   # JPA entities (User, Income, Expense, Category, Profile)
│       ├── repository/               # Spring Data JPA repositories
│       ├── security/                 # JWT filter & token utility
│       └── service/                  # Business logic layer
│
├── moneymanagerwebapp/               # React + Vite frontend
│   └── src/
│       ├── pages/                    # Route-level page components
│       │   ├── Login.jsx             # Sign-in page
│       │   ├── Signup.jsx            # Registration page
│       │   ├── Home.jsx              # Dashboard page
│       │   ├── income.jsx            # Income management
│       │   ├── Expense.jsx           # Expense management
│       │   ├── Category.jsx          # Category management
│       │   └── Filter.jsx            # Transaction filters
│       ├── components/               # Reusable UI components
│       │   ├── Sidebar.jsx           # Navigation sidebar
│       │   ├── MenuBar.jsx           # Top navigation bar
│       │   ├── Dashboard.jsx         # Layout wrapper
│       │   ├── InfoCard.jsx          # Balance/income/expense summary cards
│       │   ├── Modal.jsx             # Reusable modal wrapper
│       │   ├── IncomeList/ExpenseList # Transaction lists with actions
│       │   ├── AddIncomeForm/...     # Add transaction forms
│       │   ├── CustomPieChart.jsx    # Pie chart component
│       │   ├── RecentTransactions.jsx# Recent activity widget
│       │   ├── FinanceOverView.jsx   # Finance summary chart
│       │   ├── DeleteAlert.jsx       # Delete confirmation dialog
│       │   ├── EmojiPickerPopup.jsx  # Emoji picker for categories
│       │   └── TransactionInfoCard.jsx # Individual transaction card
│       ├── context/                  # React Context (AppContext for global state)
│       ├── hooks/                    # Custom hooks (useUser for auth guard)
│       ├── Util/                     # Utilities
│       │   ├── axiosConfig.jsx       # Axios instance with auth interceptors
│       │   ├── apiEndpoints.js       # Centralized API URL constants
│       │   ├── validation.js         # Form validation helpers
│       │   └── util.js               # Number formatting (thousand separator)
│       └── assets/                   # Static assets & sidebar config
│
├── pom.xml                           # Maven build config
├── Dockerfile                        # Docker container definition
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- **Java 21** (JDK)
- **Node.js 18+** & npm
- **MySQL 8+** database
- **Maven 3.8+**

---

### 🔙 Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/priyanshukrr/moneymanager.git
   cd moneymanager
   ```

2. **Configure the database**

   Create a MySQL database:
   ```sql
   CREATE DATABASE moneymanager;
   ```

   Update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/moneymanager
   spring.datasource.username=YOUR_DB_USERNAME
   spring.datasource.password=YOUR_DB_PASSWORD

   # JWT Secret
   jwt.secret=YOUR_SUPER_SECRET_KEY

   # Email (for report delivery)
   spring.mail.host=smtp.gmail.com
   spring.mail.port=465
   spring.mail.username=YOUR_EMAIL@gmail.com
   spring.mail.password=YOUR_APP_PASSWORD
   spring.mail.properties.mail.smtp.ssl.enable=true
   ```

3. **Run the backend**
   ```bash
   ./mvnw spring-boot:run
   ```
   The API will be available at `http://localhost:8080`

---

### 🔜 Frontend Setup

1. **Navigate to the webapp directory**
   ```bash
   cd moneymanagerwebapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

---

### 🐳 Docker (Optional)

Build and run the backend in Docker:
```bash
docker build -t moneymanager .
docker run -p 8080:8080 moneymanager
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/signup` | Register new user | ❌ |
| `POST` | `/auth/login` | Login & get JWT token | ❌ |
| `GET` | `/dashboard` | Dashboard summary data | ✅ |
| `GET` | `/income` | Get all incomes | ✅ |
| `POST` | `/income` | Add new income | ✅ |
| `DELETE` | `/income/{id}` | Delete income | ✅ |
| `GET` | `/income/download` | Download as Excel | ✅ |
| `GET` | `/income/email` | Send income to email | ✅ |
| `GET` | `/expense` | Get all expenses | ✅ |
| `POST` | `/expense` | Add new expense | ✅ |
| `DELETE` | `/expense/{id}` | Delete expense | ✅ |
| `GET` | `/expense/download` | Download as Excel | ✅ |
| `GET` | `/expense/email` | Send expense to email | ✅ |
| `GET` | `/category` | Get all categories | ✅ |
| `POST` | `/category` | Create new category | ✅ |
| `DELETE` | `/category/{id}` | Delete category | ✅ |
| `GET` | `/category/{type}` | Get by type (income/expense) | ✅ |
| `POST` | `/filter` | Filter transactions by date/category | ✅ |
| `GET` | `/profile` | Get user profile | ✅ |
| `PUT` | `/profile` | Update profile | ✅ |

> **Auth**: Pass `Authorization: Bearer <token>` header for protected routes.

---

## 🎨 UI/UX Design Highlights

- **Dark-mode glassmorphism** on login/signup pages
- **Indigo-purple gradient** design system throughout
- **Outfit font** for premium typography
- **Smooth hover animations** and active state transitions
- **Responsive layout** with sidebar on desktop, menu bar on mobile
- **Real-time toast notifications** for all actions
- **Pie charts** for finance distribution overview
- **Line charts** for income/expense trends over time
- **Emoji-tagged categories** for visual categorization

---

## 🗺️ Application Flow

```
User → Login/Signup (JWT issued)
         ↓
    Dashboard (balance, charts, recent transactions)
         ↓
    Income / Expense pages (CRUD + download + email)
         ↓
    Categories (create custom income/expense categories)
         ↓
    Filter (search transactions by date & category)
```

---

## 🔒 Security

- **JWT stateless authentication** — no server-side sessions
- **Spring Security filter chain** — every protected route validates JWT
- **Password hashing** — BCrypt encoder
- **CORS configured** — only allowed origins can access the API
- **Input validation** — both client-side and server-side

---

## 📧 Email & Export

- **Excel Export**: Uses Apache POI to generate `.xlsx` reports for income and expense data
- **Email Reports**: Sends formatted Excel reports to the user's registered email via SMTP (Gmail supported)

---


