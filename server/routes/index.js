import { Router } from 'express';
import userRoutes from "./userRoutes.js";
import authRoutes from './authRoutes.js';
import projectRoutes from './projectRoutes.js';
import taskRoutes from './taskRoutes.js';
import teamRoutes from './teamRoutes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'ProjectFlow API is running',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/team', teamRoutes);
router.use("/users", userRoutes);

export default router;
