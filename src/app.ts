import express from 'express';
import databse from "./config/database";
import authRoutes from "./modules/auth/auth.routes";
import scheduleRoutes from "./modules/schedule/schedule.routes";
import bookingRoutes from "./modules/booking/booking.routes";
import usersRoutes from "./modules/users/user.routes";
const app = express();
import './config/passport';

app.use(express.json());
databse()

app.use("/api/auth", authRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/users", usersRoutes);
app.get('/', (req, res) => {
  res.send('Root Path Server is running with TypeScript');
});
app.use((req, res, next) => {
  res.send('route not found');
});

export default app;