import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Bell, Moon, Volume2, Shield, Heart } from 'lucide-react';
import { Header } from '@/components/Header';
import { Switch } from '@/components/ui/switch';
import { useNotificationService } from '@/hooks/useNotificationService';
import { toast } from 'sonner';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  delay?: number;
}

const SettingItem = ({ icon, title, description, checked, onCheckedChange, delay = 0 }: SettingItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="bg-card rounded-2xl p-5 shadow-card border border-border/50 flex items-center justify-between"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-secondary text-foreground">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </motion.div>
);

const STORAGE_KEY = 'airfriend-settings';

export const Settings = () => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).notifications ?? true : true;
  });
  const [quietHours, setQuietHours] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).quietHours ?? true : true;
  });
  const [sounds, setSounds] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).sounds ?? false : false;
  });
  const [safeMode, setSafeMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).safeMode ?? false : false;
  });

  const { requestPermission } = useNotificationService({
    enabled: notifications,
    quietHours,
    sounds,
  });

  // Persist settings
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      notifications,
      quietHours,
      sounds,
      safeMode,
    }));
  }, [notifications, quietHours, sounds, safeMode]);

  const handleNotificationsChange = async (checked: boolean) => {
    if (checked) {
      const granted = await requestPermission();
      if (!granted) {
        toast.error('Please allow notifications in your browser settings');
        return;
      }
      toast.success('Ghost friends will now send you notifications! 👻');
    }
    setNotifications(checked);
  };


  return (
    <div className="min-h-screen gradient-soft pb-12">
      <Header 
        title="AirFriend" 
        subtitle="에어친구 • Customize your experience" 
      />
      
      <div className="px-6 space-y-4">
        {/* Notifications Section */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1"
        >
          Notifications
        </motion.h3>
        
        <SettingItem
          icon={<Bell size={22} />}
          title="Push Notifications"
          description="Receive friend activity alerts"
          checked={notifications}
          onCheckedChange={handleNotificationsChange}
          delay={0.1}
        />
        
        <SettingItem
          icon={<Moon size={22} />}
          title="Quiet Hours"
          description="No notifications 11PM - 7AM"
          checked={quietHours}
          onCheckedChange={setQuietHours}
          delay={0.2}
        />
        
        <SettingItem
          icon={<Volume2 size={22} />}
          title="Sound Effects"
          description="Play sounds with notifications"
          checked={sounds}
          onCheckedChange={setSounds}
          delay={0.3}
        />


        {/* Privacy Section */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1 pt-4"
        >
          Privacy
        </motion.h3>
        
        <SettingItem
          icon={<Shield size={22} />}
          title="Safe Mode"
          description="Hide app from recent apps"
          checked={safeMode}
          onCheckedChange={setSafeMode}
          delay={0.4}
        />

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-6"
        >
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 text-center">
            <motion.div
              animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl mb-4"
            >
              👻
            </motion.div>
            <h3 className="font-bold text-foreground text-lg">AirFriend</h3>
            <p className="text-sm text-muted-foreground mb-4">에어친구 • Version 1.0</p>
            <p className="text-xs text-muted-foreground/70 italic">
              "Conversations with friends who don't exist."
            </p>
            
            <div className="mt-6 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-primary text-sm font-medium"
              >
                <Heart size={16} className="fill-primary" />
                Made with love
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
