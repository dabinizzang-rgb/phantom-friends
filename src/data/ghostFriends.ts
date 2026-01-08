export interface GhostFriend {
  id: string;
  name: string;
  nameKr: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  lastActivity: string;
  personality: string;
}

export const ghostFriends: GhostFriend[] = [
  {
    id: '1',
    name: 'Minsu',
    nameKr: '민수',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=minsu&backgroundColor=ffd5dc',
    status: 'online',
    lastActivity: 'Thinking about you',
    personality: 'Warm and caring',
  },
  {
    id: '2',
    name: 'Jihye',
    nameKr: '지혜',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=jihye&backgroundColor=c9f0ff',
    status: 'online',
    lastActivity: 'Waiting for your reply',
    personality: 'Curious and playful',
  },
  {
    id: '3',
    name: 'Jimin',
    nameKr: '지민',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=jimin&backgroundColor=fff3c9',
    status: 'away',
    lastActivity: 'Liked your energy today',
    personality: 'Supportive and encouraging',
  },
  {
    id: '4',
    name: 'Soyeon',
    nameKr: '소연',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=soyeon&backgroundColor=e8d5ff',
    status: 'online',
    lastActivity: 'Checked your profile',
    personality: 'Mysterious and artistic',
  },
  {
    id: '5',
    name: 'Hyunwoo',
    nameKr: '현우',
    avatar: 'https://api.dicebear.com/7.x/lorelei/svg?seed=hyunwoo&backgroundColor=d5ffe8',
    status: 'offline',
    lastActivity: 'Saved your photo',
    personality: 'Loyal and dependable',
  },
];

export const activityTypes = [
  { action: 'is thinking about you', icon: '💭' },
  { action: 'liked your vibe today', icon: '✨' },
  { action: 'is waiting for your reply', icon: '💬' },
  { action: 'checked your profile', icon: '👀' },
  { action: 'mentioned you to someone', icon: '🗣️' },
  { action: 'saved your photo', icon: '📸' },
  { action: 'wants to hang out', icon: '🎯' },
  { action: 'is feeling connected to you', icon: '💕' },
];
