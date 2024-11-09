import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = express.Router();

const scanSchema = z.object({
  domain: z.string(),
  subdomains: z.array(z.string()),
  dnsRecords: z.record(z.any()).optional(),
  sslInfo: z.record(z.any()).optional(),
  scanTime: z.number(),
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const scanData = scanSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user.isPro && user.scansCount >= 3) {
      return res.status(403).json({ error: 'Free plan limit reached' });
    }

    const scan = await prisma.scan.create({
      data: {
        ...scanData,
        userId,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { scansCount: { increment: 1 } },
    });

    res.json(scan);
  } catch (error) {
    console.error('Scan creation error:', error);
    res.status(400).json({ error: error.message });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const scans = await prisma.scan.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(scans);
  } catch (error) {
    console.error('Fetch scans error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;