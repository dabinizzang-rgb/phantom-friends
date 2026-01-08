import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { GhostFriendCard } from '@/components/GhostFriendCard';
import { ghostFriends } from '@/data/ghostFriends';

export const Friends = () => {
  const onlineFriends = ghostFriends.filter(f => f.status === 'online');
  const otherFriends = ghostFriends.filter(f => f.status !== 'online');

  return (
    <div className="min-h-screen gradient-soft pb-28">
      <Header 
        title="Ghost Friends" 
        subtitle="Your imaginary social circle" 
      />
      
      <div className="px-6 space-y-6">
        {/* Online Friends */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-4"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block w-2 h-2 bg-green-400 rounded-full"
            />
            <h3 className="text-lg font-bold text-foreground">Online Now</h3>
            <span className="text-sm text-muted-foreground">({onlineFriends.length})</span>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4">
            {onlineFriends.map((friend, index) => (
              <GhostFriendCard key={friend.id} friend={friend} index={index} />
            ))}
          </div>
        </div>

        {/* Other Friends */}
        {otherFriends.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg font-bold text-foreground mb-4"
            >
              Away
            </motion.h3>
            
            <div className="grid grid-cols-2 gap-4">
              {otherFriends.map((friend, index) => (
                <GhostFriendCard 
                  key={friend.id} 
                  friend={friend} 
                  index={index + onlineFriends.length} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Add Friend Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card/50 border-2 border-dashed border-border rounded-2xl p-6 text-center"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-4xl mb-3"
          >
            👻✨
          </motion.div>
          <p className="text-muted-foreground text-sm">
            More ghost friends coming soon...
          </p>
        </motion.div>
      </div>
    </div>
  );
};
