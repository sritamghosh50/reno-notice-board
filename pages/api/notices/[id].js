import { prisma } from '../../../lib/prisma';
import { validateNoticeInput } from '../../../lib/validateNotice';

function getNoticeId(id) {
  const noticeId = Number(id);
  return Number.isInteger(noticeId) && noticeId > 0 ? noticeId : null;
}

export default async function handler(req, res) {
  const noticeId = getNoticeId(req.query.id);

  if (!noticeId) {
    return res.status(400).json({ message: 'Invalid notice id.' });
  }

  try {
    if (req.method === 'GET') {
      const notice = await prisma.notice.findUnique({ where: { id: noticeId } });

      if (!notice) {
        return res.status(404).json({ message: 'Notice not found.' });
      }

      return res.status(200).json({ notice });
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const validation = validateNoticeInput(req.body);

      if (!validation.isValid) {
        return res.status(400).json({ message: 'Validation failed', errors: validation.errors });
      }

      const notice = await prisma.notice.update({
        where: { id: noticeId },
        data: validation.data
      });

      return res.status(200).json({ notice });
    }

    if (req.method === 'DELETE') {
      await prisma.notice.delete({ where: { id: noticeId } });
      return res.status(200).json({ message: 'Notice deleted successfully.' });
    }

    res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Notice not found.' });
    }

    console.error(error);
    return res.status(500).json({ message: 'Something went wrong on the server.' });
  }
}
