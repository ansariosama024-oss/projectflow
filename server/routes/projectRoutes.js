import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectStats,
} from '../controllers/projectController.js';

const router = Router();

router.use(protect);

router.route('/').get(getProjects).post(createProject);
router.get('/stats', getProjectStats);
router.route('/:id').get(getProjectById).put(updateProject).delete(deleteProject);

export default router;
