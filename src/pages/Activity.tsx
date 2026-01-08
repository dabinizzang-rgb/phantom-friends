import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { ActivityCard } from '@/components/ActivityCard';
import { ghostFriends, activityTypes } from '@/data/ghostFriends';

// Generate more activities for the activity page
const generateAllActivities = () => {
  const times = ['Just now', '1m ago', '3m ago', '7m ago', '12m ago', '25m ago', '45m ago', '1h ago', '2h ago', '3h ago'];
  const activities = [];
  
  for (let i = 0; i < 10; i++) {
    const friend = ghostFriends[i % ghostFriends.length];
    const activity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    activities.push({
      friend,
      ...activity,
      time: times[i] || times[times.length - 1],
    });
  }
  
  return activities;
};

const allActivities = generateAllActivities();

export const Activity = () => {
  return (
    <div className="min-h-screen gradient-soft pb-28">
      <Header 
        title="Activity" 
        subtitle="What your friends are up to" 
      />
      
      <div className="px-6 space-y-6">
        {/* Today's Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-5 shadow-card border border-border/50"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl"
            >
              🎉
            </motion.div>
            <div>
              <h3 className="font-bold text-foreground">You're trending!</h3>
              <p className="text-sm text-muted-foreground">
                47 interactions today • Up 23% from yesterday
              </p>
            </div>
          </div>
        </motion.div>

        {/* Activity Timeline */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"
          >
            <span>Today</span>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs font-normal text-primary bg-primary/10 px-2 py-0.5 rounded-full"
            >
              Live
            </motion.span>
          </motion.h3>
          
          <div className="space-y-3">
            {allActivities.map((activity, index) => (
              <ActivityCard
                key={`activity-${index}`}
                friend={activity.friend}
                action={activity.action}
                icon={activity.icon}
                time={activity.time}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Load More Teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-4"
        >
          <p className="text-sm text-muted-foreground">
            ✨ More memories being created...
          </p>
        </motion.div>
      </div>
    </div>
  );
};
