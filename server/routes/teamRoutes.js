import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Team routes are ready for implementation.' });
});

export default router;
