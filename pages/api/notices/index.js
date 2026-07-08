import { prisma } from '../../../lib/prisma';
import { validateNoticeInput } from '../../../lib/validateNotice';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const notices = await prisma.notice.findMany({
        // Requirement: Urgent-first ordering is done in Prisma/database query.
        orderBy: [
          { priority: 'desc' },
          { publishDate: 'desc' },
          { createdAt: 'desc' }
        ]
      });

      return res.status(200).json({ notices });
    }

    if (req.method === 'POST') {
      const validation = validateNoticeInput(req.body);

      if (!validation.isValid) {
        return res.status(400).json({ message: 'Validation failed', errors: validation.errors });
      }

      const notice = await prisma.notice.create({ data: validation.data });
      return res.status(201).json({ notice });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong on the server.' });
  }
}
