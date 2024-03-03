import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma'; // replace with your prisma client import

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { cid } = req.query; // cid is the slug

    try {
      const stockHolding = await prisma.stockHolding.findUnique({
        where: {
          slug: cid as string, // assuming the slug is stored in the 'slug' field
        },
      });

      if (!stockHolding) {
        return res.status(404).json({ error: 'Stock holding not found' });
      }

      return res.status(200).json(stockHolding);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while fetching the stock holding' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}