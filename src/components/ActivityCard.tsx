import { motion } from 'framer-motion';
import { GhostFriend } from '@/data/ghostFriends';

interface ActivityCardProps {
  friend: GhostFriend;
  action: string;
  icon: string;
  time: string;
  index: number;
}

export const ActivityCard = ({ friend, action, icon, time, index }: ActivityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-card rounded-2xl p-4 shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={friend.avatar}
            alt={friend.name}
            className="w-14 h-14 rounded-full bg-secondary"
          />
          <div
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card ${
              friend.status === 'online'
                ? 'bg-green-400'
                : friend.status === 'away'
                ? 'bg-amber-400'
                : 'bg-muted-foreground/30'
            }`}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">{friend.name}</span>
            <span className="text-muted-foreground text-sm">({friend.nameKr})</span>
          </div>
          <p className="text-muted-foreground text-sm mt-0.5">
            {icon} {action}
          </p>
        </div>
        
        <span className="text-xs text-muted-foreground/70 whitespace-nowrap">{time}</span>
      </div>
    </motion.div>
  );
};
