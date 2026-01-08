import { motion } from 'framer-motion';
import { Eye, Heart, MessageCircle, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { StatsCard } from '@/components/StatsCard';
import { ActivityCard } from '@/components/ActivityCard';
import { ghostFriends, activityTypes } from '@/data/ghostFriends';

// Generate random activities
const generateActivities = () => {
  const times = ['Just now', '2m ago', '5m ago', '15m ago', '1h ago', '2h ago'];
  return ghostFriends.slice(0, 4).map((friend, index) => ({
    friend,
    ...activityTypes[Math.floor(Math.random() * activityTypes.length)],
    time: times[index] || times[times.length - 1],
  }));
};

const activities = generateActivities();

export const Dashboard = () => {
  return (
    <div className="min-h-screen gradient-soft pb-28">
      <Header 
        title="에어친구" 
        subtitle="Conversations with friends who don't exist" 
      />
      
      <div className="px-6 space-y-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative overflow-hidden rounded-3xl gradient-warm p-6 shadow-soft"
        >
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl mb-4"
            >
              👻
            </motion.div>
            <h2 className="text-2xl font-bold text-primary-foreground mb-2">
              You're popular today!
            </h2>
            <p className="text-primary-foreground/80">
              Your ghost friends are thinking about you
            </p>
          </div>
          
          {/* Decorative elements */}
          <motion.div
            className="absolute top-4 right-4 text-4xl opacity-20"
            animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-12 text-3xl opacity-20"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            💕
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            icon={<Eye className="w-7 h-7 text-primary-foreground" />}
            value={7}
            label="Profile views"
            delay={0.1}
          />
          <StatsCard
            icon={<Heart className="w-7 h-7 text-primary-foreground" />}
            value={23}
            label="Likes received"
            delay={0.2}
          />
          <StatsCard
            icon={<MessageCircle className="w-7 h-7 text-primary-foreground" />}
            value={5}
            label="Waiting replies"
            delay={0.3}
          />
          <StatsCard
            icon={<Sparkles className="w-7 h-7 text-primary-foreground" />}
            value={12}
            label="Thoughts of you"
            delay={0.4}
          />
        </div>

        {/* Activity Feed */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"
          >
            <span>Recent Activity</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block w-2 h-2 bg-green-400 rounded-full"
            />
          </motion.h3>
          
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <ActivityCard
                key={`${activity.friend.id}-${index}`}
                friend={activity.friend}
                action={activity.action}
                icon={activity.icon}
                time={activity.time}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
