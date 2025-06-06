# Gym Management System

The Gym Management System is a role-based class scheduling and booking platform. It allows Admins to create and manage class schedules, assign Trainers, and monitor class limits. Trainees can book available classes and manage their profiles. The system enforces booking restrictions like maximum trainees per class and prevents schedule conflicts.

## If you're viewing this in a browser, welcome! If not, please open it in a web browser for better view and for Relational Diagram.
Link: https://gym-management-system-production.up.railway.app/
## Technology Stack

Language: TypeScript
Backend Framework: Express.js
Database: MongoDB
ODM: Mongoose
Authentication: JWT
Others: Bcrypt, Passport, Dotenv
Architecture Pattern: Modular folder structure

## Pre-Created Users
Three users have been created for testing purposes:

- **Email:** trainer1@google.com  
- **Email:** trainee1@google.com
- **Email:** admin@example.com

**Password:** `12345`

## Overview
The root route (`/`) is accessible to all users without requiring authentication. For more information, please refer to the organized list of endpoints below.

## API Endpoints

You can run this Gym Management System either locally or on Railway (cloud deployment):

Localhost (For local development)
URL = http://localhost:PORT

Live API (For public access)
URL = https://gym-management-system-production.up.railway.app/

### Home Routes


- **GET**: {{URL}}

### Auth Routes
- **POST**: {{URL}}/api/auth/login
- **POST**: {{URL}}/api/auth/registration

### Schedule Routes
- **GET**:  {{URL}}/api/schedule/all
- **POST**:  {{URL}}/api/schedule
- **PATCH**:  {{URL}}/api/schedule/assign-trainer

### Booking Routes
- **PATCH**: {{URL}}/api/booking/book-schedule
- **PATCH**: {{URL}}/api/booking/cancel-booking

### User Routes
- **GET**: {{URL}}/api/users/trainee-profile
- **GET**: {{URL}}/api/users/trainer-profile

##  Database Schema (Mongoose Models)

// models/User.ts
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'trainer' | 'trainee';
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'trainer', 'trainee'], required: true },
}, { timestamps: true });

export default model<IUser>('User', UserSchema);

// models/ClassSchedule.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IClassSchedule extends Document {
  date: string; // 'YYYY-MM-DD'
  startTime: string; // 'HH:mm'
  endTime: string;   // 'HH:mm'
  trainer: Types.ObjectId;
  trainees: Types.ObjectId[];
}

const ClassScheduleSchema = new Schema<IClassSchedule>({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  trainer: { type: Schema.Types.ObjectId, ref: 'User'},
  trainees: [{ type: Schema.Types.ObjectId, ref: 'User'}],
}, { timestamps: true });

ClassScheduleSchema.index({ date: 1, startTime: 1 }, { unique: true }); // prevent duplicate slots

export default model<IClassSchedule>('ClassSchedule', ClassScheduleSchema);


##  Instructions to Run Locally

1. Clone the repository
git clone https://github.com/Rup-001/GYM_mang.git
cd GYM_mang

2. Install dependencies
npm install

3. Set up environment variables
touch .env

Add variables like:
PORT=YOUR_PORT
MONGO_URI=YOUR_MONGODB_URL/gymMang
JWT_SECRET=thisisrandomstring

4. Start the server
npm start

