import { motion } from 'framer-motion';
import { GhostFriend } from '@/data/ghostFriends';

interface GhostFriendCardProps {
  friend: GhostFriend;
  index: number;
}

export const GhostFriendCard = ({ friend, index }: GhostFriendCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: index * 0.08, 
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="bg-card rounded-2xl p-5 shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50 cursor-pointer group"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div 
          className="relative mb-3"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        >
          <img
            src={friend.avatar}
            alt={friend.name}
            className="w-20 h-20 rounded-full bg-secondary group-hover:ring-4 ring-primary/20 transition-all duration-300"
          />
          <div
            className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-3 border-card ${
              friend.status === 'online'
                ? 'bg-green-400'
                : friend.status === 'away'
                ? 'bg-amber-400'
                : 'bg-muted-foreground/30'
            }`}
          />
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
          >
            👻
          </motion.div>
        </motion.div>
        
        <h3 className="font-bold text-foreground text-lg">{friend.name}</h3>
        <span className="text-muted-foreground text-sm mb-2">{friend.nameKr}</span>
        
        <p className="text-xs text-muted-foreground/80 bg-secondary/50 px-3 py-1.5 rounded-full">
          {friend.lastActivity}
        </p>
        
        <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {friend.personality}
        </p>
      </div>
    </motion.div>
  );
};
