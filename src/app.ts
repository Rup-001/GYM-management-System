import express from 'express';
import databse from "./config/database";
import authRoutes from "./modules/auth/auth.routes";
import scheduleRoutes from "./modules/schedule/schedule.routes";
import bookingRoutes from "./modules/booking/booking.routes";
import usersRoutes from "./modules/users/user.routes";
const app = express();
import './config/passport';
app.use(express.static('public'));

app.use(express.json());
databse()

app.use("/api/auth", authRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/users", usersRoutes);



app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gym Management System</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 2rem;
      line-height: 1.6;
      background-color: #f9f9f9;
      color: #333;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    code, pre {
      background-color: #eee;
      padding: 4px 8px;
      border-radius: 4px;
      font-family: monospace;
    }
    pre {
      white-space: pre-wrap;
      background-color: #f4f4f4;
      padding: 1rem;
      border-left: 4px solid #3498db;
    }
    a {
      color: #2980b9;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    ul {
      margin-left: 1.2rem;
    }
  </style>
</head>
<body>
  <h1>Gym Management System</h1>

  <p>The Gym Management System is a role-based class scheduling and booking platform. It allows Admins to create and manage class schedules, assign Trainers, and monitor class limits. Trainees can book available classes and manage their profiles. The system enforces booking restrictions like maximum trainees per class and prevents schedule conflicts.</p>

  <h5>If you're viewing this in a browser, welcome! If not, please open it in a web browser for the best experience and for Relational Diagram.</h5> </br>

  <h2>Technology Stack</h2>
  <ul>
    <li>Language: TypeScript</li>
    <li>Backend Framework: Express.js</li>
    <li>Database: MongoDB</li>
    <li>ODM: Mongoose</li>
    <li>Authentication: JWT</li>
    <li>Others: Bcrypt, Passport, Dotenv</li>
    <li>Architecture Pattern: Modular folder structure</li>
  </ul>

  <h2>Relational Diagram</h2>
<img src="./GYM_MANG.png" width="300" height="150">


  <h2>Pre-Created Users</h2>
  <ul>
    <li><strong>Email:</strong> trainer1@google.com 
    <li><strong>Email:</strong> trainee1@google.com
    <li><strong>Email:</strong> admin@example.com
    <li><strong>Password:</strong> 12345</li>
  </ul>

  <h2>Overview</h2>
  <p>The root route (<code>/</code>) is accessible to all users without requiring authentication. For more information, refer to the organized list of endpoints below.</p>

  <h2>API Endpoints</h2>
  <p>You can run this Gym Management System either locally or on Railway (cloud deployment):</p>

  <ul>
    <li><strong>Localhost: URL </strong> <code>http://localhost:PORT</code></li>
    <li><strong>Live API: URL </strong> <a href="https://gym-management-system-production.up.railway.app/" target="_blank">https://gym-management-system-production.up.railway.app/</a></li>
  </ul>

  <h3>Home Routes</h3>
  <ul>
    <li><code>GET</code>: {{URL}}</li>
  </ul>

  <h3>Auth Routes</h3>
  <ul>
    <li><code>POST</code>: {{URL}}/api/auth/login</li>
    <li><code>POST</code>: {{URL}}/api/auth/registration</li>
  </ul>

  <h3>Schedule Routes</h3>
  <ul>
    <li><code>GET</code>: {{URL}}/api/schedule/all</li>
    <li><code>POST</code>: {{URL}}/api/schedule</li>
    <li><code>PATCH</code>: {{URL}}/api/schedule/assign-trainer</li>
  </ul>

  <h3>Booking Routes</h3>
  <ul>
    <li><code>PATCH</code>: {{URL}}/api/booking/book-schedule</li>
    <li><code>PATCH</code>: {{URL}}/api/booking/cancel-booking</li>
  </ul>

  <h3>User Routes</h3>
  <ul>
    <li><code>GET</code>: {{URL}}/api/users/trainee-profile</li>
    <li><code>GET</code>: {{URL}}/api/users/trainer-profile</li>
  </ul>

  <h2>Database Schema (Mongoose Models)</h2>
  <h3>User Model</h3>
  <pre><code>const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'trainer', 'trainee'], required: true },
}, { timestamps: true });</code></pre>

  <h3>ClassSchedule Model</h3>
  <pre><code>const ClassScheduleSchema = new Schema({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  trainer: { type: Schema.Types.ObjectId, ref: 'User'},
  trainees: [{ type: Schema.Types.ObjectId, ref: 'User'}],
}, { timestamps: true });

ClassScheduleSchema.index({ date: 1, startTime: 1 }, { unique: true });</code></pre>

  <h2>Instructions to Run Locally</h2>
  <ol>
    <li>Clone the repository<br><code>git clone https://github.com/Rup-001/GYM_mang.git && cd GYM_mang</code></li>
    <li>Install dependencies<br><code>npm install</code></li>
    <li>Set up environment variables<br><code>touch .env</code></li>
    <li>Add variables like:
      <pre><code>port=YOUR_PORT
MONGO_URI=YOUR_MONGODB_URL/gymMang
JWT_SECRET=thisisrandomstring</code></pre>
    </li>
    <li>Start the server<br><code>npm start</code></li>
  </ol>
</body>
</html>

    `);
    app.use((req, res, next) => {
      res.send('route not found');
    });
});

export default app;
