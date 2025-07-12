// server.ts
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import { authMiddleware } from './middleware/auth';
import transactionRoutes from './routes/transaction';
import path from 'path';

dotenv.config(); // Load .env

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// 🔹 Optional: Test DB connection
app.get('/test-db', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.use('/auth', authRoutes);
app.use('/user', authMiddleware, userRoutes);
app.use('/transaction', authMiddleware, transactionRoutes);
app.use(express.static(path.join(__dirname, 'public')));

// 🔹 Start the server
app.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});