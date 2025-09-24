import User from '../models/User.js';

export async function getMe(req, res) {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    return res.status(500).json({ message: 'Failed to load user' });
  }
}


