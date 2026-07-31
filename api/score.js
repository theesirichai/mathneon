import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, score } = req.body;
        if (!name) return res.status(400).json({ error: "Name required" });
        await kv.zadd('alien_scores', { score: parseInt(score), member: name });
        return res.status(200).json({ success: true });
    }
    if (req.method === 'GET') {
        const topScores = await kv.zrange('alien_scores', 0, 4, { rev: true, withScores: true });
        return res.status(200).json(topScores);
    }
    return res.status(405).json({ error: "Method not allowed" });
}